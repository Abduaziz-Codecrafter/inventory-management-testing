// Import necessary types from Express and Prisma Client
import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

// Initialize a new Prisma Client instance for database interactions
const prisma = new PrismaClient();

/**
 * Controller to retrieve a list of all users.
 *
 * @param req - The incoming request object.
 * @param res - The response object to send data back to the client.
 */
export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    // Fetch all user records from the database
    const users = await prisma.users.findMany();

    // Send the list of users as a JSON response
    res.json(users);
  } catch (error) {
    // Handle any errors that occur during data retrieval
    res.status(500).json({ message: "Error retrieving users" });
  }
};
