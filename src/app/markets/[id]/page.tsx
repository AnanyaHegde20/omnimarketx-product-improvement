"use client";

import { use, useState, useEffect } from "react";
import Link from "next/link";
import AppLayout from "@/components/AppLayout";
import MarketCard from "@/components/MarketCard";
import TrendingSidebar from "@/components/TrendingSidebar";
import { markets, getMarketById, formatVolume, formatTraders } from "@/data/markets";
import { trendingTopics } from "@/data/social";
import { useTradeModal } from "@/context/TradeModalContext";
import { useWatchlist } from "@/context/WatchlistContext";
import {
  ArrowLeft,
  Clock,
  Star,
  ThumbsUp,
  TrendingUp,
  TrendingDown,
  Minus,
} from "lucide-react";

function ProbabilityChart({ history, label }: { history: number[]; label: string }) {
  const max = Math.max(...history);
  const min = Math.min(...history);
  const range = max - min || 1;
  const width = 280;
  const height = 80;
  const padding = 4;

  const points = history.map((val, i) => {
    const x = padding + (i / (history.length - 1)) * (width - padding * 2);
    const y = padding + ((max - val) / range) * (height - padding * 2);
    return `${x},${y}`;
  });

  const areaPoints = [
    `${padding},${height - padding}`,
    ...points,
    `${width - padding},${height - padding}`,
  ].join(" ");

  return (
    <div>
      <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">{label}</p>
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-20">
        <defs>
          <linearGradient id={`grad-${label}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={label === "YES" ? "#22c55e" : "#ef4444"} stopOpacity="0.3" />
            <stop offset="100%" stopColor={label === "YES" ? "#22c55e" : "#ef4444"} stopOpacity="0.05" />
          </linearGradient>
        </defs>
        <polygon
          points={areaPoints}
          fill={`url(#grad-${label})`}
        />
        <polyline
          points={points.join(" ")}
          fill="none"
          stroke={label === "YES" ? "#22c55e" : "#ef4444"}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {points.map((point, i) => {
          const [cx, cy] = point.split(",").map(Number);
          return (
            <circle
              key={i}
              cx={cx}
              cy={cy}
              r={i === points.length - 1 ? 3 : 0}
              fill={label === "YES" ? "#22c55e" : "#ef4444"}
            />
          );
        })}
      </svg>
    </div>
  );
}

function CategoryBadge({ category }: { category: string }) {
  const colorMap: Record<string, string> = {
    Crypto: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
    Sports: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    Gaming: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
    Politics: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
    Economy: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    Entertainment: "bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400",
    Tech: "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400",
  };
  return (
    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${colorMap[category] ?? "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400"}`}>
      {category}
    </span>
  );
}

export default function MarketDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { openModal } = useTradeModal();
  const { toggleWatchlist, isWatched } = useWatchlist();
  const [commentText, setCommentText] = useState("");

  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 60000);
    return () => clearInterval(id);
  }, []);

  const market = getMarketById(id);

  if (!market) {
    return (
      <AppLayout>
        <div className="text-center py-20">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Market not found
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            The market you are looking for does not exist.
          </p>
          <Link
            href="/markets"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Markets
          </Link>
        </div>
      </AppLayout>
    );
  }

  const relatedMarkets = markets
    .filter((m) => m.category === market.category && m.id !== market.id)
    .slice(0, 3);

  const daysLeft = Math.max(
    0,
    Math.ceil((new Date(market.endDate).getTime() - now) / (1000 * 60 * 60 * 24))
  );

  const rightPanel = (
    <div className="space-y-6">
      <TrendingSidebar topics={trendingTopics} />
    </div>
  );

  return (
    <AppLayout rightPanel={rightPanel}>
      <div className="space-y-6">
        <Link
          href="/markets"
          className="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Markets
        </Link>

        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
          <div className="p-6">
            <div className="flex items-start justify-between mb-4">
              <CategoryBadge category={market.category} />
              <button
                onClick={() => toggleWatchlist(market.id)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <Star
                  className={`w-4 h-4 ${
                    isWatched(market.id)
                      ? "text-yellow-500 fill-yellow-500"
                      : "text-gray-400 dark:text-gray-500"
                  }`}
                />
                {isWatched(market.id) ? "Watching" : "Watch"}
              </button>
            </div>

            <h1 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white mb-6">
              {market.question}
            </h1>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
              <div className="text-center p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">YES</p>
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {market.yesProbability}%
                </p>
              </div>
              <div className="text-center p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">NO</p>
                <p className="text-2xl font-bold text-red-600 dark:text-red-400">
                  {market.noProbability}%
                </p>
              </div>
              <div className="text-center p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Volume</p>
                <p className="text-lg font-bold text-gray-900 dark:text-white">
                  {formatVolume(market.volume)}
                </p>
              </div>
              <div className="text-center p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Traders</p>
                <p className="text-lg font-bold text-gray-900 dark:text-white">
                  {formatTraders(market.traders)}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <ProbabilityChart history={market.probabilityHistory} label="YES" />
              <ProbabilityChart history={market.probabilityHistory.map((v) => 100 - v)} label="NO" />
            </div>

            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 mb-6">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                Market Intelligence
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
                <div className="text-center p-2 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Crowd Probability</p>
                  <p className="text-lg font-bold text-green-600 dark:text-green-400">
                    YES {market.yesProbability}%
                  </p>
                </div>
                <div className="text-center p-2 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Momentum</p>
                  <p className={`text-sm font-bold ${
                    market.intelligence.momentum.startsWith("+")
                      ? "text-green-600 dark:text-green-400"
                      : market.intelligence.momentum.startsWith("-")
                      ? "text-red-600 dark:text-red-400"
                      : "text-gray-600 dark:text-gray-400"
                  }`}>
                    {market.intelligence.momentum.startsWith("+") && "↑ "}
                    {market.intelligence.momentum.startsWith("-") && "↓ "}
                    {market.intelligence.momentum}
                  </p>
                </div>
                <div className="text-center p-2 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Sentiment</p>
                  <p className={`text-sm font-bold flex items-center justify-center gap-1 ${
                    market.intelligence.sentiment === "Bullish"
                      ? "text-green-600 dark:text-green-400"
                      : market.intelligence.sentiment === "Bearish"
                      ? "text-red-600 dark:text-red-400"
                      : "text-gray-600 dark:text-gray-400"
                  }`}>
                    {market.intelligence.sentiment === "Bullish" && <TrendingUp className="w-3.5 h-3.5" />}
                    {market.intelligence.sentiment === "Bearish" && <TrendingDown className="w-3.5 h-3.5" />}
                    {market.intelligence.sentiment === "Neutral" && <Minus className="w-3.5 h-3.5" />}
                    {market.intelligence.sentiment}
                  </p>
                </div>
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2">
                  Why is this market moving?
                </p>
                <ul className="space-y-1.5">
                  {market.intelligence.movingPoints.map((point, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300">
                      <span className="text-gray-400 dark:text-gray-500 mt-0.5">•</span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex gap-3 mb-6">
              <button
                onClick={() => openModal(market.id, market.question, "YES")}
                className="flex-1 py-3 px-4 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors"
              >
                YES {market.yesProbability}%
              </button>
              <button
                onClick={() => openModal(market.id, market.question, "NO")}
                className="flex-1 py-3 px-4 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors"
              >
                NO {market.noProbability}%
              </button>
            </div>
          </div>

          <div className="border-t border-gray-200 dark:border-gray-800 p-6">
            <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-3">
              Description
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
              {market.description}
            </p>

            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
              Resolution Criteria
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {market.resolutionCriteria}
            </p>
          </div>

          <div className="border-t border-gray-200 dark:border-gray-800 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-semibold text-gray-900 dark:text-white">
                Recent Activity
              </h2>
              <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
                <Clock className="w-3.5 h-3.5" />
                <span>Closes in {daysLeft} days</span>
              </div>
            </div>
            <div className="space-y-3">
              {market.recentActivity.map((activity, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
                      {activity.avatar}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900 dark:text-white">
                      <span className="font-medium">{activity.user}</span>{" "}
                      {activity.action.toLowerCase()}{" "}
                      <span className={`font-medium ${activity.outcome === "YES" ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}>
                        {activity.outcome}
                      </span>
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      ${activity.amount} · {activity.timestamp}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-gray-200 dark:border-gray-800 p-6">
            <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-4">
              Discussion
            </h2>
            <div className="mb-4">
              <textarea
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Share your thoughts on this market..."
                className="w-full p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                rows={2}
              />
              <div className="flex justify-end mt-2">
                <button
                  disabled={!commentText.trim()}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 dark:disabled:bg-gray-700 text-white text-sm font-medium rounded-lg transition-colors disabled:cursor-not-allowed"
                >
                  Post Comment
                </button>
              </div>
            </div>
            <div className="space-y-4">
              {market.comments.map((comment) => (
                <div key={comment.id} className="flex gap-3">
                  <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
                      {comment.avatar}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {comment.user}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {comment.timestamp}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                      {comment.content}
                    </p>
                    <button className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 hover:text-blue-500 transition-colors">
                      <ThumbsUp className="w-3.5 h-3.5" />
                      {comment.likes}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {relatedMarkets.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Related Markets
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {relatedMarkets.map((m) => (
                <MarketCard key={m.id} market={m} />
              ))}
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
