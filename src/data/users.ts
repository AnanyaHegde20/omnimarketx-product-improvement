export interface User {
  id: string;
  name: string;
  avatar: string;
  profit: number;
  winRate: number;
  predictions: number;
  rank: number;
  forecastScore: number;
  roi: number;
  consistency: "High" | "Medium" | "Low";
  specialties: string[];
}

export const users: User[] = [
  {
    id: "1",
    name: "Alex Thompson",
    avatar: "AT",
    profit: 12450,
    winRate: 73,
    predictions: 234,
    rank: 1,
    forecastScore: 92,
    roi: 24.8,
    consistency: "High",
    specialties: ["Crypto", "Economy"],
  },
  {
    id: "2",
    name: "Sarah Chen",
    avatar: "SC",
    profit: 9870,
    winRate: 68,
    predictions: 189,
    rank: 2,
    forecastScore: 87,
    roi: 18.4,
    consistency: "High",
    specialties: ["Gaming", "Crypto"],
  },
  {
    id: "3",
    name: "Mike Johnson",
    avatar: "MJ",
    profit: 8230,
    winRate: 65,
    predictions: 156,
    rank: 3,
    forecastScore: 81,
    roi: 15.2,
    consistency: "Medium",
    specialties: ["Sports", "Economy"],
  },
  {
    id: "4",
    name: "Emma Wilson",
    avatar: "EW",
    profit: 7650,
    winRate: 71,
    predictions: 198,
    rank: 4,
    forecastScore: 85,
    roi: 12.6,
    consistency: "High",
    specialties: ["Sports", "Politics"],
  },
  {
    id: "5",
    name: "James Brown",
    avatar: "JB",
    profit: 6420,
    winRate: 62,
    predictions: 145,
    rank: 5,
    forecastScore: 74,
    roi: 10.3,
    consistency: "Medium",
    specialties: ["Economy", "Politics"],
  },
  {
    id: "6",
    name: "Lisa Davis",
    avatar: "LD",
    profit: 5890,
    winRate: 67,
    predictions: 167,
    rank: 6,
    forecastScore: 78,
    roi: 9.1,
    consistency: "Medium",
    specialties: ["Gaming", "Sports"],
  },
  {
    id: "7",
    name: "David Martinez",
    avatar: "DM",
    profit: 4560,
    winRate: 59,
    predictions: 123,
    rank: 7,
    forecastScore: 68,
    roi: 6.8,
    consistency: "Low",
    specialties: ["Politics", "Crypto"],
  },
  {
    id: "8",
    name: "Jennifer Garcia",
    avatar: "JG",
    profit: 3890,
    winRate: 64,
    predictions: 134,
    rank: 8,
    forecastScore: 72,
    roi: 5.4,
    consistency: "Medium",
    specialties: ["Crypto", "Gaming"],
  },
];

export const currentUser = {
  id: "current",
  name: "John Doe",
  avatar: "JD",
  portfolioValue: 15230,
  totalProfit: 2340,
  activePredictions: 12,
  winRate: 67,
  balance: 5000,
};
