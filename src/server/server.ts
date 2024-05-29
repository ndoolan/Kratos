import express, { Request, Response, NextFunction, Application } from 'express';
import path from 'path';
import 'dotenv/config';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRouter from './routes/authRouter';
import logsRouter from './routes/logsRouter';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app: Application = express();
app.use(express.json());
app.use(
  cors({
    origin: 'http://localhost:8080',
    credentials: true,
  })
);
app.use(cookieParser());
dotenv.config();

const db: string = process.env.URI!;

mongoose
  .connect(db, { serverSelectionTimeoutMS: 5000 })
  .then(() => {
    console.log('Connected to DB');
  })
  .catch((err) => {
    console.log(`Error starting DB ${err}`);
  });

app.use('/auth', authRouter);
app.use('/logs', logsRouter);

// serve static files
app.use(express.static(path.resolve(__dirname, '../client/assets')));

app.get('*', (_req: Request, res: Response) => {
  res.sendFile(path.join(__dirname,'index.html'));
});

// global error handler
app.use(
  (err: Error, _req: Request, res: Response, _next: NextFunction): void => {
    const defaultError = {
      log: 'Express error handler caught unknown middleware error',
      status: 500,
      message: { err: 'An error occurred' },
    };
    const errorObj = {
      ...defaultError,
      ...(err instanceof Error ? { message: { err: err.message } } : err),
    };
    console.log(errorObj.log);
    res.status(errorObj.status).json(errorObj.message);
  }
);

app.listen(process.env.PORT, () => {
  console.log(`Starting up on ${process.env.PORT}... Let's get it`);
});
