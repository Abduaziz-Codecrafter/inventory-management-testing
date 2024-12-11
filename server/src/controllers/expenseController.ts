// Import necessary types from Express and Prisma Client
import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

// Initialize a new Prisma Client instance for database interactions
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
    // Fetch all expenses grouped by category, ordered by date descending
    const expenseByCategorySummaryRaw = await prisma.expenseByCategory.findMany({
      orderBy: {
        date: "desc",
      },
    });

    // Convert the amount field from a numeric type to a string for each expense category
    const expenseByCategorySummary = expenseByCategorySummaryRaw.map((item) => ({
      ...item,
      amount: item.amount.toString(),
    }));

    // Send the categorized expenses as a JSON response
    res.json(expenseByCategorySummary);
  } catch (error) {
    // Handle any errors that occur during data retrieval
    res.status(500).json({ message: "Error retrieving expenses by category" });
  }
};
