"use client";

import { useState } from "react";
import { DollarSign, TrendingUp, Target, Award, ArrowRight } from "lucide-react";
import Link from "next/link";
import AppLayout from "@/components/AppLayout";
import StatCard from "@/components/StatCard";
import CategoryTabs from "@/components/CategoryTabs";
import MarketCard from "@/components/MarketCard";
import TrendingMarkets from "@/components/TrendingMarkets";
import MarketMovers from "@/components/MarketMovers";
import SocialPostCard from "@/components/SocialPostCard";
import TrendingSidebar from "@/components/TrendingSidebar";
import QuickActions from "@/components/QuickActions";
import { markets, categories } from "@/data/markets";
import { socialPosts, trendingTopics } from "@/data/social";
import { currentUser } from "@/data/users";

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredMarkets =
    selectedCategory === "All"
      ? markets
      : markets.filter((m) => m.category === selectedCategory);

  const trendingMarkets = markets.filter((m) => m.trending).slice(0, 6);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  const rightPanel = (
    <div className="space-y-6">
      <TrendingSidebar topics={trendingTopics} />
    </div>
  );

  return (
    <AppLayout rightPanel={rightPanel}>
      <div className="space-y-8">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-6 lg:p-8 text-white">
          <h1 className="text-2xl lg:text-3xl font-bold mb-2">
            {getGreeting()} 👋
          </h1>
          <p className="text-blue-100 mb-6 max-w-lg">
            Discover markets. Make predictions. Follow what matters.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/markets"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-white text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition-colors text-sm"
            >
              Explore Markets
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/markets"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-500/20 text-white font-medium rounded-lg hover:bg-blue-500/30 transition-colors text-sm"
            >
              Create Prediction
            </Link>
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-500/20 text-white font-medium rounded-lg hover:bg-blue-500/30 transition-colors text-sm"
            >
              View Portfolio
            </Link>
          </div>
        </div>

        {/* Stats */}
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
            label="Active Predictions"
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

        {/* Quick Actions */}
        <QuickActions />

        {/* Category Tabs */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Browse Markets
          </h2>
          <CategoryTabs
            categories={categories}
            selected={selectedCategory}
            onSelect={setSelectedCategory}
          />
        </div>

        {/* Filtered Markets */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredMarkets.slice(0, 6).map((market) => (
            <MarketCard key={market.id} market={market} />
          ))}
        </div>

        {/* Trending Markets */}
        <TrendingMarkets markets={trendingMarkets} />

        {/* Market Movers */}
        <MarketMovers markets={markets} />

        {/* Social Feed */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Social Feed
            </h2>
            <Link
              href="/social"
              className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
            >
              View All
            </Link>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {socialPosts.slice(0, 4).map((post) => (
              <SocialPostCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
