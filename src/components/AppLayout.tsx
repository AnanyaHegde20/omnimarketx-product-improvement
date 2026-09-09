"use client";

import { ReactNode } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import MobileNav from "./MobileNav";

interface AppLayoutProps {
  children: ReactNode;
  rightPanel?: ReactNode;
}

export default function AppLayout({ children, rightPanel }: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Sidebar />
      <div className="lg:ml-64">
        <Header />
        <main className="min-h-[calc(100vh-64px)] pb-24 lg:pb-0">
          <div className="flex">
            <div className="flex-1 p-4 lg:p-6">{children}</div>
            {rightPanel && (
              <div className="hidden xl:block w-80 p-4 lg:p-6 border-l border-gray-200 dark:border-gray-800">
                {rightPanel}
              </div>
            )}
          </div>
        </main>
      </div>
      <MobileNav />
    </div>
  );
}
