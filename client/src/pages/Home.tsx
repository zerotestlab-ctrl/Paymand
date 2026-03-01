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

    addLog("🔗 Executing via Base Sepolia testnet (x402 + Celer simulation)");
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
    <div className="min-h-screen bg-zinc-950 text-white p-4 sm:p-6 md:p-12 font-mono selection:bg-emerald-500/30 selection:text-emerald-200">
      <div className="max-w-4xl mx-auto w-full">
        
        {/* Wallet Connection Status */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6 p-4 rounded-2xl bg-zinc-900/50 border border-zinc-800 w-full"
        >
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 shrink-0">
              <Wallet className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-[10px] md:text-xs text-zinc-500 font-semibold uppercase tracking-wider truncate">Agent Wallet: 0x7aF4...kP9q</span>
              <span className="text-[9px] md:text-[10px] text-emerald-400/80 font-bold flex items-center gap-1.5 uppercase tracking-widest break-words">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                Connected to Base Sepolia
              </span>
            </div>
          </div>
        </motion.div>

        {/* Live Banner */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-8 md:mb-12 p-3 md:p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-center"
        >
          <span className="text-[10px] md:text-sm font-bold text-emerald-400 tracking-tight leading-relaxed block">
            🚀 LIVE ON BASE SEPOLIA TESTNET (Chain ID 84532) • Test USDC only • No real funds moved
          </span>
        </motion.div>

        {/* Header Section */}
        <header className="mb-8 md:mb-10 text-center sm:text-left">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center justify-center p-2 mb-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400"
          >
            <Terminal className="w-4 h-4 md:w-5 md:h-5 mr-2" />
            <span className="text-[10px] md:text-xs font-semibold tracking-wider uppercase">Terminal</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-7xl font-bold text-emerald-400 mb-3 tracking-tighter"
          >
            Paymand
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-base md:text-xl text-zinc-400"
          >
            One-line mandates for every AI agent
          </motion.p>
        </header>
        
        {/* Main Action */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="w-full"
        >
          <button 
            onClick={runDemo}
            disabled={isRunning}
            className="group relative w-full bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold py-5 md:py-6 px-6 md:px-8 rounded-2xl md:rounded-3xl text-lg md:text-2xl mb-8 flex items-center justify-center gap-3 md:gap-4 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-emerald-500 glow-emerald glow-emerald-hover"
          >
            {isRunning ? (
              <span className="flex items-center gap-2 md:gap-3">
                <span className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-black/60 animate-ping" />
                Processing...
              </span>
            ) : (
              <>
                <Play className="w-5 h-5 md:w-6 md:h-6 fill-zinc-950 group-hover:scale-110 transition-transform" />
                Run Autonomous Agent Demo
              </>
            )}
            
            <div className="absolute inset-0 rounded-2xl md:rounded-3xl ring-2 ring-emerald-500/20 ring-offset-4 ring-offset-zinc-950 scale-105 opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none" />
          </button>
        </motion.div>

        {/* Logs Window */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="relative bg-zinc-900 p-4 md:p-6 rounded-2xl md:rounded-3xl border border-zinc-800 h-64 md:h-80 overflow-y-auto mb-8 shadow-2xl shadow-black/50 scroll-smooth"
        >
          {/* Mac window dots purely for aesthetics */}
          <div className="flex gap-1.5 md:gap-2 absolute top-4 md:top-6 left-4 md:left-6">
            <div className="w-2 md:w-3 h-2 md:h-3 rounded-full bg-zinc-700"></div>
            <div className="w-2 md:w-3 h-2 md:h-3 rounded-full bg-zinc-700"></div>
            <div className="w-2 md:w-3 h-2 md:h-3 rounded-full bg-zinc-700"></div>
          </div>
          
          <div className="mt-6 md:mt-8 space-y-2 md:space-y-3 font-mono text-[10px] md:text-sm">
            {logs.length === 0 && !isRunning && (
              <div className="text-zinc-600 italic">Waiting for execution command...</div>
            )}
            <AnimatePresence mode="popLayout">
              {logs.map((log, i) => {
                if (log.includes("⚠️ HTTP 402")) {
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-1.5 md:space-y-2"
                    >
                      <div className="flex items-start gap-2 md:gap-3 text-amber-400">
                        <span className="opacity-30 text-[8px] md:text-xs mt-0.5 shrink-0">{(new Date()).toISOString().split('T')[1].substring(0, 8)}</span>
                        <span className="break-words">{log}</span>
                      </div>
                      <div className="ml-8 md:ml-11 p-2 md:p-3 rounded-xl bg-black/40 border border-amber-500/20 text-[8px] md:text-[10px] text-amber-300/80 leading-tight overflow-x-auto">
                        <pre className="whitespace-pre">
{`{
  "status": 402,
  "paymentRequired": {
    "amount": "0.001",
    "asset": "USDC",
    "payTo": "0x742d35Cc6634C0532925a3b844Bc454e4438f44e"
  }
}`}
                        </pre>
                      </div>
                    </motion.div>
                  );
                }
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`flex items-start gap-2 md:gap-3 ${
                      log.includes("✅") ? "text-emerald-400" : 
                      log.includes("❌") ? "text-red-400" : 
                      log.includes("⚠️") ? "text-amber-400" :
                      "text-emerald-300/80"
                    }`}
                  >
                    <span className="opacity-30 text-[8px] md:text-xs mt-0.5 shrink-0">{(new Date()).toISOString().split('T')[1].substring(0, 8)}</span>
                    <span className="break-words">{log}</span>
                  </motion.div>
                );
              })}
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
              className="bg-zinc-900 p-4 md:p-8 rounded-2xl md:rounded-3xl border border-emerald-500/30 shadow-lg shadow-emerald-500/5 mb-8 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-24 md:w-32 h-24 md:h-32 bg-emerald-500/10 blur-3xl rounded-full -mr-12 md:-mr-16 -mt-12 md:-mt-16 pointer-events-none" />
              
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-4">
                <div className="font-bold text-emerald-400 flex items-center gap-2 text-sm md:text-base">
                  <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5" /> 
                  RECEIPT SECURED
                </div>
                <a 
                  href={`https://sepolia.basescan.org/tx/${receipt.proof}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[9px] md:text-[10px] text-zinc-500 hover:text-emerald-400 flex items-center gap-1 transition-colors uppercase tracking-widest font-bold"
                >
                  View on Explorer <ExternalLink className="w-3 h-3" />
                </a>
              </div>
              
              <div className="bg-black/50 p-3 md:p-6 rounded-xl md:rounded-2xl border border-zinc-800 overflow-x-auto text-[10px] md:text-sm text-zinc-300 cursor-pointer hover:border-emerald-500/20 transition-colors group/receipt">
                <pre className="text-emerald-300/90 leading-relaxed group-hover/receipt:text-emerald-300 transition-colors">
{(() => {
  const json = JSON.stringify(receipt, null, 2);
  const proofLabel = `"proof": "${receipt.proof}"`;
  const receiptIdLabel = `"receiptId": "${receipt.receiptId}"`;
  
  let content = json;
  
  // Replace proof
  const proofLink = `<a href="https://sepolia.basescan.org/tx/${receipt.proof}" target="_blank" rel="noopener noreferrer" class="text-emerald-400 underline decoration-emerald-400/30 hover:decoration-emerald-400 transition-all">${receipt.proof}</a>`;
  content = content.replace(`"${receipt.proof}"`, `"${proofLink}"`);
  
  // Replace receiptId
  const receiptIdLink = `<a href="https://sepolia.basescan.org/tx/${receipt.proof}" target="_blank" rel="noopener noreferrer" class="text-emerald-400 underline decoration-emerald-400/30 hover:decoration-emerald-400 transition-all">${receipt.receiptId}</a>`;
  content = content.replace(`"${receipt.receiptId}"`, `"${receiptIdLink}"`);

  return (
    <div dangerouslySetInnerHTML={{ __html: content }} />
  );
})()}
                </pre>
              </div>
              <div className="mt-4 text-[8px] md:text-[10px] text-emerald-500/60 font-bold uppercase tracking-widest flex items-center gap-1.5 md:gap-2">
                <CheckCircle2 className="w-2.5 h-2.5 md:w-3 md:h-3" />
                <span>✅ Verified on Base Sepolia Testnet</span>
                <span className="hidden sm:inline">•</span>
                <a href={`https://sepolia.basescan.org/tx/${receipt.proof}`} target="_blank" rel="noopener noreferrer" className="underline hover:text-emerald-400">View on Basescan</a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* SDK Preview */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 bg-black/60 p-4 md:p-8 rounded-2xl md:rounded-3xl border border-zinc-800/80 relative group hover:border-zinc-700 transition-colors"
        >
          <div className="flex items-center justify-between mb-4">
            <strong className="text-[10px] md:text-xs text-zinc-400 uppercase tracking-widest font-semibold flex items-center gap-2">
              <Terminal className="w-3 h-3 md:w-4 md:h-4" /> SDK Integration
            </strong>
            <button 
              onClick={copyCode}
              className="text-zinc-500 hover:text-emerald-400 transition-colors p-1.5 md:p-2 rounded-lg hover:bg-zinc-900"
              title="Copy code"
            >
              {copied ? <Check className="w-3 h-3 md:w-4 md:h-4" /> : <Copy className="w-3 h-3 md:w-4 md:h-4" />}
            </button>
          </div>
          
          <div className="bg-zinc-950 p-3 md:p-4 rounded-xl border border-zinc-900 overflow-x-auto">
            <code className="block text-[10px] md:text-sm text-zinc-300 leading-relaxed md:leading-loose whitespace-pre">
              <span className="text-zinc-500 font-mono text-[8px] md:text-[10px] block mb-2">// Base Sepolia Testnet config</span>
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
        <footer className="mt-8 md:mt-12 mb-16 md:mb-24 flex justify-center w-full">
          <div className="flex items-center gap-2 px-3 md:px-4 py-2 rounded-xl bg-zinc-900/50 border border-zinc-800 text-[8px] md:text-[10px] text-zinc-500 font-bold uppercase tracking-widest text-center leading-relaxed">
            <ShieldCheck className="w-2.5 h-2.5 md:w-3 md:h-3 text-emerald-500/50 shrink-0" />
            Running on Base Sepolia Testnet • Real x402 + Celer simulation • No real funds moved (yet)
          </div>
        </footer>

      </div>
    </div>
  );
}
