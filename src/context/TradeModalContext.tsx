"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface TradeModalContextType {
  isOpen: boolean;
  marketId: string | null;
  marketQuestion: string;
  selectedOutcome: "YES" | "NO" | null;
  openModal: (marketId: string, question: string, outcome: "YES" | "NO") => void;
  closeModal: () => void;
}

const TradeModalContext = createContext<TradeModalContextType | undefined>(undefined);

export function TradeModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [marketId, setMarketId] = useState<string | null>(null);
  const [marketQuestion, setMarketQuestion] = useState("");
  const [selectedOutcome, setSelectedOutcome] = useState<"YES" | "NO" | null>(null);

  const openModal = (id: string, question: string, outcome: "YES" | "NO") => {
    setMarketId(id);
    setMarketQuestion(question);
    setSelectedOutcome(outcome);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setMarketId(null);
    setMarketQuestion("");
    setSelectedOutcome(null);
  };

  return (
    <TradeModalContext.Provider
      value={{ isOpen, marketId, marketQuestion, selectedOutcome, openModal, closeModal }}
    >
      {children}
    </TradeModalContext.Provider>
  );
}

export function useTradeModal() {
  const context = useContext(TradeModalContext);
  if (!context) {
    return {
      isOpen: false,
      marketId: null,
      marketQuestion: "",
      selectedOutcome: null,
      openModal: () => {},
      closeModal: () => {},
    };
  }
  return context;
}
