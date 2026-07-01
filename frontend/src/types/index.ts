export interface User {
  name: string;
  email: string;
  employeeId: string;
  department: string;
  location: string;
  role: "employee" | "admin";
}

export interface Publication {
  id: string;
  title: string;
  type: "magazine" | "newspaper";
  category: string;
  date: string;
  pages: number;
  size: string;
  description: string;
  image: string;
  tags: string[];
  isNew?: boolean;
  bookmarked?: boolean;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export interface TrendingTopic {
  rank: number;
  label: string;
}
