import { useState } from "react";
import { supabase } from "../../services/supabase";

export default function AdminUploadMagazinePage() {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [pdf, setPdf] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
  if (!title || !description || !category || !thumbnail || !pdf) {
    alert("Please fill all fields.");
    return;
  }

  setLoading(true);

  try {
    const thumbnailName = `thumbnails/${Date.now()}-${thumbnail.name}`;

const { error: thumbnailError } = await supabase.storage
  .from("magazines")
  .upload(thumbnailName, thumbnail);

if (thumbnailError) throw thumbnailError;

const { data: thumbnailUrl } = supabase.storage
  .from("magazines")
  .getPublicUrl(thumbnailName);

const pdfName = `pdfs/${Date.now()}-${pdf.name}`;

const { error: pdfError } = await supabase.storage
  .from("magazines")
  .upload(pdfName, pdf);

if (pdfError) throw pdfError;

const { data: pdfUrl } = supabase.storage
  .from("magazines")
  .getPublicUrl(pdfName);

  const { data: sessionData } = await supabase.auth.getUser();

const { error: insertError } = await supabase
  .from("publications")
  .insert({
    title,
    description,
    category,
    type: "magazine",
    thumbnail: thumbnailUrl.publicUrl,
    pdf_url: pdfUrl.publicUrl,
    uploaded_by: sessionData.user?.id,
  });

if (insertError) throw insertError;

alert("Magazine uploaded successfully!");

  } catch (error: any) {
  console.error("UPLOAD ERROR:", error);
  alert(error.message || JSON.stringify(error));
} finally {
    setLoading(false);
  }
};

  return (
    <div className="max-w-3xl rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">

  <div className="mb-6">
    <h2 className="text-2xl font-bold text-slate-800">
      Upload New Magazine
    </h2>

    <p className="mt-2 text-sm text-slate-500">
      Upload a new magazine for employees.
    </p>
  </div>

  <div className="space-y-5">

    {/* Title */}
    <div>
      <label className="mb-2 block text-sm font-semibold">
        Title
      </label>

      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Magazine title"
        className="w-full rounded-xl border border-slate-300 px-4 py-3"
      />
    </div>

    {/* Description */}

    <div>

      <label className="mb-2 block text-sm font-semibold">
        Description
      </label>

      <textarea
        rows={4}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Write description..."
        className="w-full rounded-xl border border-slate-300 px-4 py-3"
      />

    </div>

    {/* Category */}

    <div>

      <label className="mb-2 block text-sm font-semibold">
        Category
      </label>

      <input
        type="text"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        placeholder="Safety / HR / Operations..."
        className="w-full rounded-xl border border-slate-300 px-4 py-3"
      />

    </div>

    {/* Thumbnail */}

    <div>

      <label className="mb-2 block text-sm font-semibold">
        Thumbnail Image
      </label>

      <div className="rounded-xl border-2 border-dashed border-slate-300 bg-slate-50/60 p-5 transition hover:border-orange-400 hover:bg-orange-50">
  <input
    type="file"
    accept="image/*"
    className="w-full cursor-pointer text-sm text-slate-600
      file:mr-4
      file:rounded-lg
      file:border-0
      file:bg-orange-500
      file:px-4
      file:py-2
      file:text-sm
      file:font-semibold
      file:text-white
      hover:file:bg-orange-600"
    onChange={(e) => {
      if (e.target.files?.length) {
        setThumbnail(e.target.files[0]);
      }
    }}
  />

  {thumbnail && (
    <p className="mt-3 text-sm text-green-600">
      ✓ {thumbnail.name}
    </p>
  )}
</div>

    </div>

    {/* PDF */}

    <div>

      <label className="mb-2 block text-sm font-semibold">
        PDF File
      </label>

      <div className="rounded-xl border-2 border-dashed border-slate-300 bg-slate-50/60 p-5 transition hover:border-orange-400 hover:bg-orange-50">
  <input
    type="file"
    accept=".pdf"
    className="w-full cursor-pointer text-sm text-slate-600
      file:mr-4
      file:rounded-lg
      file:border-0
      file:bg-orange-500
      file:px-4
      file:py-2
      file:text-sm
      file:font-semibold
      file:text-white
      hover:file:bg-orange-600"
    onChange={(e) => {
      if (e.target.files?.length) {
        setPdf(e.target.files[0]);
      }
    }}
  />

  {pdf && (
    <p className="mt-3 text-sm text-green-600">
      ✓ {pdf.name}
    </p>
  )}
</div>

    </div>

    <button
  onClick={handleUpload}
  disabled={loading}
  className="w-full rounded-xl bg-orange-500 py-3 font-semibold text-white disabled:opacity-50"
>
  {loading ? "Uploading..." : "Upload Magazine"}
</button>

  </div>

</div>
  );
}