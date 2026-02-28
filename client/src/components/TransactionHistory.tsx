import { format } from "date-fns";
import { useReceipts } from "@/hooks/use-receipts";
import { motion, AnimatePresence } from "framer-motion";
import { Database, FileText, Loader2, ArrowRight, ExternalLink } from "lucide-react";

export function TransactionHistory() {
  const { data: receipts, isLoading, error } = useReceipts();

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-zinc-500 space-y-4">
        <Loader2 className="w-6 h-6 animate-spin text-emerald-500/50" />
        <p className="text-sm">Loading ledger...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
        <p>Failed to load transaction history.</p>
      </div>
    );
  }

  if (!receipts || receipts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 rounded-3xl border border-zinc-800 border-dashed text-zinc-500 bg-zinc-900/30">
        <Database className="w-8 h-8 mb-4 opacity-20" />
        <p className="text-sm">No transactions yet.</p>
        <p className="text-xs opacity-50 mt-1">Run the demo to generate your first receipt.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 mt-16">
      <div className="flex items-center justify-between pb-4 border-b border-zinc-800/50">
        <h2 className="text-lg font-bold flex items-center gap-2 text-zinc-300">
          <Database className="w-5 h-5 text-emerald-500" />
          Ledger
        </h2>
        <div className="text-xs px-2 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          {receipts.length} entries
        </div>
      </div>

      <div className="space-y-2">
        <AnimatePresence mode="popLayout">
          {receipts.map((receipt) => (
            <motion.div
              key={receipt.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={() => window.open(`https://sepolia.basescan.org/tx/${receipt.proof}`, '_blank')}
              className="group p-4 rounded-2xl bg-zinc-900/50 border border-zinc-800 hover:border-emerald-500/30 hover:bg-zinc-900 transition-all duration-300 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer"
            >
              <div className="flex items-start sm:items-center gap-4">
                <div className="p-2 rounded-xl bg-zinc-950 border border-zinc-800 group-hover:border-emerald-500/30 transition-colors">
                  <FileText className="w-4 h-4 text-emerald-400/70" />
                </div>
                <div>
                  <div className="text-sm text-zinc-300 flex items-center gap-2">
                    <span className="text-emerald-400 font-medium">{receipt.amount} USDC</span>
                    <ArrowRight className="w-3 h-3 text-zinc-600" />
                    <span className="text-zinc-400">{receipt.description}</span>
                  </div>
                  <div className="text-xs text-zinc-600 mt-1 flex items-center gap-2">
                    <span>{receipt.receiptId}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1 group-hover:text-emerald-400/70 transition-colors">
                      {receipt.proof.substring(0, 10)}... <ExternalLink className="w-2.5 h-2.5" />
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-xs text-zinc-600 font-mono text-right shrink-0 bg-zinc-950/50 px-3 py-1.5 rounded-lg border border-zinc-800/50 group-hover:border-emerald-500/10 transition-colors">
                {format(new Date(receipt.createdAt || new Date()), "MMM d, HH:mm:ss")}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
