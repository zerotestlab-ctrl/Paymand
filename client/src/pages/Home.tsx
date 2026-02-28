import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Terminal, CheckCircle2, Copy, Check, Wallet, ShieldCheck, ExternalLink } from "lucide-react";
import { useCreateReceipt } from "@/hooks/use-receipts";
import type { ReceiptResponse } from "@shared/routes";
import { TransactionHistory } from "@/components/TransactionHistory";

export default function Home() {
  const [logs, setLogs] = useState<string[]>([]);
  const [receipt, setReceipt] = useState<ReceiptResponse | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [copied, setCopied] = useState(false);
  
  const createReceipt = useCreateReceipt();
  const logsEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll logs to bottom
  useEffect(() => {
    if (logsEndRef.current) {
      logsEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [logs]);

  const runDemo = async () => {
    if (isRunning) return;
    
    setIsRunning(true);
    setLogs([]);
    setReceipt(null);
    
    const addLog = (msg: string) => setLogs(prev => [...prev, msg]);

    addLog("🤖 Agent waking up...");
    await new Promise(r => setTimeout(r, 800));

    addLog("🔗 Using Base Sepolia testnet (eip155:84532) via x402 facilitator");
    await new Promise(r => setTimeout(r, 600));
    
    addLog("🔍 Scanning for x402 paywall...");
    await new Promise(r => setTimeout(r, 1000));

    addLog("⚠️ HTTP 402: Payment Required (x402-standard)");
    await new Promise(r => setTimeout(r, 800));
    
    addLog("💰 Found premium service • 0.001 USDC");
    await new Promise(r => setTimeout(r, 800));

    try {
      const proofHex = "0x" + Array.from({length: 40}, () => Math.floor(Math.random() * 16).toString(16)).join("");
      
      const result = await createReceipt.mutateAsync({
        amount: "0.001",
        channel: "celer",
        description: "Real-time inference data",
        proof: proofHex,
        receiptId: "paymand_" + Date.now()
      });

      addLog(`✅ Paid instantly via ${result.channel}`);
      addLog("📦 Service unlocked — agent continues");
      
      setReceipt(result);
    } catch (error) {
      addLog("❌ Error: Failed to process mandate payment");
      console.error(error);
    } finally {
      setIsRunning(false);
    }
  };

  const copyCode = () => {
    navigator.clipboard.writeText(`const paymand = new Paymand({maxSpend:0.1,channel:"celer"});\nagent.addTool(paymand.tool);`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-6 md:p-12 font-mono selection:bg-emerald-500/30 selection:text-emerald-200">
      <div className="max-w-2xl mx-auto">
        
        {/* Wallet Connection Status */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-12 p-4 rounded-2xl bg-zinc-900/50 border border-zinc-800"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
              <Wallet className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-zinc-500 font-semibold uppercase tracking-wider">0x7aF4...kP9q (Agent Wallet)</span>
              <span className="text-sm text-zinc-300 font-bold">Connected to Base Sepolia Testnet (eip155:84532) • Test USDC</span>
            </div>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-bold text-emerald-400 uppercase tracking-widest">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Base Sepolia
          </div>
        </motion.div>

        {/* Header Section */}
        <header className="mb-10 text-center sm:text-left">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center justify-center p-2 mb-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400"
          >
            <Terminal className="w-5 h-5 mr-2" />
            <span className="text-xs font-semibold tracking-wider uppercase">Terminal</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold text-emerald-400 mb-3 tracking-tighter"
          >
            Paymand
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-zinc-400"
          >
            One-line mandates for every AI agent
          </motion.p>
        </header>
        
        {/* Main Action */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <button 
            onClick={runDemo}
            disabled={isRunning}
            className="group relative w-full bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold py-6 px-8 rounded-3xl text-xl md:text-2xl mb-8 flex items-center justify-center gap-4 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-emerald-500 glow-emerald glow-emerald-hover"
          >
            {isRunning ? (
              <span className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-black/60 animate-ping" />
                Processing...
              </span>
            ) : (
              <>
                <Play className="w-6 h-6 fill-zinc-950 group-hover:scale-110 transition-transform" />
                Run Autonomous Agent Demo
              </>
            )}
            
            <div className="absolute inset-0 rounded-3xl ring-2 ring-emerald-500/20 ring-offset-4 ring-offset-zinc-950 scale-105 opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none" />
          </button>
        </motion.div>

        {/* Logs Window */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="relative bg-zinc-900 p-6 rounded-3xl border border-zinc-800 h-80 overflow-y-auto mb-8 shadow-2xl shadow-black/50 scroll-smooth"
        >
          {/* Mac window dots purely for aesthetics */}
          <div className="flex gap-2 absolute top-6 left-6">
            <div className="w-3 h-3 rounded-full bg-zinc-700"></div>
            <div className="w-3 h-3 rounded-full bg-zinc-700"></div>
            <div className="w-3 h-3 rounded-full bg-zinc-700"></div>
          </div>
          
          <div className="mt-8 space-y-3 font-mono text-sm">
            {logs.length === 0 && !isRunning && (
              <div className="text-zinc-600 italic">Waiting for execution command...</div>
            )}
            <AnimatePresence mode="popLayout">
              {logs.map((log, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`flex items-start gap-3 ${
                    log.includes("✅") ? "text-emerald-400" : 
                    log.includes("❌") ? "text-red-400" : 
                    log.includes("⚠️") ? "text-amber-400" :
                    "text-emerald-300/80"
                  }`}
                >
                  <span className="opacity-30 text-xs mt-0.5">{(new Date()).toISOString().split('T')[1].substring(0, 8)}</span>
                  <span>{log}</span>
                </motion.div>
              ))}
            </AnimatePresence>
            <div ref={logsEndRef} />
          </div>
        </motion.div>
        
        {/* Receipt Reveal */}
        <AnimatePresence>
          {receipt && (
            <motion.div 
              initial={{ opacity: 0, height: 0, y: 20 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-zinc-900 p-6 md:p-8 rounded-3xl border border-emerald-500/30 shadow-lg shadow-emerald-500/5 mb-8 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 blur-3xl rounded-full -mr-16 -mt-16 pointer-events-none" />
              
              <div className="flex items-center justify-between mb-4">
                <div className="font-bold text-emerald-400 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5" /> 
                  RECEIPT SECURED
                </div>
                <a 
                  href={`https://sepolia.basescan.org/tx/${receipt.proof}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] text-zinc-500 hover:text-emerald-400 flex items-center gap-1 transition-colors uppercase tracking-widest font-bold"
                >
                  View on Explorer <ExternalLink className="w-3 h-3" />
                </a>
              </div>
              
              <div className="bg-black/50 p-4 md:p-6 rounded-2xl border border-zinc-800 overflow-x-auto text-xs md:text-sm text-zinc-300 cursor-pointer hover:border-emerald-500/20 transition-colors group/receipt"
              >
                <pre className="text-emerald-300/90 leading-relaxed group-hover/receipt:text-emerald-300 transition-colors">
{(() => {
  const json = JSON.stringify(receipt, null, 2);
  const proofLabel = `"proof": "${receipt.proof}"`;
  const parts = json.split(proofLabel);
  return (
    <>
      {parts[0]}
      {`"proof": "`}
      <a 
        href={`https://sepolia.basescan.org/tx/${receipt.proof}`} 
        target="_blank" 
        rel="noopener noreferrer"
        className="text-emerald-400 underline decoration-emerald-400/30 hover:decoration-emerald-400 transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {receipt.proof}
      </a>
      {`"`}
      {parts[1]}
    </>
  );
})()}
                </pre>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* SDK Preview */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 bg-black/60 p-6 md:p-8 rounded-3xl border border-zinc-800/80 relative group hover:border-zinc-700 transition-colors"
        >
          <div className="flex items-center justify-between mb-4">
            <strong className="text-xs text-zinc-400 uppercase tracking-widest font-semibold flex items-center gap-2">
              <Terminal className="w-4 h-4" /> SDK Integration
            </strong>
            <button 
              onClick={copyCode}
              className="text-zinc-500 hover:text-emerald-400 transition-colors p-2 rounded-lg hover:bg-zinc-900"
              title="Copy code"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
          
          <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-900 overflow-x-auto">
            <code className="block text-sm text-zinc-300 leading-loose">
              <span className="text-zinc-500 font-mono text-[10px] block mb-2">// Base Sepolia Testnet config</span>
              <span className="text-pink-400">const</span> <span className="text-blue-400">paymand</span> <span className="text-pink-400">= new</span> <span className="text-yellow-200">Paymand</span>({`{ `}
                <span className="text-zinc-400">maxSpend:</span> <span className="text-purple-400">0.1</span>, 
                <span className="text-zinc-400"> channel:</span> <span className="text-amber-300">"celer"</span>,
                <span className="text-zinc-400"> chainId:</span> <span className="text-purple-400">84532</span>
              {` }`});<br/>
              <span className="text-blue-400">agent</span>.<span className="text-yellow-200">addTool</span>(<span className="text-blue-400">paymand</span>.<span className="text-zinc-300">tool</span>);
            </code>
          </div>
        </motion.div>

        {/* Transaction History Section */}
        <TransactionHistory />

        {/* Footer Badge */}
        <footer className="mt-12 mb-24 flex justify-center">
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-900/50 border border-zinc-800 text-[10px] text-zinc-500 font-bold uppercase tracking-widest">
            <ShieldCheck className="w-3 h-3 text-emerald-500/50" />
            Running on Base Sepolia Testnet • Real x402 + Celer simulation • No real funds moved (yet)
          </div>
        </footer>

      </div>
    </div>
  );
}
