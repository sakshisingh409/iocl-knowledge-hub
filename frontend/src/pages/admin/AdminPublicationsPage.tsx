import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import {
  Search,
  Plus,
  Trash2,
  BookOpen,
  Newspaper,
  Tag,
  X,
  FileText,
  AlertCircle
} from "lucide-react";
import type { Publication } from "../../types";

const CATEGORIES = [
  "CORPORATE MAGAZINE",
  "TECHNICAL MAGAZINE",
  "HR NEWSLETTER",
  "SAFETY BULLETIN",
  "SUSTAINABILITY",
  "OPERATIONS",
  "INDUSTRY BRIEFING",
  "SECTOR NEWS",
  "REFINERY OPERATIONS",
  "MARKET ANALYSIS"
];

export default function AdminPublicationsPage() {
  const { publications, addPublication, deletePublication } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<"all" | "magazine" | "newspaper">("all");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form states for Upload Publication
  const [title, setTitle] = useState("");
  const [type, setType] = useState<"magazine" | "newspaper">("magazine");
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [date, setDate] = useState("");
  const [pages, setPages] = useState(32);
  const [size, setSize] = useState("5.0 MB");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("https://images.unsplash.com/photo-1581092918056-0c4c3acd3782?w=600");
  const [tagsInput, setTagsInput] = useState("");

  // Filtered publications list
  const filteredPublications = publications.filter((pub) => {
    const matchesSearch =
      pub.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pub.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pub.tags.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesType = filterType === "all" || pub.type === filterType;
    return matchesSearch && matchesType;
  });

  const handleDelete = (id: string, title: string) => {
    if (confirm(`Are you sure you want to delete the publication "${title}"?`)) {
      deletePublication(id);
    }
  };

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !date.trim() || !description.trim()) {
      alert("Please fill in all required fields.");
      return;
    }

    // Process tags comma separated
    const tags = tagsInput
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    const newPub: Publication = {
      id: `${type === "magazine" ? "mag" : "news"}-${Date.now()}`,
      title,
      type,
      category,
      date,
      pages: Number(pages),
      size,
      description,
      image: image || "https://images.unsplash.com/photo-1581092918056-0c4c3acd3782?w=600",
      tags: tags.length ? tags : ["Internal", type.toUpperCase()],
      isNew: true,
      bookmarked: false,
    };

    addPublication(newPub);
    setIsModalOpen(false);

    // Reset Form
    setTitle("");
    setType("magazine");
    setCategory(CATEGORIES[0]);
    setDate("");
    setPages(32);
    setSize("5.0 MB");
    setDescription("");
    setImage("https://images.unsplash.com/photo-1581092918056-0c4c3acd3782?w=600");
    setTagsInput("");

    alert(`Publication "${title}" successfully registered.`);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <p className="text-[11px] font-bold tracking-widest text-iocl-orange uppercase">
            CATALOG CONTROL
          </p>
          <h1 className="mt-1 text-3xl font-extrabold text-iocl-navy">Publications Directory</h1>
          <p className="mt-1 text-sm text-slate-500 font-medium">
            Manage repository documents, view tags, upload assets, and audit entries.
          </p>
        </div>

        {/* Action Button */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 rounded-xl bg-iocl-orange hover:bg-orange-600 px-5 py-3 text-sm font-bold text-white shadow-md shadow-iocl-orange/20 transition-all hover:scale-[1.02] cursor-pointer self-start sm:self-center"
        >
          <Plus className="h-4.5 w-4.5" />
          Upload Publication
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row gap-4">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by title, category, or tags..."
            className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm text-slate-700 outline-none transition focus:border-iocl-orange focus:ring-2 focus:ring-iocl-orange/15"
          />
        </div>

        {/* Type Selector */}
        <div className="flex bg-slate-100 rounded-xl p-1 shrink-0">
          <button
            onClick={() => setFilterType("all")}
            className={`rounded-lg px-4 py-2 text-xs font-bold transition-all cursor-pointer ${
              filterType === "all" ? "bg-white text-iocl-navy shadow-sm" : "text-slate-500 hover:text-slate-700"
            }`}
          >
            All Documents
          </button>
          <button
            onClick={() => setFilterType("magazine")}
            className={`rounded-lg px-4 py-2 text-xs font-bold transition-all cursor-pointer ${
              filterType === "magazine" ? "bg-white text-iocl-navy shadow-sm" : "text-slate-500 hover:text-slate-700"
            }`}
          >
            Magazines
          </button>
          <button
            onClick={() => setFilterType("newspaper")}
            className={`rounded-lg px-4 py-2 text-xs font-bold transition-all cursor-pointer ${
              filterType === "newspaper" ? "bg-white text-iocl-navy shadow-sm" : "text-slate-500 hover:text-slate-700"
            }`}
          >
            Newspapers
          </button>
        </div>
      </div>

      {/* Publications Table */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-150">
                <th className="px-6 py-4">Title & Details</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Edition Date</th>
                <th className="px-6 py-4">Attributes</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {filteredPublications.map((pub) => (
                <tr key={pub.id} className="hover:bg-slate-50/50 transition">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={pub.image}
                        alt={pub.title}
                        className="h-10 w-14 shrink-0 rounded bg-slate-100 object-cover"
                      />
                      <div className="min-w-0">
                        <p className="font-bold text-slate-800 truncate max-w-xs">{pub.title}</p>
                        <p className="text-[11px] text-slate-400 truncate max-w-xs">{pub.description}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase ${
                      pub.type === "magazine" ? "bg-orange-50 text-orange-700 border border-orange-100" : "bg-blue-50 text-blue-700 border border-blue-100"
                    }`}>
                      {pub.type === "magazine" ? <BookOpen className="h-3 w-3" /> : <Newspaper className="h-3 w-3" />}
                      {pub.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-semibold text-slate-600 text-xs">
                    {pub.category}
                  </td>
                  <td className="px-6 py-4 text-slate-500 font-medium text-xs">
                    {pub.date}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1 text-[11px]">
                      <span className="text-slate-400 font-medium">Pages: <strong className="text-slate-600 font-bold">{pub.pages}</strong></span>
                      <span className="text-slate-400 font-medium">Size: <strong className="text-slate-600 font-bold">{pub.size}</strong></span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleDelete(pub.id, pub.title)}
                        className="rounded-lg p-2 text-slate-400 hover:bg-red-50 hover:text-red-600 transition"
                        title="Delete publication"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredPublications.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-400">
                    No publications registered in the directory.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Upload Publication Modal Dialog (Upload Publications UI) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-xl rounded-2xl bg-white shadow-2xl overflow-hidden border border-slate-200 flex flex-col max-h-[90vh]">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50 px-6 py-4">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-iocl-orange" />
                <h3 className="font-bold text-iocl-navy">Upload New Publication</h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Body / Form */}
            <form onSubmit={handleUploadSubmit} className="flex-1 overflow-y-auto p-6 space-y-4">
              
              {/* Row: Title */}
              <div>
                <label className="mb-1.5 block text-xs font-bold text-slate-500 uppercase tracking-wide">
                  Publication Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Pipeline Safety Digest"
                  className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none transition focus:border-iocl-orange focus:ring-1 focus:ring-iocl-orange/20"
                />
              </div>

              {/* Row: Type & Category */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1.5 block text-xs font-bold text-slate-500 uppercase tracking-wide">
                    Document Type
                  </label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value as any)}
                    className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none transition focus:border-iocl-orange focus:ring-1 focus:ring-iocl-orange/20"
                  >
                    <option value="magazine">Magazine</option>
                    <option value="newspaper">Newspaper Article</option>
                  </select>
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-bold text-slate-500 uppercase tracking-wide">
                    Category Tag
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none transition focus:border-iocl-orange focus:ring-1 focus:ring-iocl-orange/20"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Row: Date & Pages & Size */}
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="mb-1.5 block text-xs font-bold text-slate-500 uppercase tracking-wide">
                    Edition Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    placeholder="Jan 2026 or 15 Jan 2026"
                    className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none transition focus:border-iocl-orange focus:ring-1 focus:ring-iocl-orange/20"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-bold text-slate-500 uppercase tracking-wide">
                    Page Count
                  </label>
                  <input
                    type="number"
                    value={pages}
                    onChange={(e) => setPages(Number(e.target.value))}
                    min={1}
                    className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none transition focus:border-iocl-orange focus:ring-1 focus:ring-iocl-orange/20"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-bold text-slate-500 uppercase tracking-wide">
                    File Size (Est.)
                  </label>
                  <input
                    type="text"
                    value={size}
                    onChange={(e) => setSize(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none transition focus:border-iocl-orange focus:ring-1 focus:ring-iocl-orange/20"
                  />
                </div>
              </div>

              {/* Row: Cover image URL */}
              <div>
                <label className="mb-1.5 block text-xs font-bold text-slate-500 uppercase tracking-wide">
                  Cover Photo Image URL
                </label>
                <input
                  type="url"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  placeholder="https://images.unsplash.com/photo-..."
                  className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none transition focus:border-iocl-orange focus:ring-1 focus:ring-iocl-orange/20"
                />
              </div>

              {/* Row: Description */}
              <div>
                <label className="mb-1.5 block text-xs font-bold text-slate-500 uppercase tracking-wide">
                  Brief Summary Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Provide a detailed summary of this publication's content and relevance..."
                  className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none transition focus:border-iocl-orange focus:ring-1 focus:ring-iocl-orange/20 resize-none"
                />
              </div>

              {/* Row: Tags */}
              <div>
                <label className="mb-1.5 block text-xs font-bold text-slate-500 uppercase tracking-wide flex items-center gap-1">
                  <Tag className="h-3.5 w-3.5" />
                  Meta Tags (Comma Separated)
                </label>
                <input
                  type="text"
                  value={tagsInput}
                  onChange={(e) => setTagsInput(e.target.value)}
                  placeholder="Refinery, Safety, Audit, Operations"
                  className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm outline-none transition focus:border-iocl-orange focus:ring-1 focus:ring-iocl-orange/20"
                />
              </div>

              {/* Compliance advisory */}
              <div className="flex items-start gap-2 rounded-xl bg-amber-50 border border-amber-200 p-3 text-xs text-amber-800">
                <AlertCircle className="h-4 w-4 mt-0.5 text-amber-600 shrink-0" />
                <span>
                  <strong>Compliance Directive:</strong> By uploading, you certify that this document contains no restricted intellectual property and complies with IOCL IT Information Leakage Prevention guidelines.
                </span>
              </div>

              {/* Modal Actions */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-xl border border-slate-200 bg-white hover:bg-slate-50 px-4 py-2.5 text-xs font-bold text-slate-600 transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-iocl-orange hover:bg-orange-600 px-5 py-2.5 text-xs font-bold text-white shadow-md shadow-iocl-orange/15 transition-all hover:scale-[1.02] cursor-pointer"
                >
                  Publish Asset
                </button>
              </div>

            </form>

          </div>
        </div>
      )}
    </div>
  );
}
