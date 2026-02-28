import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, type ReceiptInput, type ReceiptResponse, type ReceiptsListResponse } from "@shared/routes";

// Utility to parse Zod schemas and log errors robustly
function parseWithLogging<T>(schema: any, data: unknown, label: string): T {
  const result = schema.safeParse(data);
  if (!result.success) {
    console.error(`[Zod] ${label} validation failed:`, result.error.format());
    throw result.error;
  }
  return result.data;
}

export function useReceipts() {
  return useQuery({
    queryKey: [api.receipts.list.path],
    queryFn: async () => {
      const res = await fetch(api.receipts.list.path, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch receipts");
      const data = await res.json();
      return parseWithLogging<ReceiptsListResponse>(
        api.receipts.list.responses[200],
        data,
        "receipts.list"
      );
    },
  });
}

export function useCreateReceipt() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: ReceiptInput) => {
      const validated = api.receipts.create.input.parse(data);
      
      const res = await fetch(api.receipts.create.path, {
        method: api.receipts.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validated),
        credentials: "include",
      });
      
      if (!res.ok) {
        if (res.status === 400) {
          const error = api.receipts.create.responses[400].parse(await res.json());
          throw new Error(error.message || "Validation failed");
        }
        throw new Error("Failed to create receipt");
      }
      
      const responseData = await res.json();
      return parseWithLogging<ReceiptResponse>(
        api.receipts.create.responses[201],
        responseData,
        "receipts.create"
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.receipts.list.path] });
    },
  });
}
