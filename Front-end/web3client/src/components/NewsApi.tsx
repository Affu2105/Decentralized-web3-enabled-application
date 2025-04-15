import React, { useEffect, useState } from "react";

interface Article {
  title: string;
  url: string;
  description: string | null; 
  urlToImage: string | null; 
  source: {
    id: string | null;
    name: string;
  };
}

const HealthNews: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(true); 
  const [error, setError] = useState<string | null>(null);

  const apiKey = "3fd39e9503854e7ebfa5f1a14942d000";
  // const apiUrl = `https://newsapi.org/v2/top-headlines?category=health&language=en&country=us&pageSize=5&apiKey=${apiKey}`;
const apiUrl = "https://newsdata.io/api/1/news?apikey=pub_795651c2930d9d4bd862e6ace23bff3555d3c&category=health&language=en"

useEffect(() => {
  const fetchHealthNews = async () => {
    setLoading(true); 
    setError(null);   

    try {
      const response = await fetch(apiUrl);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({})); 
        throw new Error(errorData?.message || `HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("API Response:", data.results); 

      if (data.results) {
        const formattedArticles = data.results.map((item: any) => ({
          title: item.title,
          url: item.link,
          description: item.description || item.content || null,
          urlToImage: item.image_url || null,
          source: {
            id: null,
            name: item.source_id || "Unknown Source",
          },
        }));

        setArticles(formattedArticles);
      } else {
        setError("No results from API");
      }
    } catch (err: any) { 
      console.error("Fetch error:", err);
      setError(err.message || "Failed to load health news. Check console.");
    } finally {
      setLoading(false); 
    }
  };

  fetchHealthNews();
}, []);

  return (
    <div className="mx-auto max-w-2xl rounded-lg bg-white p-4 shadow-md sm:p-6 lg:p-8 mt-24 mb-10 border border-gray-200">
      {/* Heading */}
      <h3 className="mb-4 text-center text-xl font-semibold text-gray-800 sm:text-2xl">
        🩺 Top Health News
      </h3>

      {/* Loading State */}
      {loading && (
          <div className="flex justify-center items-center py-6">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
              <p className="ml-3 text-gray-600">Loading news...</p>
          </div>
      )}

      {error && (
          <div className="my-4 rounded border border-red-300 bg-red-50 p-3 text-center text-red-700">
              <p><strong>Error:</strong> {error}</p>
          </div>
       )}

      {!loading && !error && articles.length === 0 && (
        <p className="text-center text-gray-500 py-4">No health news available at the moment.</p>
      )}

      {!loading && !error && articles.length > 0 && (
        <div className="space-y-4"> 
          {articles.map((article, index) => (
            <div
              key={article.url || index} 
              className="flex flex-col sm:flex-row items-start gap-4 rounded-md border border-gray-200 p-4 transition duration-150 ease-in-out hover:bg-gray-50"
            >
              {/* Image Section */}
              {article.urlToImage && (
                <img
                  src={article.urlToImage}
                  alt={`Image for article: ${article.title}`}
                  className="h-24 w-full flex-shrink-0 rounded object-cover sm:w-32"
                  onError={(e) => (e.currentTarget.style.display = 'none')} 
                />
              )}
              {!article.urlToImage && (
                  <div className="flex h-24 w-full flex-shrink-0 items-center justify-center rounded bg-gray-200 text-gray-500 sm:w-32">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                  </div>
              )}

              <div className="flex-grow">
                {/* Source */}
                <p className="mb-1 text-xs font-medium uppercase tracking-wide text-blue-600">
                  {article.source.name}
                </p>
                {/* Title (Link) */}
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mb-1 block text-base font-semibold text-gray-900 hover:text-blue-700 hover:underline sm:text-lg"
                >
                  {article.title}
                </a>
                {/* Description (Truncated) */}
                {article.description && (
                  <p className="text-sm text-gray-600 line-clamp-2"> {/* Limits to 2 lines */}
                    {article.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HealthNews;