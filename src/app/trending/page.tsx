"use client";

import { useState } from "react";
import AppLayout from "@/components/AppLayout";
import CategoryTabs from "@/components/CategoryTabs";
import MarketCard from "@/components/MarketCard";
import TrendingSidebar from "@/components/TrendingSidebar";
import { markets, categories } from "@/data/markets";
import { trendingTopics } from "@/data/social";
import { TrendingUp, Flame } from "lucide-react";

export default function TrendingPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const trendingMarkets = markets.filter((m) => m.trending);
  const filteredMarkets =
    selectedCategory === "All"
      ? trendingMarkets
      : trendingMarkets.filter((m) => m.category === selectedCategory);

  const rightPanel = (
    <div className="space-y-6">
      <TrendingSidebar topics={trendingTopics} />
    </div>
  );

  return (
    <AppLayout rightPanel={rightPanel}>
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
            <Flame className="w-6 h-6 text-orange-600 dark:text-orange-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Trending
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Hot markets gaining traction right now
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-xl p-4 text-white">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-5 h-5" />
            <span className="font-semibold">Market Movers</span>
          </div>
          <p className="text-sm text-orange-100">
            Markets with significant activity and price movements in the last 24
            hours.
          </p>
        </div>

        <CategoryTabs
          categories={categories}
          selected={selectedCategory}
          onSelect={setSelectedCategory}
        />

        {filteredMarkets.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">
              No trending markets in this category.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {filteredMarkets.map((market) => (
              <MarketCard key={market.id} market={market} />
            ))}
          </div>
        )}
      </div>
    </AppLayout>
  );
}
