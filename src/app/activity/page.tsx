"use client";

import { useState, useSyncExternalStore } from "react";
import AppLayout from "@/components/AppLayout";
import TrendingSidebar from "@/components/TrendingSidebar";
import { trendingTopics } from "@/data/social";
import { Clock, CheckCircle, XCircle, ChevronDown, ChevronUp } from "lucide-react";

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

const staticActivities = [
  {
    id: "1",
    type: "prediction",
    title: "You predicted YES on Bitcoin reaching $150K",
    amount: "$100",
    timestamp: "2 hours ago",
    status: "active",
  },
  {
    id: "2",
    type: "prediction",
    title: "You predicted NO on Ethereum surpassing $5K",
    amount: "$75",
    timestamp: "5 hours ago",
    status: "active",
  },
  {
    id: "3",
    type: "won",
    title: "You won $150 on GTA VI launch prediction",
    amount: "+$150",
    timestamp: "1 day ago",
    status: "won",
  },
  {
    id: "4",
    type: "lost",
    title: "You lost $50 on AI adoption prediction",
    amount: "-$50",
    timestamp: "2 days ago",
    status: "lost",
  },
  {
    id: "5",
    type: "prediction",
    title: "You predicted YES on Fed rate cut",
    amount: "$120",
    timestamp: "3 days ago",
    status: "active",
  },
  {
    id: "6",
    type: "won",
    title: "You won $200 on Cricket tournament prediction",
    amount: "+$200",
    timestamp: "4 days ago",
    status: "won",
  },
];

function SavedPredictionCard({ prediction }: { prediction: PredictionRecord }) {
  const [expanded, setExpanded] = useState(false);
  const hasReasoning = prediction.reasoning.trim().length > 0;

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-4">
      <div className="flex items-center gap-4">
        <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30">
          <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm text-gray-900 dark:text-white">
            You predicted <span className={`font-medium ${prediction.outcome === "YES" ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}>{prediction.outcome}</span> on {prediction.marketQuestion}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            ${prediction.amount} · {prediction.confidence} confidence
          </p>
        </div>
        <span className="text-sm font-medium text-gray-900 dark:text-white">
          ${prediction.amount}
        </span>
      </div>
      {hasReasoning && (
        <div className="mt-3">
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400 hover:underline"
          >
            {expanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            My Reasoning
          </button>
          {expanded && (
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/50 rounded-lg p-3">
              {prediction.reasoning}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

function subscribeToPredictions(callback: () => void) {
  window.addEventListener("omnimarketx-predictions-updated", callback);
  return () => window.removeEventListener("omnimarketx-predictions-updated", callback);
}

export default function ActivityPage() {
  const savedPredictions = useSyncExternalStore(
    subscribeToPredictions,
    () => loadPredictions(),
    () => [] as PredictionRecord[]
  );

  const rightPanel = (
    <div className="space-y-6">
      <TrendingSidebar topics={trendingTopics} />
    </div>
  );

  return (
    <AppLayout rightPanel={rightPanel}>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Activity
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Your recent predictions and outcomes
          </p>
        </div>

        {savedPredictions.length > 0 && (
          <div>
            <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-3">
              My Reasoning
            </h2>
            <div className="space-y-3">
              {savedPredictions.map((pred) => (
                <SavedPredictionCard key={pred.id} prediction={pred} />
              ))}
            </div>
          </div>
        )}

        <div>
          <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-3">
            Recent Activity
          </h2>
          <div className="space-y-3">
            {staticActivities.map((activity) => (
              <div
                key={activity.id}
                className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-4 flex items-center gap-4"
              >
                <div
                  className={`p-2 rounded-lg ${
                    activity.status === "won"
                      ? "bg-green-100 dark:bg-green-900/30"
                      : activity.status === "lost"
                      ? "bg-red-100 dark:bg-red-900/30"
                      : "bg-blue-100 dark:bg-blue-900/30"
                  }`}
                >
                  {activity.status === "won" ? (
                    <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                  ) : activity.status === "lost" ? (
                    <XCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
                  ) : (
                    <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900 dark:text-white">
                    {activity.title}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {activity.timestamp}
                  </p>
                </div>
                <span
                  className={`text-sm font-medium ${
                    activity.status === "won"
                      ? "text-green-600 dark:text-green-400"
                      : activity.status === "lost"
                      ? "text-red-600 dark:text-red-400"
                      : "text-gray-900 dark:text-white"
                  }`}
                >
                  {activity.amount}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
