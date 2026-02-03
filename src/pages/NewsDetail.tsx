import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Calendar, ArrowLeft } from "lucide-react";
import { Card } from "@/components/ui/card";
import { api } from "@/lib/api";

interface NewsItem {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  coverImage?: { id: string; path: string; name: string } | null;
}

const NewsDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [news, setNews] = useState<NewsItem | null>(null);
  const [latestNews, setLatestNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  const getImageUrl = (coverImage?: { id: string; path: string; name: string } | null) => {
    if (!coverImage) return "/placeholder.svg";
    return `http://localhost:8080/promdetal/api/Files/${coverImage.id}`;
  };

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);

        // 1️⃣ Загружаем конкретную новость
        const res = await api.get(`/news/${id}`);
        const data: NewsItem = res.data;
        setNews(data);

        // 2️⃣ Загружаем последние 3 новости (без текущей)
        const resAll = await api.get("/news");
        const allNews: NewsItem[] = Array.isArray(resAll.data) ? resAll.data : [];
        const latest = allNews
          .filter((n) => n.id !== Number(id))
          .slice(0, 3);
        setLatestNews(latest);

      } catch (err) {
        console.error("Ошибка при загрузке новости:", err);
        setNews(null);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Загрузка новости...</p>
      </div>
    );
  }

  if (!news) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Новость не найдена</h1>
          <Link to="/news" className="text-primary hover:underline">
            Вернуться к новостям
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="bg-industrial-dark text-background py-8">
        <div className="container">
          <Link 
            to="/news" 
            className="inline-flex items-center gap-2 text-background/70 hover:text-background transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Все новости
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold">{news.title}</h1>
          <div className="flex items-center gap-2 text-background/70 mt-3">
            <Calendar className="w-4 h-4" />
            <span>{new Date(news.createdAt).toLocaleDateString("ru-RU")}</span>
          </div>
        </div>
      </div>

      <div className="container py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {news.coverImage && (
              <img
                src={getImageUrl(news.coverImage)}
                alt={news.title}
                className="w-full h-64 md:h-80 object-cover rounded-lg mb-6"
              />
            )}
            <div 
              className="prose prose-lg max-w-none text-foreground"
              dangerouslySetInnerHTML={{ __html: news.content }}
            />
          </div>

          {/* Sidebar - Related News */}
          <aside>
            <h3 className="text-lg font-semibold mb-4 pb-2 border-b border-border">
              Также интересно
            </h3>
            <div className="space-y-4">
              {latestNews.map((item) => (
                <Link key={item.id} to={`/news/${item.id}`}>
                  <Card className="overflow-hidden hover:shadow-md transition-shadow">
                    {item.coverImage && (
                      <img
                        src={getImageUrl(item.coverImage)}
                        alt={item.title}
                        className="w-full h-32 object-cover"
                      />
                    )}
                    <div className="p-4">
                      <h4 className="font-medium text-base line-clamp-2 mb-2">{item.title}</h4>
                      <span className="text-sm text-muted-foreground flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" />
                        {new Date(item.createdAt).toLocaleDateString("ru-RU")}
                      </span>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default NewsDetail;
