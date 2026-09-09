"use client";

import { Market, formatVolume } from "@/data/markets";
import { TrendingUp, TrendingDown, Zap } from "lucide-react";

interface MarketMoversProps {
  markets: Market[];
}

export default function MarketMovers({ markets }: MarketMoversProps) {
  const rising = markets
    .filter((m) => m.change && m.change > 0)
    .sort((a, b) => (b.change || 0) - (a.change || 0))
    .slice(0, 3);

  const falling = markets
    .filter((m) => m.change && m.change < 0)
    .sort((a, b) => (a.change || 0) - (b.change || 0))
    .slice(0, 3);

  const mostTraded = [...markets].sort((a, b) => b.volume - a.volume).slice(0, 3);

  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Market Movers
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-4">
          <div className="flex items-center gap-2 mb-3">
            <div className="p-1.5 bg-green-100 dark:bg-green-900/30 rounded-lg">
              <TrendingUp className="w-4 h-4 text-green-600 dark:text-green-400" />
            </div>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Rising
            </span>
          </div>
          <div className="space-y-3">
            {rising.map((market) => (
              <div key={market.id} className="flex items-center justify-between">
                <span className="text-xs text-gray-600 dark:text-gray-400 line-clamp-1 flex-1 mr-2">
                  {market.question}
                </span>
                <span className="text-xs font-medium text-green-600 dark:text-green-400 whitespace-nowrap">
                  +{market.change}%
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-4">
          <div className="flex items-center gap-2 mb-3">
            <div className="p-1.5 bg-red-100 dark:bg-red-900/30 rounded-lg">
              <TrendingDown className="w-4 h-4 text-red-600 dark:text-red-400" />
            </div>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Falling
            </span>
          </div>
          <div className="space-y-3">
            {falling.map((market) => (
              <div key={market.id} className="flex items-center justify-between">
                <span className="text-xs text-gray-600 dark:text-gray-400 line-clamp-1 flex-1 mr-2">
                  {market.question}
                </span>
                <span className="text-xs font-medium text-red-600 dark:text-red-400 whitespace-nowrap">
                  {market.change}%
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-4">
          <div className="flex items-center gap-2 mb-3">
            <div className="p-1.5 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <Zap className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            </div>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Most Traded
            </span>
          </div>
          <div className="space-y-3">
            {mostTraded.map((market) => (
              <div key={market.id} className="flex items-center justify-between">
                <span className="text-xs text-gray-600 dark:text-gray-400 line-clamp-1 flex-1 mr-2">
                  {market.question}
                </span>
                <span className="text-xs font-medium text-blue-600 dark:text-blue-400 whitespace-nowrap">
                  {formatVolume(market.volume)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
