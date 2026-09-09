import { ReactNode } from "react";

interface StatCardProps {
  label: string;
  value: string;
  icon: ReactNode;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
}

export default function StatCard({
  label,
  value,
  icon,
  change,
  changeType = "neutral",
}: StatCardProps) {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-gray-500 dark:text-gray-400">{label}</span>
        <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg">{icon}</div>
      </div>
      <div className="flex items-end gap-2">
        <span className="text-2xl font-bold text-gray-900 dark:text-white">{value}</span>
        {change && (
          <span
            className={`text-xs font-medium mb-1 ${
              changeType === "positive"
                ? "text-green-600 dark:text-green-400"
                : changeType === "negative"
                ? "text-red-600 dark:text-red-400"
                : "text-gray-500 dark:text-gray-400"
            }`}
          >
            {change}
          </span>
        )}
      </div>
    </div>
  );
}
