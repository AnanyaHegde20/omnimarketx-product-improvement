"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="fixed bottom-4 left-4 z-[9999] flex items-center justify-center w-10 h-10 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer"
      aria-label="Go back"
    >
      <ArrowLeft className="w-4 h-4 text-gray-600 dark:text-gray-300" />
    </button>
  );
}
