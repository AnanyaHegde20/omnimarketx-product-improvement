"use client";

import Link from "next/link";
import { BarChart3, Users, MessageCircle, Briefcase } from "lucide-react";

const actions = [
  {
    title: "Trade What Matters",
    description: "Browse markets and make your predictions",
    icon: BarChart3,
    href: "/markets",
    color: "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400",
  },
  {
    title: "Follow Top Predictors",
    description: "See who's winning and learn from the best",
    icon: Users,
    href: "/leaderboard",
    color: "bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400",
  },
  {
    title: "Discuss & Share",
    description: "Join conversations about the hottest markets",
    icon: MessageCircle,
    href: "/social",
    color: "bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400",
  },
  {
    title: "Track Your Portfolio",
    description: "Monitor your predictions and performance",
    icon: Briefcase,
    href: "/portfolio",
    color: "bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400",
  },
];

export default function QuickActions() {
  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Quick Actions
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {actions.map((action) => (
          <Link
            key={action.title}
            href={action.href}
            className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-4 hover:shadow-lg dark:hover:shadow-gray-900/50 transition-shadow"
          >
            <div
              className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${action.color}`}
            >
              <action.icon className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
              {action.title}
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {action.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
