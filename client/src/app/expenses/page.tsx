"use client";

import {
  ExpenseByCategorySummary,
  useGetExpensesByCategoryQuery,
} from "@/state/api";
import { useMemo, useState } from "react";
import Header from "@/app/(components)/Header";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

// Move classNames outside to prevent re-creation on every render
const classNames = {
  label: "block text-sm font-medium text-gray-700",
  selectInput:
    "mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md",
};

// Deterministic color palette based on category name
const categoryColors: { [key: string]: string } = {
  All: "#8884d8",
  Office: "#82ca9d",
  Professional: "#ffc658",
  Salaries: "#d0ed57",
  // Add more categories as needed
};

type AggregatedDataItem = {
  name: string;
  color?: string;
  amount: number;
};

const Expenses = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const {
    data: expensesData,
    isLoading,
    isError,
  } = useGetExpensesByCategoryQuery();

  // Use useMemo to memoize expenses
  const expenses = useMemo(() => expensesData ?? [], [expensesData]);

  // Aggregated data with optimized filtering and deterministic colors
  const aggregatedData: AggregatedDataItem[] = useMemo(() => {
    return expenses
      .filter((data: ExpenseByCategorySummary) => {
        const matchesCategory =
          selectedCategory === "All" || data.category === selectedCategory;

        if (startDate && endDate) {
          const dataDate = new Date(data.date);
          return (
            matchesCategory &&
            dataDate >= startDate &&
            dataDate <= endDate
          );
        }

        return matchesCategory;
      })
      .reduce((acc: { [category: string]: AggregatedDataItem }, data) => {
        const amount = parseInt(data.amount, 10);
        if (!acc[data.category]) {
          acc[data.category] = {
            name: data.category,
            amount: amount,
            color: categoryColors[data.category] || "#000000", // Default color if not specified
          };
        } else {
          acc[data.category].amount += amount;
        }
        return acc;
      }, {});
  }, [expenses, selectedCategory, startDate, endDate]);

  const aggregatedDataArray = useMemo(() => Object.values(aggregatedData), [
    aggregatedData,
  ]);

  if (isLoading) {
    return <div className="py-4">Loading...</div>;
  }

  if (isError || !expensesData) {
    return (
      <div className="text-center text-red-500 py-4">
        Failed to fetch expenses
      </div>
    );
  }

  return (
    <div>
      {/* HEADER */}
      <div className="mb-5">
        <Header name="Expenses" />
        <p className="text-sm text-gray-500">
          A visual representation of expenses over time.
        </p>
      </div>

      {/* FILTERS */}
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div className="w-full md:w-1/3 bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">
            Filter by Category and Date
          </h3>
          <div className="space-y-4">
            {/* CATEGORY */}
            <div>
              <label htmlFor="category" className={classNames.label}>
                Category
              </label>
              <select
                id="category"
                name="category"
                className={classNames.selectInput}
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option>All</option>
                <option>Office</option>
                <option>Professional</option>
                <option>Salaries</option>
                {/* Dynamically render categories if needed */}
              </select>
            </div>
            {/* START DATE */}
            <div>
              <label htmlFor="start-date" className={classNames.label}>
                Start Date
              </label>
              <input
                type="date"
                id="start-date"
                name="start-date"
                className={classNames.selectInput}
                onChange={(e) =>
                  setStartDate(
                    e.target.value ? new Date(e.target.value) : null
                  )
                }
              />
            </div>
            {/* END DATE */}
            <div>
              <label htmlFor="end-date" className={classNames.label}>
                End Date
              </label>
              <input
                type="date"
                id="end-date"
                name="end-date"
                className={classNames.selectInput}
                onChange={(e) =>
                  setEndDate(e.target.value ? new Date(e.target.value) : null)
                }
              />
            </div>
          </div>
        </div>
        {/* PIE CHART */}
        <div className="flex-grow bg-white shadow rounded-lg p-4 md:p-6">
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={aggregatedDataArray}
                cx="50%"
                cy="50%"
                label
                outerRadius={150}
                fill="#8884d8"
                dataKey="amount"
                onMouseEnter={(_, index) => setActiveIndex(index)}
              >
                {aggregatedDataArray.map(
                  (entry: AggregatedDataItem, index: number) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={
                        index === activeIndex ? "#1D4ED8" : entry.color
                      }
                    />
                  )
                )}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Expenses;
