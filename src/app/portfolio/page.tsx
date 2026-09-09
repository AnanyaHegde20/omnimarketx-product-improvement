"use client";

import AppLayout from "@/components/AppLayout";
import StatCard from "@/components/StatCard";
import TrendingSidebar from "@/components/TrendingSidebar";
import { trendingTopics } from "@/data/social";
import { currentUser } from "@/data/users";
import { DollarSign, TrendingUp, Target, Award } from "lucide-react";

const portfolioPositions = [
  { market: "Will Bitcoin reach $150K this year?", outcome: "YES", shares: 150, avgPrice: 0.68, currentPrice: 0.72 },
  { market: "Will GTA VI launch in 2026?", outcome: "YES", shares: 200, avgPrice: 0.75, currentPrice: 0.81 },
  { market: "Will India win the next major cricket tournament?", outcome: "NO", shares: 100, avgPrice: 0.32, currentPrice: 0.35 },
  { market: "Will the US Federal Reserve cut rates in Q4?", outcome: "YES", shares: 250, avgPrice: 0.62, currentPrice: 0.67 },
  { market: "Will Ethereum surpass $5K this year?", outcome: "YES", shares: 180, avgPrice: 0.55, currentPrice: 0.58 },
];

export default function PortfolioPage() {
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
            Portfolio
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Track your predictions and performance
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            label="Portfolio Value"
            value={`$${currentUser.portfolioValue.toLocaleString()}`}
            icon={<DollarSign className="w-4 h-4 text-gray-500" />}
            change="+12.5%"
            changeType="positive"
          />
          <StatCard
            label="Total Profit/Loss"
            value={`$${currentUser.totalProfit.toLocaleString()}`}
            icon={<TrendingUp className="w-4 h-4 text-gray-500" />}
            change="+8.2%"
            changeType="positive"
          />
          <StatCard
            label="Active Positions"
            value={currentUser.activePredictions.toString()}
            icon={<Target className="w-4 h-4 text-gray-500" />}
            change="3 new"
            changeType="neutral"
          />
          <StatCard
            label="Win Rate"
            value={`${currentUser.winRate}%`}
            icon={<Award className="w-4 h-4 text-gray-500" />}
            change="+2.1%"
            changeType="positive"
          />
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-800">
            <h2 className="text-base font-semibold text-gray-900 dark:text-white">
              Your Positions
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-800">
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                    Market
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                    Outcome
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                    Shares
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                    Avg Price
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                    Current
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                    P&L
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                {portfolioPositions.map((position, i) => {
                  const pnl = (position.currentPrice - position.avgPrice) * position.shares;
                  return (
                    <tr key={i} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                      <td className="px-4 py-3">
                        <span className="text-sm text-gray-900 dark:text-white line-clamp-1 max-w-xs block">
                          {position.market}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            position.outcome === "YES"
                              ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                              : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                          }`}
                        >
                          {position.outcome}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right text-sm text-gray-900 dark:text-white">
                        {position.shares}
                      </td>
                      <td className="px-4 py-3 text-right text-sm text-gray-600 dark:text-gray-400">
                        ${(position.avgPrice * 100).toFixed(0)}¢
                      </td>
                      <td className="px-4 py-3 text-right text-sm text-gray-900 dark:text-white">
                        ${(position.currentPrice * 100).toFixed(0)}¢
                      </td>
                      <td className="px-4 py-3 text-right">
                        <span
                          className={`text-sm font-medium ${
                            pnl >= 0
                              ? "text-green-600 dark:text-green-400"
                              : "text-red-600 dark:text-red-400"
                          }`}
                        >
                          {pnl >= 0 ? "+" : ""}${pnl.toFixed(2)}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
