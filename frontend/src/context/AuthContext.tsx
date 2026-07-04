import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { supabase } from "../services/supabase";
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
  const [user, setUser] = useState<any>(null);
  const [publications, setPublications] = useState<Publication[]>(ALL_PUBLICATIONS);
  const [recentlyViewedIds, setRecentlyViewedIds] = useState<string[]>([
    "news-2",
    "mag-1",
    "mag-2",
    "mag-4",
  ]);
  const [globalSearch, setGlobalSearch] = useState("");

 const fetchUserProfile = async (authUser: any) => {
  if (!authUser) {
    setUser(null);
    return;
  }

  const { data: profile, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", authUser.id)
    .single();

  console.log("AUTH USER:", authUser);
  console.log("PROFILE:", profile);
  console.log("PROFILE ERROR:", error);

  setUser({
    ...authUser,
    ...profile,
  });
};

 useEffect(() => {
  supabase.auth.getSession().then(({ data }) => {
    console.log("Initial Session:", data.session);
    if (data.session?.user) {
  fetchUserProfile(data.session.user);
} else {
  setUser(null);
}
  });

  const {
    data: { subscription },
  } = supabase.auth.onAuthStateChange((_event, session) => {
    console.log("Auth Changed:", session);
    if (session?.user) {
  fetchUserProfile(session.user);
} else {
  setUser(null);
}
  });

  return () => subscription.unsubscribe();
}, []);

  const login = useCallback(() => {
  return null;
}, []);

  const logout = useCallback(async () => {
  await supabase.auth.signOut();
  setUser(null);
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
