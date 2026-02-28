import { receipts, type InsertReceipt, type Receipt } from "@shared/schema";
import { db } from "./db";
import { desc } from "drizzle-orm";

export interface IStorage {
  createReceipt(receipt: InsertReceipt): Promise<Receipt>;
  getReceipts(): Promise<Receipt[]>;
}

export class DatabaseStorage implements IStorage {
  async createReceipt(insertReceipt: InsertReceipt): Promise<Receipt> {
    const [receipt] = await db.insert(receipts).values(insertReceipt).returning();
    return receipt;
  }

  async getReceipts(): Promise<Receipt[]> {
    return await db.select().from(receipts).orderBy(desc(receipts.createdAt));
  }
}

export const storage = new DatabaseStorage();