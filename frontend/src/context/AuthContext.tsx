import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { ALL_PUBLICATIONS, DEMO_USERS } from "../data/mockData";
import type { Publication, User } from "../types";

interface AuthContextValue {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => string | null;
  logout: () => void;
  publications: Publication[];
  toggleBookmark: (id: string) => void;
  bookmarkedPublications: Publication[];
  recentlyViewed: Publication[];
  markAsViewed: (id: string) => void;
  globalSearch: string;
  setGlobalSearch: (value: string) => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem("iocl_user");
    return stored ? (JSON.parse(stored) as User) : null;
  });
  const [publications, setPublications] = useState<Publication[]>(ALL_PUBLICATIONS);
  const [recentlyViewedIds, setRecentlyViewedIds] = useState<string[]>([
    "news-2",
    "mag-1",
    "mag-2",
    "mag-4",
  ]);
  const [globalSearch, setGlobalSearch] = useState("");

  const login = useCallback((email: string, password: string) => {
    const account = DEMO_USERS[email.toLowerCase().trim()];
    if (!account || account.password !== password) {
      return "Invalid email or password. Use demo credentials shown below.";
    }
    setUser(account.user);
    localStorage.setItem("iocl_user", JSON.stringify(account.user));
    return null;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem("iocl_user");
  }, []);

  const toggleBookmark = useCallback((id: string) => {
    setPublications((prev) =>
      prev.map((p) => (p.id === id ? { ...p, bookmarked: !p.bookmarked } : p)),
    );
  }, []);

  const markAsViewed = useCallback((id: string) => {
    setRecentlyViewedIds((prev) => [id, ...prev.filter((x) => x !== id)].slice(0, 8));
  }, []);

  const bookmarkedPublications = useMemo(
    () => publications.filter((p) => p.bookmarked),
    [publications],
  );

  const recentlyViewed = useMemo(
    () =>
      recentlyViewedIds
        .map((id) => publications.find((p) => p.id === id))
        .filter(Boolean) as Publication[],
    [recentlyViewedIds, publications],
  );

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: !!user,
      login,
      logout,
      publications,
      toggleBookmark,
      bookmarkedPublications,
      recentlyViewed,
      markAsViewed,
      globalSearch,
      setGlobalSearch,
    }),
    [
      user,
      login,
      logout,
      publications,
      toggleBookmark,
      bookmarkedPublications,
      recentlyViewed,
      markAsViewed,
      globalSearch,
    ],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
