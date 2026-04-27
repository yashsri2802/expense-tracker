import { z } from 'zod';

// We validate the incoming payload for creating an expense
export const createExpenseSchema = z.object({
  // Assuming amount is passed safely as cents/paise from the frontend to avoid floating point errors
  amount: z.number().int().min(1, "Amount must be greater than zero"),
  category: z.string().min(1, "Category cannot be empty").max(50, "Category name is too long"),
  description: z.string().max(255, "Description is too long").optional(),
  
  // Date must follow the strict ISO YYYY-MM-DD pattern for easy SQLite storage & sorting
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format"),
});

// Infer the Typescript type from the Zod schema automatically
export type CreateExpenseInput = z.infer<typeof createExpenseSchema>;
