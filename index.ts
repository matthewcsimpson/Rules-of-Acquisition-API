import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 5555;

app.use((req, _res, next) => {
    console.log(`${Date.now()} incoming request at ${req.originalUrl}`);
    next();
  });

app.get('/', (req: Request, res: Response) => {
  res.send('Running!');
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
