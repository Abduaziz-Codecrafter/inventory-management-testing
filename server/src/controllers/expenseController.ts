// Import necessary types from Express and Prisma Client
import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

// Initialize Prisma Client
const prisma = new PrismaClient();

/**
 * Controller to retrieve expenses categorized by their respective categories.
 *
 * @param req - The incoming request object.
 * @param res - The response object to send data back to the client.
 */
export const getExpensesByCategory = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    // Destructure and validate query parameters
    const { startDate, endDate, category } = req.query;

    // Parse dates and set filters
    const filters: { [key: string]: any } = {};

    if (startDate) {
      filters.date = { ...filters.date, gte: new Date(startDate as string) };
    }
    if (endDate) {
      filters.date = { ...filters.date, lte: new Date(endDate as string) };
    }
    if (category && category !== "All") {
      filters.category = category;
    }

    // Fetch filtered data grouped by category, ordered by date descending
    const expenseByCategorySummaryRaw = await prisma.expenseByCategory.findMany({
      where: filters,
      orderBy: {
        date: "desc",
      },
    });

    // Format the amount field to ensure consistency
    const expenseByCategorySummary = expenseByCategorySummaryRaw.map((item) => ({
      ...item,
      amount: item.amount.toString(),
    }));

    // Send the response
    res.status(200).json(expenseByCategorySummary);
  } catch (error) {
    console.error("Error fetching expenses by category:", error);
    res.status(500).json({ message: "Error retrieving expenses by category" });
  }
};

/**
 * Close Prisma Client when the application is shutting down.
 */
process.on("SIGINT", async () => {
  await prisma.$disconnect();
  process.exit(0);
});
