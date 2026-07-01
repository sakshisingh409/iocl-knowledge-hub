import { useAuth } from "../context/AuthContext";
import PageHeader from "../components/ui/PageHeader";
import PublicationCard from "../components/ui/PublicationCard";

export default function BookmarksPage() {
  const { bookmarkedPublications, toggleBookmark, markAsViewed, globalSearch } = useAuth();

  const filtered = globalSearch
    ? bookmarkedPublications.filter(
        (p) =>
          p.title.toLowerCase().includes(globalSearch.toLowerCase()) ||
          p.description.toLowerCase().includes(globalSearch.toLowerCase()),
      )
    : bookmarkedPublications;

  return (
    <div>
      <PageHeader
        eyebrow="MY LIBRARY"
        title="Bookmarks"
        subtitle={`${filtered.length} saved document${filtered.length !== 1 ? "s" : ""}`}
      />

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-200 bg-white py-16 text-center">
          <p className="text-slate-400">No bookmarks yet.</p>
          <p className="mt-1 text-sm text-slate-400">
            Click the bookmark icon on any magazine or newspaper to save it here.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((item) => (
            <PublicationCard
              key={item.id}
              item={item}
              variant="horizontal"
              onBookmark={toggleBookmark}
              onOpen={markAsViewed}
            />
          ))}
        </div>
      )}
    </div>
  );
}
