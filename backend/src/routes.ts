import { Router } from 'express';
import { createExpenseSchema } from './schemas';

export const expensesRouter = Router();

expensesRouter.post('/', async (req, res) => {
  try {
    const validatedData = createExpenseSchema.parse(req.body);
    
    res.status(201).json({ message: "Scaffold successful", data: validatedData });
  } catch (error) {
    res.status(400).json({ error: "Validation failed", details: error });
  }
});
