"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";

interface WatchlistContextType {
  watchlist: string[];
  toggleWatchlist: (marketId: string) => void;
  isWatched: (marketId: string) => boolean;
}

const WatchlistContext = createContext<WatchlistContextType | undefined>(undefined);

function getInitialWatchlist(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const saved = localStorage.getItem("omnimarketx-watchlist");
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

export function WatchlistProvider({ children }: { children: ReactNode }) {
  const [watchlist, setWatchlist] = useState<string[]>(getInitialWatchlist);

  const toggleWatchlist = useCallback((marketId: string) => {
    setWatchlist((prev) => {
      const next = prev.includes(marketId)
        ? prev.filter((id) => id !== marketId)
        : [...prev, marketId];
      localStorage.setItem("omnimarketx-watchlist", JSON.stringify(next));
      return next;
    });
  }, []);

  const isWatched = useCallback(
    (marketId: string) => watchlist.includes(marketId),
    [watchlist]
  );

  return (
    <WatchlistContext.Provider value={{ watchlist, toggleWatchlist, isWatched }}>
      {children}
    </WatchlistContext.Provider>
  );
}

export function useWatchlist() {
  const context = useContext(WatchlistContext);
  if (!context) {
    return {
      watchlist: [],
      toggleWatchlist: () => {},
      isWatched: () => false,
    };
  }
  return context;
}
