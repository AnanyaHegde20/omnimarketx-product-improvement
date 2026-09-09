"use client";

import AppLayout from "@/components/AppLayout";
import TrendingSidebar from "@/components/TrendingSidebar";
import { trendingTopics } from "@/data/social";
import { Users, UserPlus, Settings } from "lucide-react";

const groups = [
  {
    id: "1",
    name: "Crypto Traders",
    members: 12453,
    description: "Discussion on crypto market predictions",
    category: "Crypto",
  },
  {
    id: "2",
    name: "Sports Enthusiasts",
    members: 8976,
    description: "Sports betting and tournament predictions",
    category: "Sports",
  },
  {
    id: "3",
    name: "Politics Watch",
    members: 11234,
    description: "Political events and policy predictions",
    category: "Politics",
  },
  {
    id: "4",
    name: "Gaming Community",
    members: 9876,
    description: "Game releases and esports predictions",
    category: "Gaming",
  },
  {
    id: "5",
    name: "Economy Watchers",
    members: 7654,
    description: "Economic indicators and market trends",
    category: "Economy",
  },
];

export default function GroupsPage() {
  const rightPanel = (
    <div className="space-y-6">
      <TrendingSidebar topics={trendingTopics} />
    </div>
  );

  return (
    <AppLayout rightPanel={rightPanel}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
              <Users className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Groups
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Join communities and discuss predictions
              </p>
            </div>
          </div>
          <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors">
            <UserPlus className="w-4 h-4" />
            Create Group
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {groups.map((group) => (
            <div
              key={group.id}
              className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-4 hover:shadow-lg dark:hover:shadow-gray-900/50 transition-shadow"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                </div>
                <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
                  <Settings className="w-4 h-4" />
                </button>
              </div>
              <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-1">
                {group.name}
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
                {group.description}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {group.members.toLocaleString()} members
                </span>
                <button className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded-lg transition-colors">
                  Join
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
