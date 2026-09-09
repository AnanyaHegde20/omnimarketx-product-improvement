"use client";

import { useTradeModal } from "@/context/TradeModalContext";
import TradeModal from "./TradeModal";

export default function TradeModalWrapper() {
  const { marketId, selectedOutcome } = useTradeModal();
  const modalKey = marketId && selectedOutcome ? `${marketId}-${selectedOutcome}` : "empty";
  return <TradeModal key={modalKey} />;
}
