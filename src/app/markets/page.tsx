"use client";

import { useState } from "react";
import AppLayout from "@/components/AppLayout";
import CategoryTabs from "@/components/CategoryTabs";
import MarketCard from "@/components/MarketCard";
import TrendingSidebar from "@/components/TrendingSidebar";
import { EmptyState } from "@/components/UIStates";
import { markets, categories } from "@/data/markets";
import { trendingTopics } from "@/data/social";
import { Search } from "lucide-react";

export default function MarketsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredMarkets = markets.filter((market) => {
    const matchesCategory =
      selectedCategory === "All" || market.category === selectedCategory;
    const matchesSearch = market.question
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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
            Markets
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Browse and trade on prediction markets
          </p>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search markets..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg text-sm text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <CategoryTabs
          categories={categories}
          selected={selectedCategory}
          onSelect={setSelectedCategory}
        />

        {filteredMarkets.length === 0 ? (
          <EmptyState
            title="No markets found"
            description="Try changing your search or category."
            action={{
              label: "Clear Filters",
              onClick: () => {
                setSearchQuery("");
                setSelectedCategory("All");
              },
            }}
          />
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
