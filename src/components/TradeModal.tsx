"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTradeModal } from "@/context/TradeModalContext";
import { getMarketById } from "@/data/markets";
import { currentUser } from "@/data/users";
import { X, DollarSign, Info } from "lucide-react";

interface PredictionRecord {
  id: string;
  marketId: string;
  marketQuestion: string;
  outcome: "YES" | "NO";
  amount: number;
  reasoning: string;
  confidence: "Low" | "Medium" | "High";
  timestamp: string;
}

function loadPredictions(): PredictionRecord[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem("omnimarketx-predictions");
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function savePrediction(record: PredictionRecord) {
  const existing = loadPredictions();
  existing.unshift(record);
  localStorage.setItem("omnimarketx-predictions", JSON.stringify(existing));
  window.dispatchEvent(new CustomEvent("omnimarketx-predictions-updated"));
}

export function loadPredictionsForMarket(marketId: string): PredictionRecord[] {
  return loadPredictions().filter((p) => p.marketId === marketId);
}

export function loadAllPredictions(): PredictionRecord[] {
  return loadPredictions();
}

export default function TradeModal() {
  const { isOpen, marketId, marketQuestion, selectedOutcome, closeModal } = useTradeModal();
  const router = useRouter();
  const [amount, setAmount] = useState("");
  const [reasoning, setReasoning] = useState("");
  const [confidence, setConfidence] = useState<"Low" | "Medium" | "High">("Medium");
  const [confirmed, setConfirmed] = useState(false);
  const [savedRecord, setSavedRecord] = useState<PredictionRecord | null>(null);

  if (!isOpen || !selectedOutcome) return null;

  const market = marketId ? getMarketById(marketId) : undefined;
  const currentProbability = selectedOutcome === "YES"
    ? (market?.yesProbability ?? 50)
    : (market?.noProbability ?? 50);
  const amountNum = parseFloat(amount) || 0;
  const multiplier = 100 / currentProbability;
  const estimatedReturn = amountNum * multiplier;
  const potentialProfit = estimatedReturn - amountNum;

  const handleConfirm = () => {
    const record: PredictionRecord = {
      id: `pred-${Date.now()}`,
      marketId: marketId ?? "",
      marketQuestion,
      outcome: selectedOutcome,
      amount: amountNum,
      reasoning,
      confidence,
      timestamp: new Date().toISOString(),
    };
    savePrediction(record);
    setSavedRecord(record);
    setConfirmed(true);
  };

  const handleViewPortfolio = () => {
    setConfirmed(false);
    setAmount("");
    setReasoning("");
    setConfidence("Medium");
    setSavedRecord(null);
    closeModal();
    router.push("/portfolio");
  };

  const handleClose = () => {
    setConfirmed(false);
    setAmount("");
    setReasoning("");
    setConfidence("Medium");
    setSavedRecord(null);
    closeModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleClose}
      />
      <div className="relative bg-white dark:bg-gray-900 rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto p-6 shadow-xl">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {confirmed ? (
          <div className="text-center py-4">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-green-600 dark:text-green-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
              Prediction placed
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
              You predicted <span className={`font-medium ${selectedOutcome === "YES" ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}>{selectedOutcome}</span>
            </p>
            {amountNum > 0 && (
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                ${amountNum.toFixed(2)} position
              </p>
            )}
            {savedRecord && (
              <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-3 mb-4 text-left space-y-1.5">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">Confidence</span>
                  <span className={`font-medium ${
                    savedRecord.confidence === "High"
                      ? "text-green-600 dark:text-green-400"
                      : savedRecord.confidence === "Medium"
                      ? "text-yellow-600 dark:text-yellow-400"
                      : "text-gray-600 dark:text-gray-400"
                  }`}>
                    {savedRecord.confidence}
                  </span>
                </div>
                {savedRecord.reasoning && (
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Reasoning</p>
                    <p className="text-sm text-gray-700 dark:text-gray-300">{savedRecord.reasoning}</p>
                  </div>
                )}
              </div>
            )}
            <button
              onClick={handleViewPortfolio}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
            >
              View Portfolio
            </button>
          </div>
        ) : (
          <>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
              Place Prediction
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 line-clamp-2">
              {marketQuestion}
            </p>

            <div className="flex items-center justify-between mb-4">
              <div
                className={`px-4 py-2.5 rounded-lg flex-1 mr-2 ${
                  selectedOutcome === "YES"
                    ? "bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800"
                    : "bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800"
                }`}
              >
                <span
                  className={`text-sm font-semibold ${
                    selectedOutcome === "YES"
                      ? "text-green-700 dark:text-green-400"
                      : "text-red-700 dark:text-red-400"
                  }`}
                >
                  {selectedOutcome}
                </span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-2.5 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                <Info className="w-3.5 h-3.5 text-gray-400" />
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  Current probability: <span className="font-medium text-gray-700 dark:text-gray-300">{currentProbability}%</span>
                </span>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Amount
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {amountNum > 0 && (
              <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-3 mb-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">Potential return</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    ${estimatedReturn.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 dark:text-gray-400">Potential profit</span>
                  <span className={`font-medium ${potentialProfit >= 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}>
                    {potentialProfit >= 0 ? "+" : ""}${potentialProfit.toFixed(2)}
                  </span>
                </div>
              </div>
            )}

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Why do you believe this?
              </label>
              <textarea
                value={reasoning}
                onChange={(e) => setReasoning(e.target.value)}
                placeholder="I think this will happen because..."
                rows={2}
                className="w-full p-3 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Confidence
              </label>
              <div className="flex gap-3">
                {(["Low", "Medium", "High"] as const).map((level) => (
                  <button
                    key={level}
                    type="button"
                    onClick={() => setConfidence(level)}
                    className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                      confidence === level
                        ? level === "High"
                          ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border border-green-300 dark:border-green-700"
                          : level === "Medium"
                          ? "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 border border-yellow-300 dark:border-yellow-700"
                          : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600"
                        : "bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700"
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between text-sm mb-4 px-1">
              <span className="text-gray-500 dark:text-gray-400">Balance</span>
              <span className="font-medium text-gray-900 dark:text-white">
                ${currentUser.balance.toLocaleString()}
              </span>
            </div>

            <button
              onClick={handleConfirm}
              disabled={amountNum <= 0}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 dark:disabled:bg-gray-700 text-white font-medium rounded-lg transition-colors disabled:cursor-not-allowed"
            >
              Confirm Prediction
            </button>
          </>
        )}
      </div>
    </div>
  );
}
