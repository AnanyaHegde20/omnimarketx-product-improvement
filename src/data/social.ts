export interface SocialPost {
  id: string;
  user: {
    name: string;
    avatar: string;
  };
  content: string;
  marketId?: string;
  likes: number;
  comments: number;
  timestamp: string;
  liked: boolean;
}

export interface TrendingTopic {
  id: string;
  tag: string;
  posts: number;
  category: string;
}

export const socialPosts: SocialPost[] = [
  {
    id: "1",
    user: { name: "Alex Thompson", avatar: "AT" },
    content:
      "Bitcoin has been showing strong momentum lately. I predict it will hit $150K by year end. The institutional adoption is massive this year.",
    marketId: "1",
    likes: 234,
    comments: 45,
    timestamp: "2 hours ago",
    liked: false,
  },
  {
    id: "2",
    user: { name: "Sarah Chen", avatar: "SC" },
    content:
      "GTA VI delay seems unlikely at this point. Rockstar has been consistent with their messaging. Loading up on YES shares!",
    marketId: "3",
    likes: 189,
    comments: 32,
    timestamp: "4 hours ago",
    liked: true,
  },
  {
    id: "3",
    user: { name: "Mike Johnson", avatar: "MJ" },
    content:
      "The Fed rate cut prediction is interesting. With inflation cooling, I think Q4 is very likely. What do you all think?",
    marketId: "6",
    likes: 156,
    comments: 28,
    timestamp: "6 hours ago",
    liked: false,
  },
  {
    id: "4",
    user: { name: "Emma Wilson", avatar: "EW" },
    content:
      "India's cricket team looks dominant this season. The tournament win prediction is looking good!",
    marketId: "2",
    likes: 178,
    comments: 41,
    timestamp: "8 hours ago",
    liked: true,
  },
  {
    id: "5",
    user: { name: "James Brown", avatar: "JB" },
    content:
      "AI adoption is already exceeding expectations. Enterprise spending is through the roof. Easy YES on this one.",
    marketId: "4",
    likes: 212,
    comments: 37,
    timestamp: "10 hours ago",
    liked: false,
  },
  {
    id: "6",
    user: { name: "Lisa Davis", avatar: "LD" },
    content:
      "Switch 2 pre-orders are insane. I think it could outsell PS5 if Nintendo keeps this momentum going.",
    marketId: "10",
    likes: 145,
    comments: 23,
    timestamp: "12 hours ago",
    liked: false,
  },
];

export const trendingTopics: TrendingTopic[] = [
  { id: "1", tag: "Bitcoin", posts: 12453, category: "Crypto" },
  { id: "2", tag: "Cricket", posts: 8976, category: "Sports" },
  { id: "3", tag: "AI", posts: 15678, category: "Economy" },
  { id: "4", tag: "Gaming", posts: 9876, category: "Gaming" },
  { id: "5", tag: "Politics", posts: 11234, category: "Politics" },
  { id: "6", tag: "Ethereum", posts: 7654, category: "Crypto" },
  { id: "7", tag: "FedRates", posts: 6789, category: "Economy" },
  { id: "8", tag: "ChampionsLeague", posts: 5432, category: "Sports" },
];
