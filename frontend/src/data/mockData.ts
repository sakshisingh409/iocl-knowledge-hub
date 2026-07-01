import type { Publication, TrendingTopic, User } from "../types";

export const DEMO_USERS: Record<string, { password: string; user: User }> = {
  "employee@iocl.in": {
    password: "iocl@123",
    user: {
      name: "Rajesh Kumar",
      email: "employee@iocl.in",
      employeeId: "IOCL-48721",
      department: "Refinery & Pipelines",
      location: "Panipat",
      role: "employee",
    },
  },
  "admin@iocl.in": {
    password: "admin@123",
    user: {
      name: "Admin User",
      email: "admin@iocl.in",
      employeeId: "IOCL-10001",
      department: "Corporate IT",
      location: "New Delhi",
      role: "admin",
    },
  },
};

export const MAGAZINES: Publication[] = [
  {
    id: "mag-1",
    title: "IndianOil News",
    type: "magazine",
    category: "CORPORATE MAGAZINE",
    date: "January 2025",
    pages: 48,
    size: "8.2 MB",
    description:
      "Coverage of Q3 results, new green hydrogen project at Panipat, and employee spotlight on field engineers.",
    image:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=400&fit=crop",
    tags: ["Refinery", "Innovation", "Quarterly Results"],
    isNew: true,
    bookmarked: false,
  },
  {
    id: "mag-2",
    title: "Urja",
    type: "magazine",
    category: "TECHNICAL MAGAZINE",
    date: "December 2024",
    pages: 36,
    size: "6.4 MB",
    description:
      "Technical deep-dives on refinery optimization, pipeline integrity, and process safety innovations.",
    image:
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&h=400&fit=crop",
    tags: ["Technical", "Safety", "Process"],
    bookmarked: false,
  },
  {
    id: "mag-3",
    title: "Sampark",
    type: "magazine",
    category: "HR NEWSLETTER",
    date: "November 2024",
    pages: 24,
    size: "4.1 MB",
    description:
      "Employee engagement stories, HR policy updates, and wellness programme highlights across IOCL.",
    image:
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600&h=400&fit=crop",
    tags: ["HR", "Wellness", "Engagement"],
    bookmarked: false,
  },
  {
    id: "mag-4",
    title: "Safety First",
    type: "magazine",
    category: "SAFETY BULLETIN",
    date: "Q4 2024",
    pages: 32,
    size: "5.8 MB",
    description:
      "Quarterly safety bulletin covering incident learnings, best practices, and compliance updates.",
    image:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=400&fit=crop",
    tags: ["Safety", "Compliance"],
    isNew: true,
    bookmarked: false,
  },
  {
    id: "mag-5",
    title: "Green Horizons",
    type: "magazine",
    category: "SUSTAINABILITY",
    date: "October 2024",
    pages: 28,
    size: "5.2 MB",
    description:
      "IOCL's sustainability initiatives, biofuel projects, and carbon reduction roadmap.",
    image:
      "https://images.unsplash.com/photo-1473341304170-971dccb5ac71?w=600&h=400&fit=crop",
    tags: ["Sustainability", "Biofuels"],
    bookmarked: false,
  },
  {
    id: "mag-6",
    title: "Pipeline Pulse",
    type: "magazine",
    category: "OPERATIONS",
    date: "September 2024",
    pages: 20,
    size: "3.9 MB",
    description:
      "Pipeline operations update, maintenance schedules, and field engineering highlights.",
    image:
      "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=600&h=400&fit=crop",
    tags: ["Pipeline", "Operations"],
    bookmarked: false,
  },
];

