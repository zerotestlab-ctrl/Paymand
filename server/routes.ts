import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.get(api.receipts.list.path, async (req, res) => {
    const list = await storage.getReceipts();
    res.json(list);
  });

  app.post(api.receipts.create.path, async (req, res) => {
    try {
      const input = api.receipts.create.input.parse(req.body);
      const receipt = await storage.createReceipt(input);
      res.status(201).json(receipt);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  return httpServer;
}