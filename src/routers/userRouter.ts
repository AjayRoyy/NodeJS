import { Router, Request, Response } from "express";
import { v4 as uuidv4 } from 'uuid'; // Use uuid for unique IDs

const router = Router();

// Interface for User
interface User {
  id: string;
  name: string;
  age: number;
}

// In-memory user storage (replace with database logic)
const users: User[] = [];

// Endpoint to create a new user
router.post('/create', (req: Request, res: Response) => {
  const { name, age } = req.body;
  
  // Validate user data
  if (!name || typeof name !== 'string' || !age || typeof age !== 'number' || age <= 0) {
    return res.status(400).json({ error: 'Invalid user data' });
  }
  
  const newUser: User = { id: uuidv4(), name, age };
  users.push(newUser); // Save new user to in-memory array
  
  return res.status(201).json(newUser);
});

// Endpoint to get all users
router.get('/list', (req: Request, res: Response) => {
  res.json(users); // Retrieve all users
});

// Endpoint to update a user
router.put('/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, age } = req.body;

  const userIndex = users.findIndex(user => user.id === id);
  
  // Validate user data and existence
  if (userIndex === -1 || !name || typeof name !== 'string' || !age || typeof age !== 'number' || age <= 0) {
    return res.status(400).json({ error: 'Invalid user data or user not found' });
  }

  const updatedUser: User = { id, name, age };
  users[userIndex] = updatedUser; // Update the user in the array
  
  res.json(updatedUser);
});

// Endpoint to delete a user
router.delete('/:id', (req: Request, res: Response) => {
  const { id } = req.params;

  const userIndex = users.findIndex(user => user.id === id);
  
  // Check if user exists
  if (userIndex === -1) {
    return res.status(404).json({ error: 'User not found' });
  }

  users.splice(userIndex, 1); // Delete the user from the array
  res.status(204).end(); // No content returned
});

export default router;