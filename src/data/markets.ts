export interface MarketActivity {
  user: string;
  avatar: string;
  action: string;
  outcome: "YES" | "NO";
  amount: number;
  timestamp: string;
}

export interface MarketComment {
  id: string;
  user: string;
  avatar: string;
  content: string;
  timestamp: string;
  likes: number;
}

export interface MarketIntelligence {
  sentiment: "Bullish" | "Bearish" | "Neutral";
  momentum: string;
  movingPoints: string[];
}

export interface Market {
  id: string;
  question: string;
  category: string;
  yesProbability: number;
  noProbability: number;
  volume: number;
  traders: number;
  endDate: string;
  description: string;
  resolutionCriteria: string;
  trending: boolean;
  change?: number;
  recentActivity: MarketActivity[];
  comments: MarketComment[];
  probabilityHistory: number[];
  intelligence: MarketIntelligence;
}

export const markets: Market[] = [
  {
    id: "1",
    question: "Will Bitcoin reach $150K this year?",
    category: "Crypto",
    yesProbability: 72,
    noProbability: 28,
    volume: 2450000,
    traders: 18432,
    endDate: "2026-12-31",
    description: "Bitcoin price prediction for end of 2026",
    resolutionCriteria: "Bitcoin must reach or exceed $150,000 USD on any major exchange before December 31, 2026.",
    trending: true,
    change: 5.2,
    probabilityHistory: [45, 52, 58, 61, 65, 68, 70, 72],
    intelligence: {
      sentiment: "Bullish",
      momentum: "+5.2% today",
      movingPoints: [
        "Institutional adoption accelerating this quarter",
        "More users are taking the YES position",
        "Recent halving cycle pushing probability upward",
      ],
    },
    recentActivity: [
      { user: "Alex Thompson", avatar: "AT", action: "Predicted YES", outcome: "YES", amount: 200, timestamp: "2 hours ago" },
      { user: "Sarah Chen", avatar: "SC", action: "Predicted NO", outcome: "NO", amount: 100, timestamp: "5 hours ago" },
      { user: "Mike Johnson", avatar: "MJ", action: "Predicted YES", outcome: "YES", amount: 150, timestamp: "8 hours ago" },
    ],
    comments: [
      { id: "c1", user: "Alex Thompson", avatar: "AT", content: "Institutional adoption is massive this year. Easy YES.", timestamp: "2 hours ago", likes: 24 },
      { id: "c2", user: "Emma Wilson", avatar: "EW", content: "The halving cycle pattern suggests we could see $150K by Q3.", timestamp: "6 hours ago", likes: 18 },
      { id: "c3", user: "James Brown", avatar: "JB", content: "I'm cautiously optimistic. Regulatory uncertainty is the main risk.", timestamp: "1 day ago", likes: 12 },
    ],
  },
  {
    id: "2",
    question: "Will India win the next major cricket tournament?",
    category: "Sports",
    yesProbability: 65,
    noProbability: 35,
    volume: 1890000,
    traders: 15678,
    endDate: "2026-11-15",
    description: "Indian cricket team performance prediction",
    resolutionCriteria: "India must win the ICC Cricket World Cup or ICC Champions Trophy scheduled in 2026.",
    trending: true,
    change: 3.1,
    probabilityHistory: [50, 55, 58, 60, 62, 63, 64, 65],
    intelligence: {
      sentiment: "Bullish",
      momentum: "+3.1% this week",
      movingPoints: [
        "India's recent series wins boosting confidence",
        "More users backing the home advantage factor",
        "Squad announcements driving predictions",
      ],
    },
    recentActivity: [
      { user: "Emma Wilson", avatar: "EW", action: "Predicted YES", outcome: "YES", amount: 175, timestamp: "4 hours ago" },
      { user: "Lisa Davis", avatar: "LD", action: "Predicted YES", outcome: "YES", amount: 120, timestamp: "10 hours ago" },
    ],
    comments: [
      { id: "c4", user: "Emma Wilson", avatar: "EW", content: "India's batting lineup looks solid this season.", timestamp: "4 hours ago", likes: 15 },
      { id: "c5", user: "Mike Johnson", avatar: "MJ", content: "Home advantage will be key in the tournament.", timestamp: "1 day ago", likes: 9 },
    ],
  },
  {
    id: "3",
    question: "Will GTA VI launch in 2026?",
    category: "Gaming",
    yesProbability: 81,
    noProbability: 19,
    volume: 3120000,
    traders: 24567,
    endDate: "2026-12-31",
    description: "Rockstar Games release schedule prediction",
    resolutionCriteria: "Grand Theft Auto VI must be officially released and available for purchase before December 31, 2026.",
    trending: true,
    change: 8.4,
    probabilityHistory: [60, 65, 70, 73, 76, 78, 80, 81],
    intelligence: {
      sentiment: "Bullish",
      momentum: "+8.4% this month",
      movingPoints: [
        "Official trailer confirmed 2026 release window",
        "Trading activity has increased significantly",
        "High-volume YES bets from experienced predictors",
      ],
    },
    recentActivity: [
      { user: "Sarah Chen", avatar: "SC", action: "Predicted YES", outcome: "YES", amount: 300, timestamp: "1 hour ago" },
      { user: "David Martinez", avatar: "DM", action: "Predicted YES", outcome: "YES", amount: 200, timestamp: "3 hours ago" },
      { user: "Jennifer Garcia", avatar: "JG", action: "Predicted NO", outcome: "NO", amount: 75, timestamp: "6 hours ago" },
    ],
    comments: [
      { id: "c6", user: "Sarah Chen", avatar: "SC", content: "Rockstar has been consistent with their messaging. Loading up on YES shares!", timestamp: "1 hour ago", likes: 32 },
      { id: "c7", user: "James Brown", avatar: "JB", content: "The trailer confirmed 2026. I'd be shocked if they delay again.", timestamp: "3 hours ago", likes: 21 },
    ],
  },
  {
    id: "4",
    question: "Will AI adoption increase significantly this year?",
    category: "Economy",
    yesProbability: 89,
    noProbability: 11,
    volume: 4560000,
    traders: 31234,
    endDate: "2026-12-31",
    description: "Enterprise AI adoption growth prediction",
    resolutionCriteria: "Enterprise AI spending must increase by more than 25% year-over-year according to major analyst reports.",
    trending: true,
    change: 2.7,
    probabilityHistory: [70, 74, 78, 82, 85, 87, 88, 89],
    intelligence: {
      sentiment: "Bullish",
      momentum: "+2.7% this week",
      movingPoints: [
        "Enterprise AI spending reports exceed forecasts",
        "More users taking the YES position",
        "Consensus among top predictors is strongly positive",
      ],
    },
    recentActivity: [
      { user: "James Brown", avatar: "JB", action: "Predicted YES", outcome: "YES", amount: 500, timestamp: "30 minutes ago" },
      { user: "Alex Thompson", avatar: "AT", action: "Predicted YES", outcome: "YES", amount: 250, timestamp: "2 hours ago" },
    ],
    comments: [
      { id: "c8", user: "James Brown", avatar: "JB", content: "AI adoption is already exceeding expectations. Enterprise spending is through the roof.", timestamp: "30 minutes ago", likes: 28 },
      { id: "c9", user: "Lisa Davis", avatar: "LD", content: "Every major tech company is pivoting to AI-first strategies.", timestamp: "4 hours ago", likes: 19 },
    ],
  },
  {
    id: "5",
    question: "Will Ethereum surpass $5K this year?",
    category: "Crypto",
    yesProbability: 58,
    noProbability: 42,
    volume: 1890000,
    traders: 12456,
    endDate: "2026-12-31",
    description: "Ethereum price prediction for 2026",
    resolutionCriteria: "Ethereum must reach or exceed $5,000 USD on any major exchange before December 31, 2026.",
    trending: false,
    change: -2.3,
    probabilityHistory: [65, 62, 60, 58, 56, 57, 58, 58],
    intelligence: {
      sentiment: "Bearish",
      momentum: "-2.3% this week",
      movingPoints: [
        "Scalability concerns resurfacing in community discussions",
        "More users shifting to NO positions",
        "Recent network performance issues affecting sentiment",
      ],
    },
    recentActivity: [
      { user: "David Martinez", avatar: "DM", action: "Predicted NO", outcome: "NO", amount: 180, timestamp: "4 hours ago" },
      { user: "Jennifer Garcia", avatar: "JG", action: "Predicted YES", outcome: "YES", amount: 120, timestamp: "8 hours ago" },
    ],
    comments: [
      { id: "c10", user: "David Martinez", avatar: "DM", content: "Ethereum's scalability concerns make $5K unlikely this year.", timestamp: "4 hours ago", likes: 14 },
    ],
  },
  {
    id: "6",
    question: "Will the US Federal Reserve cut rates in Q4?",
    category: "Economy",
    yesProbability: 67,
    noProbability: 33,
    volume: 2780000,
    traders: 19876,
    endDate: "2026-12-31",
    description: "Federal Reserve monetary policy prediction",
    resolutionCriteria: "The Federal Reserve must cut the federal funds rate by at least 25 basis points during Q4 2026.",
    trending: true,
    change: 4.5,
    probabilityHistory: [40, 45, 50, 55, 58, 62, 65, 67],
    intelligence: {
      sentiment: "Bullish",
      momentum: "+4.5% this month",
      movingPoints: [
        "Fed signals openness to rate cuts if data supports",
        "Inflation data cooling faster than expected",
        "Experienced predictors increasing YES positions",
      ],
    },
    recentActivity: [
      { user: "Mike Johnson", avatar: "MJ", action: "Predicted YES", outcome: "YES", amount: 350, timestamp: "1 hour ago" },
      { user: "Alex Thompson", avatar: "AT", action: "Predicted YES", outcome: "YES", amount: 200, timestamp: "5 hours ago" },
    ],
    comments: [
      { id: "c11", user: "Mike Johnson", avatar: "MJ", content: "With inflation cooling, Q4 rate cut is very likely.", timestamp: "1 hour ago", likes: 22 },
      { id: "c12", user: "Emma Wilson", avatar: "EW", content: "The Fed has signaled openness to cuts if data supports it.", timestamp: "3 hours ago", likes: 16 },
    ],
  },
  {
    id: "7",
    question: "Will Apple release a foldable iPhone in 2026?",
    category: "Crypto",
    yesProbability: 34,
    noProbability: 66,
    volume: 1230000,
    traders: 8765,
    endDate: "2026-12-31",
    description: "Apple product release prediction",
    resolutionCriteria: "Apple must officially announce and release a foldable iPhone model before December 31, 2026.",
    trending: false,
    change: -1.8,
    probabilityHistory: [40, 38, 36, 35, 34, 34, 34, 34],
    intelligence: {
      sentiment: "Bearish",
      momentum: "-1.8% this month",
      movingPoints: [
        "Supply chain reports suggest no foldable launch",
        "More users taking the NO position",
        "Apple's conservative track record on form factors",
      ],
    },
    recentActivity: [
      { user: "Jennifer Garcia", avatar: "JG", action: "Predicted NO", outcome: "NO", amount: 150, timestamp: "6 hours ago" },
    ],
    comments: [
      { id: "c13", user: "Jennifer Garcia", avatar: "JG", content: "Apple is notoriously slow with new form factors. Not happening in 2026.", timestamp: "6 hours ago", likes: 11 },
    ],
  },
  {
    id: "8",
    question: "Will Real Madrid win the Champions League?",
    category: "Sports",
    yesProbability: 45,
    noProbability: 55,
    volume: 2340000,
    traders: 17654,
    endDate: "2026-06-30",
    description: "UEFA Champions League winner prediction",
    resolutionCriteria: "Real Madrid must win the 2025-26 UEFA Champions League final.",
    trending: true,
    change: 6.2,
    probabilityHistory: [35, 38, 40, 42, 43, 44, 45, 45],
    intelligence: {
      sentiment: "Neutral",
      momentum: "+6.2% this month",
      movingPoints: [
        "Strong recent form pushing YES predictions",
        "Competitive field creating uncertainty",
        "High trading volume from experienced predictors",
      ],
    },
    recentActivity: [
      { user: "Lisa Davis", avatar: "LD", action: "Predicted YES", outcome: "YES", amount: 200, timestamp: "3 hours ago" },
      { user: "Mike Johnson", avatar: "MJ", action: "Predicted NO", outcome: "NO", amount: 150, timestamp: "7 hours ago" },
    ],
    comments: [
      { id: "c14", user: "Lisa Davis", avatar: "LD", content: "Real Madrid always performs in the Champions League. Never count them out.", timestamp: "3 hours ago", likes: 17 },
    ],
  },
  {
    id: "9",
    question: "Will the next US presidential approval rating exceed 50%?",
    category: "Politics",
    yesProbability: 42,
    noProbability: 58,
    volume: 3450000,
    traders: 28765,
    endDate: "2026-12-31",
    description: "Presidential approval rating prediction",
    resolutionCriteria: "The US presidential approval rating must exceed 50% on any major polling average before December 31, 2026.",
    trending: false,
    change: -3.4,
    probabilityHistory: [50, 48, 46, 45, 44, 43, 42, 42],
    intelligence: {
      sentiment: "Bearish",
      momentum: "-3.4% this month",
      movingPoints: [
        "Historical trends show low approval in midterm years",
        "More users backing the NO position",
        "Recent polling data reinforcing the downward trend",
      ],
    },
    recentActivity: [
      { user: "David Martinez", avatar: "DM", action: "Predicted NO", outcome: "NO", amount: 250, timestamp: "2 hours ago" },
      { user: "James Brown", avatar: "JB", action: "Predicted YES", outcome: "YES", amount: 100, timestamp: "8 hours ago" },
    ],
    comments: [
      { id: "c15", user: "David Martinez", avatar: "DM", content: "Historical trends suggest approval ratings rarely exceed 50% in midterm years.", timestamp: "2 hours ago", likes: 13 },
    ],
  },
  {
    id: "10",
    question: "Will Nintendo Switch 2 outsell PS5?",
    category: "Gaming",
    yesProbability: 55,
    noProbability: 45,
    volume: 1670000,
    traders: 11234,
    endDate: "2026-12-31",
    description: "Console sales comparison prediction",
    resolutionCriteria: "Nintendo Switch 2 must outsell PS5 in total units sold during 2026.",
    trending: true,
    change: 7.1,
    probabilityHistory: [40, 43, 46, 48, 50, 52, 54, 55],
    intelligence: {
      sentiment: "Bullish",
      momentum: "+7.1% this month",
      movingPoints: [
        "Pre-order numbers exceeding expectations",
        "Strong early reviews driving YES predictions",
        "Momentum building as launch approaches",
      ],
    },
    recentActivity: [
      { user: "Lisa Davis", avatar: "LD", action: "Predicted YES", outcome: "YES", amount: 175, timestamp: "5 hours ago" },
      { user: "Sarah Chen", avatar: "SC", action: "Predicted YES", outcome: "YES", amount: 130, timestamp: "9 hours ago" },
    ],
    comments: [
      { id: "c16", user: "Lisa Davis", avatar: "LD", content: "Switch 2 pre-orders are insane. Could outsell PS5 if momentum continues.", timestamp: "5 hours ago", likes: 20 },
    ],
  },
  {
    id: "11",
    question: "Will global GDP growth exceed 3% in 2026?",
    category: "Economy",
    yesProbability: 61,
    noProbability: 39,
    volume: 2890000,
    traders: 20345,
    endDate: "2026-12-31",
    description: "Global economic growth prediction",
    resolutionCriteria: "Global GDP growth must exceed 3% according to IMF or World Bank annual reports for 2026.",
    trending: false,
    change: 1.2,
    probabilityHistory: [50, 52, 54, 56, 58, 59, 60, 61],
    intelligence: {
      sentiment: "Bullish",
      momentum: "+1.2% this week",
      movingPoints: [
        "Emerging market growth data exceeds forecasts",
        "Global trade activity picking up pace",
        "Steady increase in YES predictions this quarter",
      ],
    },
    recentActivity: [
      { user: "Alex Thompson", avatar: "AT", action: "Predicted YES", outcome: "YES", amount: 300, timestamp: "4 hours ago" },
    ],
    comments: [
      { id: "c17", user: "Alex Thompson", avatar: "AT", content: "Emerging markets are driving growth. 3% is achievable.", timestamp: "4 hours ago", likes: 10 },
    ],
  },
  {
    id: "12",
    question: "Will Solana reach $300 this year?",
    category: "Crypto",
    yesProbability: 48,
    noProbability: 52,
    volume: 1450000,
    traders: 9876,
    endDate: "2026-12-31",
    description: "Solana price prediction for 2026",
    resolutionCriteria: "Solana must reach or exceed $300 USD on any major exchange before December 31, 2026.",
    trending: false,
    change: -4.1,
    probabilityHistory: [55, 53, 51, 50, 49, 48, 48, 48],
    intelligence: {
      sentiment: "Bearish",
      momentum: "-4.1% this month",
      movingPoints: [
        "Network reliability concerns resurfacing",
        "More users shifting to NO positions",
        "Competition from other chains affecting sentiment",
      ],
    },
    recentActivity: [
      { user: "Jennifer Garcia", avatar: "JG", action: "Predicted NO", outcome: "NO", amount: 120, timestamp: "6 hours ago" },
    ],
    comments: [
      { id: "c18", user: "Jennifer Garcia", avatar: "JG", content: "Solana's network outages make $300 a stretch target.", timestamp: "6 hours ago", likes: 8 },
    ],
  },
  {
    id: "13",
    question: "Will the next Avatar sequel gross over $2B worldwide?",
    category: "Entertainment",
    yesProbability: 62,
    noProbability: 38,
    volume: 1780000,
    traders: 13456,
    endDate: "2027-12-31",
    description: "Box office performance prediction for the next Avatar film",
    resolutionCriteria: "The next Avatar sequel must gross over $2 billion USD in worldwide box office revenue.",
    trending: false,
    change: 3.8,
    probabilityHistory: [48, 52, 55, 57, 59, 60, 61, 62],
    intelligence: {
      sentiment: "Bullish",
      momentum: "+3.8% this month",
      movingPoints: [
        "Avatar franchise has strong global fanbase",
        "Previous sequels performed well at the box office",
        "Studio marketing campaign ramping up",
      ],
    },
    recentActivity: [
      { user: "Lisa Davis", avatar: "LD", action: "Predicted YES", outcome: "YES", amount: 175, timestamp: "3 hours ago" },
      { user: "Sarah Chen", avatar: "SC", action: "Predicted YES", outcome: "YES", amount: 130, timestamp: "8 hours ago" },
    ],
    comments: [
      { id: "c19", user: "Lisa Davis", avatar: "LD", content: "Avatar always delivers on the big screen. The visual spectacle alone drives repeat viewings.", timestamp: "3 hours ago", likes: 14 },
      { id: "c20", user: "Mike Johnson", avatar: "MJ", content: "China box office alone could carry this to $2B if the market holds.", timestamp: "5 hours ago", likes: 10 },
    ],
  },
  {
    id: "14",
    question: "Will a streaming service surpass 300M subscribers by end of 2026?",
    category: "Entertainment",
    yesProbability: 44,
    noProbability: 56,
    volume: 1340000,
    traders: 9876,
    endDate: "2026-12-31",
    description: "Streaming platform subscriber growth prediction",
    resolutionCriteria: "Any single streaming platform must report over 300 million paid subscribers before December 31, 2026.",
    trending: false,
    change: -1.5,
    probabilityHistory: [50, 48, 47, 46, 45, 44, 44, 44],
    intelligence: {
      sentiment: "Bearish",
      momentum: "-1.5% this month",
      movingPoints: [
        "Market saturation slowing subscriber growth",
        "Content spending cuts at major platforms",
        "Competition fragmenting the subscriber base",
      ],
    },
    recentActivity: [
      { user: "David Martinez", avatar: "DM", action: "Predicted NO", outcome: "NO", amount: 200, timestamp: "4 hours ago" },
    ],
    comments: [
      { id: "c21", user: "David Martinez", avatar: "DM", content: "No single platform is on track for 300M. The market is too fragmented.", timestamp: "4 hours ago", likes: 9 },
    ],
  },
  {
    id: "15",
    question: "Will Apple release a mixed reality headset under $1,000?",
    category: "Tech",
    yesProbability: 38,
    noProbability: 62,
    volume: 2100000,
    traders: 16789,
    endDate: "2026-12-31",
    description: "Apple mixed reality product pricing prediction",
    resolutionCriteria: "Apple must release a mixed reality or AR/VR headset priced under $1,000 USD before December 31, 2026.",
    trending: false,
    change: -2.1,
    probabilityHistory: [45, 43, 42, 40, 39, 38, 38, 38],
    intelligence: {
      sentiment: "Bearish",
      momentum: "-2.1% this month",
      movingPoints: [
        "Supply chain reports suggest premium pricing strategy",
        "Component costs remain high for AR displays",
        "Apple prioritizing margins over volume",
      ],
    },
    recentActivity: [
      { user: "Alex Thompson", avatar: "AT", action: "Predicted NO", outcome: "NO", amount: 250, timestamp: "2 hours ago" },
      { user: "Jennifer Garcia", avatar: "JG", action: "Predicted NO", outcome: "NO", amount: 180, timestamp: "6 hours ago" },
    ],
    comments: [
      { id: "c22", user: "Alex Thompson", avatar: "AT", content: "Apple won't undercut their own Vision Pro positioning. A sub-$1K headset is unlikely.", timestamp: "2 hours ago", likes: 16 },
      { id: "c23", user: "James Brown", avatar: "JB", content: "The component costs alone make this nearly impossible at that price point.", timestamp: "5 hours ago", likes: 11 },
    ],
  },
  {
    id: "16",
    question: "Will an AI coding tool pass the Turing test for production code?",
    category: "Tech",
    yesProbability: 52,
    noProbability: 48,
    volume: 2670000,
    traders: 21345,
    endDate: "2027-06-30",
    description: "AI coding capability prediction",
    resolutionCriteria: "An AI tool must produce production-quality code that passes blind evaluation by expert developers as human-written for 3 consecutive months.",
    trending: true,
    change: 6.3,
    probabilityHistory: [30, 35, 38, 42, 45, 48, 50, 52],
    intelligence: {
      sentiment: "Bullish",
      momentum: "+6.3% this month",
      movingPoints: [
        "AI coding assistants improving rapidly",
        "Major tech companies investing heavily in AI development tools",
        "Open-source models closing the gap with proprietary solutions",
      ],
    },
    recentActivity: [
      { user: "Sarah Chen", avatar: "SC", action: "Predicted YES", outcome: "YES", amount: 400, timestamp: "1 hour ago" },
      { user: "Emma Wilson", avatar: "EW", action: "Predicted YES", outcome: "YES", amount: 250, timestamp: "4 hours ago" },
      { user: "Mike Johnson", avatar: "MJ", action: "Predicted NO", outcome: "NO", amount: 150, timestamp: "7 hours ago" },
    ],
    comments: [
      { id: "c24", user: "Sarah Chen", avatar: "SC", content: "The pace of improvement in AI coding tools is remarkable. This feels inevitable.", timestamp: "1 hour ago", likes: 22 },
      { id: "c25", user: "Emma Wilson", avatar: "EW", content: "Current tools are good for boilerplate but struggle with complex architecture. Still a ways to go.", timestamp: "3 hours ago", likes: 15 },
    ],
  },
];

export const categories = [
  "All",
  "Gaming",
  "Crypto",
  "Politics",
  "Sports",
  "Economy",
  "Entertainment",
  "Tech",
];

export const formatVolume = (volume: number): string => {
  if (volume >= 1000000) {
    return `$${(volume / 1000000).toFixed(1)}M`;
  }
  if (volume >= 1000) {
    return `$${(volume / 1000).toFixed(0)}K`;
  }
  return `$${volume}`;
};

export const formatTraders = (traders: number): string => {
  if (traders >= 1000) {
    return `${(traders / 1000).toFixed(1)}K`;
  }
  return traders.toString();
};

export const getMarketById = (id: string): Market | undefined => {
  return markets.find((m) => m.id === id);
};