export const NEWSPAPERS: Publication[] = [
  {
    id: "news-1",
    title: "Daily Industry Brief",
    type: "newspaper",
    category: "INDUSTRY BRIEFING",
    date: "15 Jan 2025",
    pages: 8,
    size: "2.1 MB",
    description:
      "Morning briefing on crude prices, refinery throughput, and sector regulatory updates.",
    image:
      "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=600&h=400&fit=crop",
    tags: ["Industry", "Crude"],
    isNew: true,
    bookmarked: false,
  },
  {
    id: "news-2",
    title: "Energy Sector Today",
    type: "newspaper",
    category: "SECTOR NEWS",
    date: "12 Jan 2025",
    pages: 12,
    size: "3.4 MB",
    description:
      "Recent energy policy notifications from MoPNG and impact analysis on PSU oil companies.",
    image:
      "https://images.unsplash.com/photo-1586339949916-3e9457bef6d3?w=600&h=400&fit=crop",
    tags: ["Policy", "Energy"],
    isNew: true,
    bookmarked: true,
  },
  {
    id: "news-3",
    title: "Daily Industry Brief",
    type: "newspaper",
    category: "INDUSTRY BRIEFING",
    date: "08 Jan 2025",
    pages: 8,
    size: "2.0 MB",
    description:
      "Renewable energy targets, wind power sector updates, and green transition news.",
    image:
      "https://images.unsplash.com/photo-1466611653911-950815379187?w=600&h=400&fit=crop",
    tags: ["Renewables", "Wind"],
    bookmarked: false,
  },
  {
    id: "news-4",
    title: "Refinery Roundup",
    type: "newspaper",
    category: "REFINERY OPERATIONS",
    date: "30 Dec 2024",
    pages: 10,
    size: "2.8 MB",
    description:
      "Weekly roundup of refinery performance metrics, maintenance windows, and capacity updates.",
    image:
      "https://images.unsplash.com/photo-1581092918056-0c4c3acd3782?w=600&h=400&fit=crop",
    tags: ["Refinery", "Operations"],
    bookmarked: false,
  },
  {
    id: "news-5",
    title: "Market Watch",
    type: "newspaper",
    category: "MARKET ANALYSIS",
    date: "28 Dec 2024",
    pages: 6,
    size: "1.8 MB",
    description:
      "Daily market analysis covering Brent crude, product spreads, and exchange rates.",
    image:
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&h=400&fit=crop",
    tags: ["Markets", "Crude"],
    bookmarked: false,
  },
  {
    id: "news-6",
    title: "PSU Digest",
    type: "newspaper",
    category: "CORPORATE NEWS",
    date: "25 Dec 2024",
    pages: 14,
    size: "3.6 MB",
    description:
      "PSU oil sector news digest covering IOCL, BPCL, HPCL quarterly performance summaries.",
    image:
      "https://images.unsplash.com/photo-1554224311-beee415c201f?w=600&h=400&fit=crop",
    tags: ["PSU", "Corporate"],
    bookmarked: false,
  },
];

export const TRENDING_TOPICS: TrendingTopic[] = [
  { rank: 1, label: "Green Hydrogen" },
  { rank: 2, label: "Refinery" },
  { rank: 3, label: "Sustainability" },
  { rank: 4, label: "Biofuels" },
  { rank: 5, label: "Safety" },
  { rank: 6, label: "HR Policies" },
];

export const CHAT_SUGGESTIONS = [
  "Summarize the latest IndianOil News edition",
  "Find magazines about green hydrogen",
  "What HR policies were updated recently?",
  "Show me safety bulletins from Q4 2024",
];

export const MOCK_CHAT_RESPONSES: Record<string, string> = {
  default:
    "I searched the IOCL Knowledge Hub and found relevant publications. This is a placeholder response — your backend team can connect the real AI chatbot here.",
  [CHAT_SUGGESTIONS[0].toLowerCase()]:
    "The January 2025 IndianOil News edition covers Q3 financial results, the new green hydrogen project at Panipat refinery, and an employee spotlight on field engineers. Key themes include innovation, refinery operations, and quarterly performance.",
  [CHAT_SUGGESTIONS[1].toLowerCase()]:
    "I found 2 relevant publications: Green Horizons (October 2024) covering IOCL's sustainability initiatives, and IndianOil News (January 2025) featuring the Panipat green hydrogen project.",
  [CHAT_SUGGESTIONS[2].toLowerCase()]:
    "The latest HR policy updates are covered in Sampark (November 2024), including revised leave policies, wellness programme changes, and new employee engagement initiatives.",
  [CHAT_SUGGESTIONS[3].toLowerCase()]:
    "Safety First (Q4 2024) is the primary safety bulletin covering incident learnings, best practices, and compliance updates across all IOCL refineries.",
};

export const ALL_PUBLICATIONS = [...MAGAZINES, ...NEWSPAPERS];

export const DASHBOARD_STATS = {
  totalDocuments: 12,
  magazines: 6,
  newspapers: 6,
  downloads: 3241,
  newPublications: 4,
};
