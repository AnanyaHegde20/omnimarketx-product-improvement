"use client";

import AppLayout from "@/components/AppLayout";
import MarketCard from "@/components/MarketCard";
import TrendingSidebar from "@/components/TrendingSidebar";
import { markets } from "@/data/markets";
import { trendingTopics } from "@/data/social";
import { useWatchlist } from "@/context/WatchlistContext";
import { Star } from "lucide-react";

export default function WatchlistPage() {
  const { watchlist } = useWatchlist();

  const watchedMarkets = markets.filter((m) => watchlist.includes(m.id));

  const rightPanel = (
    <div className="space-y-6">
      <TrendingSidebar topics={trendingTopics} />
    </div>
  );

  return (
    <AppLayout rightPanel={rightPanel}>
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
            <Star className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Watchlist
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Markets you are following
            </p>
          </div>
        </div>

        {watchedMarkets.length === 0 ? (
          <div className="text-center py-16">
            <Star className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              No watched markets
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              Click the star icon on any market to add it to your watchlist.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {watchedMarkets.map((market) => (
              <MarketCard key={market.id} market={market} />
            ))}
          </div>
        )}
      </div>
    </AppLayout>
  );
}
