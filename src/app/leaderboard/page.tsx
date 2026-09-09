"use client";

import AppLayout from "@/components/AppLayout";
import TrendingSidebar from "@/components/TrendingSidebar";
import { trendingTopics } from "@/data/social";
import { users } from "@/data/users";
import { Trophy, Medal, TrendingUp, Target, BarChart3, Zap } from "lucide-react";

export default function LeaderboardPage() {
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
            <Trophy className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Leaderboard
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Top predictors this month
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {users.map((user, index) => (
            <div
              key={user.id}
              className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden"
            >
              <div className="flex items-center gap-4 p-4">
                <div className="w-8 text-center flex-shrink-0">
                  {index === 0 ? (
                    <Medal className="w-6 h-6 text-yellow-500 mx-auto" />
                  ) : index === 1 ? (
                    <Medal className="w-6 h-6 text-gray-400 mx-auto" />
                  ) : index === 2 ? (
                    <Medal className="w-6 h-6 text-amber-600 mx-auto" />
                  ) : (
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      #{user.rank}
                    </span>
                  )}
                </div>

                <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                    {user.avatar}
                  </span>
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">
                    {user.name}
                  </p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {user.predictions} predictions
                    </span>
                    <span className="text-gray-300 dark:text-gray-600">·</span>
                    <span className={`text-xs font-medium ${
                      user.consistency === "High"
                        ? "text-green-600 dark:text-green-400"
                        : user.consistency === "Medium"
                        ? "text-yellow-600 dark:text-yellow-400"
                        : "text-gray-500 dark:text-gray-400"
                    }`}>
                      {user.consistency} consistency
                    </span>
                  </div>
                </div>

                <div className="text-right flex-shrink-0">
                  <p className="text-sm font-semibold text-green-600 dark:text-green-400">
                    +${user.profit.toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {user.winRate}% win rate
                  </p>
                </div>
              </div>

              <div className="border-t border-gray-200 dark:border-gray-800 px-4 py-3 bg-gray-50 dark:bg-gray-800/30">
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 mb-0.5">
                      <Target className="w-3 h-3 text-blue-500" />
                      <span className="text-xs text-gray-500 dark:text-gray-400">Forecast</span>
                    </div>
                    <p className="text-sm font-bold text-gray-900 dark:text-white">
                      {user.forecastScore}
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 mb-0.5">
                      <TrendingUp className="w-3 h-3 text-green-500" />
                      <span className="text-xs text-gray-500 dark:text-gray-400">ROI</span>
                    </div>
                    <p className="text-sm font-bold text-green-600 dark:text-green-400">
                      +{user.roi}%
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 mb-0.5">
                      <BarChart3 className="w-3 h-3 text-purple-500" />
                      <span className="text-xs text-gray-500 dark:text-gray-400">Win Rate</span>
                    </div>
                    <p className="text-sm font-bold text-gray-900 dark:text-white">
                      {user.winRate}%
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 mb-0.5">
                      <Zap className="w-3 h-3 text-yellow-500" />
                      <span className="text-xs text-gray-500 dark:text-gray-400">Predictions</span>
                    </div>
                    <p className="text-sm font-bold text-gray-900 dark:text-white">
                      {user.predictions}
                    </p>
                  </div>
                  <div className="col-span-2 sm:col-span-2">
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Specialties</p>
                    <div className="flex flex-wrap gap-1">
                      {user.specialties.map((s) => (
                        <span
                          key={s}
                          className="px-2 py-0.5 bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded-full"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
