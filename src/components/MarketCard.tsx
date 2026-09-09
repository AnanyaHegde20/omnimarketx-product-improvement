"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Market, formatVolume, formatTraders } from "@/data/markets";
import { useTradeModal } from "@/context/TradeModalContext";
import { useWatchlist } from "@/context/WatchlistContext";
import { Users, TrendingUp, TrendingDown, Star, Clock } from "lucide-react";

interface MarketCardProps {
  market: Market;
}

export default function MarketCard({ market }: MarketCardProps) {
  const { openModal } = useTradeModal();
  const { toggleWatchlist, isWatched } = useWatchlist();

  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 60000);
    return () => clearInterval(id);
  }, []);

  const daysLeft = Math.max(
    0,
    Math.ceil((new Date(market.endDate).getTime() - now) / (1000 * 60 * 60 * 24))
  );

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Crypto":
        return "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400";
      case "Sports":
        return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400";
      case "Gaming":
        return "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400";
      case "Politics":
        return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400";
      case "Economy":
        return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400";
      case "Entertainment":
        return "bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400";
      case "Tech":
        return "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400";
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400";
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-4 hover:shadow-lg dark:hover:shadow-gray-900/50 transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <span
          className={`px-2.5 py-1 rounded-full text-xs font-medium ${getCategoryColor(
            market.category
          )}`}
        >
          {market.category}
        </span>
        <div className="flex items-center gap-2">
          {market.change !== undefined && (
            <div
              className={`flex items-center gap-1 text-xs font-medium ${
                market.change >= 0
                  ? "text-green-600 dark:text-green-400"
                  : "text-red-600 dark:text-red-400"
              }`}
            >
              {market.change >= 0 ? (
                <TrendingUp className="w-3 h-3" />
              ) : (
                <TrendingDown className="w-3 h-3" />
              )}
              {market.change >= 0 ? "+" : ""}
              {market.change}%
            </div>
          )}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleWatchlist(market.id);
            }}
            className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label={isWatched(market.id) ? "Remove from watchlist" : "Add to watchlist"}
          >
            <Star
              className={`w-4 h-4 transition-colors ${
                isWatched(market.id)
                  ? "text-yellow-500 fill-yellow-500"
                  : "text-gray-400 dark:text-gray-500"
              }`}
            />
          </button>
        </div>
      </div>

      <Link href={`/markets/${market.id}`} className="block mb-3">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white line-clamp-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
          {market.question}
        </h3>
      </Link>

      <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400 mb-4">
        <div className="flex items-center gap-1">
          <TrendingUp className="w-3.5 h-3.5" />
          <span>{formatVolume(market.volume)}</span>
        </div>
        <div className="flex items-center gap-1">
          <Users className="w-3.5 h-3.5" />
          <span>{formatTraders(market.traders)} traders</span>
        </div>
        <div className="flex items-center gap-1">
          <Clock className="w-3.5 h-3.5" />
          <span>{daysLeft}d left</span>
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => openModal(market.id, market.question, "YES")}
          className="flex-1 py-2.5 px-4 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg transition-colors"
        >
          YES {market.yesProbability}%
        </button>
        <button
          onClick={() => openModal(market.id, market.question, "NO")}
          className="flex-1 py-2.5 px-4 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg transition-colors"
        >
          NO {market.noProbability}%
        </button>
      </div>
    </div>
  );
}
