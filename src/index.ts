import express, { Request, Response, NextFunction } from 'express';
import userRouter from "./routers/userRouter";
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());
app.use(cors()); // Enable CORS

// Middleware to log request details
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`Method: ${req.method}, URL: ${req.url}`);
  next();
});

// Routes
app.use("/user", userRouter);

// Error handling middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start the server
const port = process.env.PORT || 8000;
const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
  });
});