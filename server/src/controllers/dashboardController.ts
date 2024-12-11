// Import necessary types from Express and Prisma Client
import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

// Initialize a new Prisma Client instance for database interactions
const prisma = new PrismaClient();

/**
 * Controller to retrieve various dashboard metrics.
 * This includes popular products, sales summaries, purchase summaries,
 * expense summaries, and expenses categorized by their respective categories.
 *
 * @param req - The incoming request object.
 * @param res - The response object to send data back to the client.
 */
export const getDashboardMetrics = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    // Fetch the top 15 products sorted by descending stock quantity
    const popularProducts = await prisma.products.findMany({
      take: 15,
      orderBy: {
        stockQuantity: "desc",
      },
    });

    // Retrieve the latest 5 sales summaries ordered by date descending
    const salesSummary = await prisma.salesSummary.findMany({
      take: 5,
      orderBy: {
        date: "desc",
      },
    });

    // Retrieve the latest 5 purchase summaries ordered by date descending
    const purchaseSummary = await prisma.purchaseSummary.findMany({
      take: 5,
      orderBy: {
        date: "desc",
      },
    });

    // Retrieve the latest 5 expense summaries ordered by date descending
    const expenseSummary = await prisma.expenseSummary.findMany({
      take: 5,
      orderBy: {
        date: "desc",
      },
    });

    // Fetch the latest 5 expenses categorized by their category, ordered by date descending
    const expenseByCategorySummaryRaw = await prisma.expenseByCategory.findMany({
      take: 5,
      orderBy: {
        date: "desc",
      },
    });

    // Convert the amount field from a numeric type to a string for each expense category
    const expenseByCategorySummary = expenseByCategorySummaryRaw.map((item) => ({
      ...item,
      amount: item.amount.toString(),
    }));

    // Send the aggregated dashboard metrics as a JSON response
    res.json({
      popularProducts,
      salesSummary,
      purchaseSummary,
      expenseSummary,
      expenseByCategorySummary,
    });
  } catch (error) {
    // Handle any errors that occur during data retrieval
    res.status(500).json({ message: "Error retrieving dashboard metrics" });
  }
};
