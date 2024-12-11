// Import necessary types from Express and Prisma Client
import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

// Initialize a new Prisma Client instance for database interactions
const prisma = new PrismaClient();

/**
 * Controller to retrieve a list of products.
 * Supports optional search functionality based on product name.
 *
 * @param req - The incoming request object containing query parameters.
 * @param res - The response object to send data back to the client.
 */
export const getProducts = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    // Extract the 'search' query parameter from the request, if provided
    const search = req.query.search?.toString();

    // Define the search filter for product names containing the search string
    const products = await prisma.products.findMany({
      where: {
        name: {
          contains: search,
        },
      },
    });

    // Send the list of products as a JSON response
    res.json(products);
  } catch (error) {
    // Handle any errors that occur during data retrieval
    res.status(500).json({ message: "Error retrieving products" });
  }
};

/**
 * Controller to create a new product in the database.
 *
 * @param req - The incoming request object containing product data in the body.
 * @param res - The response object to send data back to the client.
 */
export const createProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    // Destructure product details from the request body
    const { productId, name, price, rating, stockQuantity } = req.body;

    // Create a new product record in the database with the provided data
    const product = await prisma.products.create({
      data: {
        productId,
        name,
        price,
        rating,
        stockQuantity,
      },
    });

    // Send the created product as a JSON response with a 201 (Created) status
    res.status(201).json(product);
  } catch (error) {
    // Handle any errors that occur during product creation
    res.status(500).json({ message: "Error creating product" });
  }
};
