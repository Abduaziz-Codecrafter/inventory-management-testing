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

// Class names for styling
const classNames = {
  label: "block text-sm font-medium text-gray-700",
  selectInput:
    "mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md",
  filterContainer: "bg-gray-50 border border-gray-300 p-4 rounded-lg",
  button:
    "mt-4 w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",
};

const categoryColors: Record<string, string> = {
  All: "#8884d8",
  Office: "#82ca9d",
  Professional: "#ffc658",
  Salaries: "#d0ed57",
  // Extend with more categories if needed
};

type AggregatedDataItem = {
  name: string;
  color?: string;
  amount: number;
};

const Expenses = () => {
  // State variables for managing active pie slice, selected category, and date filters
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  // Fetch data using the custom hook
  const {
    data: expensesData,
    isLoading,
    isError,
  } = useGetExpensesByCategoryQuery();

  // Memoize the raw expenses data to avoid unnecessary re-renders
  const expenses = useMemo(() => expensesData ?? [], [expensesData]);

  // Aggregate and filter data based on category and date range
  const aggregatedData = useMemo(() => {
    return expenses
      .filter((data: ExpenseByCategorySummary) => {
        const matchesCategory =
          selectedCategory === "All" || data.category === selectedCategory;

        if (startDate && endDate) {
          const dataDate = new Date(data.date);
          return matchesCategory && dataDate >= startDate && dataDate <= endDate;
        }

        return matchesCategory;
      })
      .reduce((acc: { [category: string]: AggregatedDataItem }, data) => {
        const amount = parseInt(data.amount, 10);
        if (!acc[data.category]) {
          acc[data.category] = {
            name: data.category,
            amount,
            color: categoryColors[data.category] || "#000000",
          };
        } else {
          acc[data.category].amount += amount;
        }
        return acc;
      }, {});
  }, [expenses, selectedCategory, startDate, endDate]);

  // Convert aggregated data object to an array for the chart
  const aggregatedDataArray = useMemo(() => Object.values(aggregatedData), [aggregatedData]);

  // Display loading message while fetching data
  if (isLoading) {
    return <div className="py-4 text-center text-gray-500">Loading data...</div>;
  }

  // Handle errors gracefully
  if (isError || !expensesData) {
    return (
      <div className="text-center text-red-500 py-4">
        Failed to load expense data. Please try again later.
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* HEADER Section */}
      <div className="mb-5 text-center">
        <Header name="Expenses" />
        <p className="text-sm text-gray-500">
          A visual breakdown of your expenses by category.
        </p>
      </div>

      {/* FILTERS Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className={classNames.filterContainer}>
          <h3 className="text-lg font-semibold mb-4">Filters</h3>
          <div className="space-y-4">
            {/* Dropdown for Category Selection */}
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
                {Object.keys(categoryColors).map((category) => (
                  <option key={category}>{category}</option>
                ))}
              </select>
            </div>

            {/* Start Date Filter */}
            <div>
              <label htmlFor="start-date" className={classNames.label}>
                Start Date
              </label>
              <input
                type="date"
                id="start-date"
                name="start-date"
                className={classNames.selectInput}
                onChange={(e) => setStartDate(e.target.value ? new Date(e.target.value) : null)}
              />
            </div>

            {/* End Date Filter */}
            <div>
              <label htmlFor="end-date" className={classNames.label}>
                End Date
              </label>
              <input
                type="date"
                id="end-date"
                name="end-date"
                className={classNames.selectInput}
                onChange={(e) => setEndDate(e.target.value ? new Date(e.target.value) : null)}
              />
            </div>

            {/* Reset Filters Button */}
            <button
              type="button"
              className={classNames.button}
              onClick={() => {
                setStartDate(null);
                setEndDate(null);
                setSelectedCategory("All");
              }}
            >
              Reset Filters
            </button>
          </div>
        </div>

        {/* PIE CHART Section */}
        <div className="col-span-2 bg-white shadow rounded-lg p-6 md:p-8 lg:p-10">
          <h3 className="text-lg font-semibold mb-4">Expense Breakdown</h3>
          <ResponsiveContainer width="120%" height={400}>
            <PieChart>
              <Pie
                data={aggregatedDataArray}
                cx="50%"
                cy="50%"
                label={(entry) => `${entry.name}: ${entry.amount}`}
                outerRadius={150}
                fill="#8884d8"
                dataKey="amount"
                onMouseEnter={(_, index) => setActiveIndex(index)}
              >
                {aggregatedDataArray.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={index === activeIndex ? "#1D4ED8" : entry.color}
                  />
                ))}
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
