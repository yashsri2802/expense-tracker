import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { initDb } from './db';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send({ status: 'Backend is running' });
});

app.listen(PORT, async () => {
  try {
    await initDb();
    console.log(`Server is running on http://localhost:${PORT}`);
  } catch (error) {
    console.error('Failed to initialize database', error);
    process.exit(1);
  }
});
