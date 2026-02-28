import { pgTable, text, serial, numeric, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const receipts = pgTable("receipts", {
  id: serial("id").primaryKey(),
  receiptId: text("receipt_id").notNull(),
  amount: numeric("amount").notNull(),
  channel: text("channel").notNull(),
  proof: text("proof").notNull(),
  description: text("description").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertReceiptSchema = createInsertSchema(receipts).omit({ id: true, createdAt: true });

export type Receipt = typeof receipts.$inferSelect;
export type InsertReceipt = z.infer<typeof insertReceiptSchema>;

export type CreateReceiptRequest = InsertReceipt;
export type ReceiptResponse = Receipt;
export type ReceiptsListResponse = Receipt[];