"use client";

import { TrendingTopic } from "@/data/social";
import { TrendingUp } from "lucide-react";

interface TrendingSidebarProps {
  topics: TrendingTopic[];
}

export default function TrendingSidebar({ topics }: TrendingSidebarProps) {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-4">
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp className="w-5 h-5 text-blue-600 dark:text-blue-400" />
        <h3 className="text-base font-semibold text-gray-900 dark:text-white">
          Trending Now
        </h3>
      </div>
      <div className="space-y-3">
        {topics.map((topic) => (
          <div
            key={topic.id}
            className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer"
          >
            <div>
              <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                #{topic.tag}
              </span>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {topic.posts.toLocaleString()} posts
              </p>
            </div>
            <span className="text-xs text-gray-400 dark:text-gray-500">
              {topic.category}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
