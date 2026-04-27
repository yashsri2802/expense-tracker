import { initDb, runDb } from './db';
import { v4 as uuidv4 } from 'uuid';

const seedData = [
  { amount: 500000, category: "Groceries", description: "Weekly market run", date: "2026-04-20" },
  { amount: 1500000, category: "Housing", description: "Monthly rent", date: "2026-04-01" },
  { amount: 30000, category: "Entertainment", description: "Movie night", date: "2026-04-22" },
  { amount: 12000, category: "Utilities", description: "Electricity bill", date: "2026-04-15" }
];

const seed = async () => {
  try {
    await initDb();
    
    for (const exp of seedData) {
      const idempKey = uuidv4();
      await runDb(
        `INSERT INTO expenses (amount, category, description, date, idempotency_key) VALUES (?, ?, ?, ?, ?)`,
        [exp.amount, exp.category, exp.description, exp.date, idempKey]
      );
    }
    console.log("Database seeded successfully");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database", error);
    process.exit(1);
  }
};

seed();
