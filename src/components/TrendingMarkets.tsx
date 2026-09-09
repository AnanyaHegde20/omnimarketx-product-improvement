"use client";

import { Market } from "@/data/markets";
import MarketCard from "./MarketCard";

interface TrendingMarketsProps {
  markets: Market[];
}

export default function TrendingMarkets({ markets }: TrendingMarketsProps) {
  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Trending Markets
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {markets.map((market) => (
          <MarketCard key={market.id} market={market} />
        ))}
      </div>
    </div>
  );
}
