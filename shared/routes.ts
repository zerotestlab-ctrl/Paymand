import { z } from 'zod';
import { insertReceiptSchema, receipts } from './schema';

export const errorSchemas = {
  validation: z.object({
    message: z.string(),
    field: z.string().optional(),
  }),
  notFound: z.object({
    message: z.string(),
  }),
  internal: z.object({
    message: z.string(),
  }),
};

export const api = {
  receipts: {
    list: {
      method: 'GET' as const,
      path: '/api/receipts' as const,
      responses: {
        200: z.array(z.custom<typeof receipts.$inferSelect>()),
      },
    },
    create: {
      method: 'POST' as const,
      path: '/api/receipts' as const,
      input: insertReceiptSchema,
      responses: {
        201: z.custom<typeof receipts.$inferSelect>(),
        400: errorSchemas.validation,
      },
    },
  },
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}

export type ReceiptInput = z.infer<typeof api.receipts.create.input>;
export type ReceiptResponse = z.infer<typeof api.receipts.create.responses[201]>;
export type ReceiptsListResponse = z.infer<typeof api.receipts.list.responses[200]>;