"use client";

import AppLayout from "@/components/AppLayout";
import TrendingSidebar from "@/components/TrendingSidebar";
import { trendingTopics } from "@/data/social";
import { currentUser } from "@/data/users";
import { Wallet, ArrowUpRight, ArrowDownLeft, CreditCard } from "lucide-react";

const transactions = [
  {
    id: "1",
    type: "deposit",
    description: "Deposit from bank account",
    amount: 500,
    timestamp: "2 hours ago",
  },
  {
    id: "2",
    type: "withdrawal",
    description: "Withdrawal to wallet",
    amount: -200,
    timestamp: "1 day ago",
  },
  {
    id: "3",
    type: "prediction",
    description: "Prediction on Bitcoin $150K",
    amount: -100,
    timestamp: "2 days ago",
  },
  {
    id: "4",
    type: "winning",
    description: "Winnings from GTA VI prediction",
    amount: 150,
    timestamp: "3 days ago",
  },
];

export default function WalletPage() {
  const rightPanel = (
    <div className="space-y-6">
      <TrendingSidebar topics={trendingTopics} />
    </div>
  );

  return (
    <AppLayout rightPanel={rightPanel}>
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg">
            <Wallet className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Wallet
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Manage your funds and transactions
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl p-6 text-white">
          <p className="text-sm text-emerald-100 mb-1">Available Balance</p>
          <p className="text-3xl font-bold mb-4">
            ${currentUser.balance.toLocaleString()}
          </p>
          <div className="flex gap-3">
            <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-white/20 hover:bg-white/30 text-white font-medium rounded-lg transition-colors text-sm">
              <ArrowDownLeft className="w-4 h-4" />
              Deposit
            </button>
            <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-white/20 hover:bg-white/30 text-white font-medium rounded-lg transition-colors text-sm">
              <ArrowUpRight className="w-4 h-4" />
              Withdraw
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-4">
            <div className="flex items-center gap-2 mb-2">
              <CreditCard className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Total Deposited
              </span>
            </div>
            <p className="text-xl font-bold text-gray-900 dark:text-white">
              $12,500
            </p>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-4">
            <div className="flex items-center gap-2 mb-2">
              <ArrowUpRight className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Total Withdrawn
              </span>
            </div>
            <p className="text-xl font-bold text-gray-900 dark:text-white">
              $7,500
            </p>
          </div>
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-4">
            <div className="flex items-center gap-2 mb-2">
              <Wallet className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Total Winnings
              </span>
            </div>
            <p className="text-xl font-bold text-green-600 dark:text-green-400">
              +$3,230
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800">
          <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-800">
            <h2 className="text-base font-semibold text-gray-900 dark:text-white">
              Recent Transactions
            </h2>
          </div>
          <div className="divide-y divide-gray-200 dark:divide-gray-800">
            {transactions.map((tx) => (
              <div
                key={tx.id}
                className="flex items-center gap-4 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
              >
                <div
                  className={`p-2 rounded-lg ${
                    tx.amount > 0
                      ? "bg-green-100 dark:bg-green-900/30"
                      : "bg-red-100 dark:bg-red-900/30"
                  }`}
                >
                  {tx.amount > 0 ? (
                    <ArrowDownLeft className="w-4 h-4 text-green-600 dark:text-green-400" />
                  ) : (
                    <ArrowUpRight className="w-4 h-4 text-red-600 dark:text-red-400" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900 dark:text-white">
                    {tx.description}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {tx.timestamp}
                  </p>
                </div>
                <span
                  className={`text-sm font-medium ${
                    tx.amount > 0
                      ? "text-green-600 dark:text-green-400"
                      : "text-red-600 dark:text-red-400"
                  }`}
                >
                  {tx.amount > 0 ? "+" : ""}${Math.abs(tx.amount)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
