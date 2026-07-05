const API_KEY = import.meta.env.VITE_GNEWS_API_KEY;

export async function getIndustryNews() {
  const response = await fetch(
    `https://gnews.io/api/v4/search?q=oil%20OR%20energy%20OR%20refinery&lang=en&max=10&apikey=${API_KEY}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch news");
  }

  const data = await response.json();

  return data.articles;
}