const API_KEY = import.meta.env.VITE_GNEWS_API_KEY;

export async function getIndustryNews(category = "all") {
  let query = "";

  switch (category) {
    case "iocl":
      query = '"Indian Oil Corporation" OR IndianOil OR IOCL';
      break;

    case "refinery":
      query = "refinery OR refinery operations";
      break;

    case "crude":
      query = '"crude oil" OR brent OR wti';
      break;

    case "government":
      query =
        '"Ministry of Petroleum" OR petroleum ministry OR oil ministry';
      break;

    default:
      query =
        '"Indian Oil Corporation" OR IOCL OR oil OR petroleum OR refinery OR natural gas OR "crude oil" OR energy';
  }

  const response = await fetch(
    `https://gnews.io/api/v4/search?q=${encodeURIComponent(
      query
    )}&lang=en&max=12&sortby=publishedAt&apikey=${API_KEY}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch news");
  }

  const data = await response.json();

  return data.articles;
}