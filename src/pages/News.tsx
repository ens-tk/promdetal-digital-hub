import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Calendar } from "lucide-react";
import { api } from "@/lib/api";

interface NewsItem {
  id: number;
  title: string;
  preview: string;
  createdAt: string;
  coverImage?: {
    id: string;
    name: string;
    extension: string;
    size: number;
    path: string;
  };
}

const News = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get<NewsItem[]>("/news")
      .then((res) => setNews(res.data))
      .catch((err) => console.error("Ошибка загрузки новостей:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-industrial-dark text-background py-12">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Новости и статьи
          </h1>
          <p className="text-lg text-background/80">
            Последние новости компании и полезные материалы
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="container py-12">
        {loading ? (
          <div className="text-center text-muted-foreground">
            Загрузка новостей...
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {news.map((item) => (
              <Link key={item.id} to={`/news/${item.id}`}>
                <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full">
                  {item.coverImage ? (
                    <img
                      src={`http://localhost:8080/promdetal/api/Files/${item.coverImage.id}`}
                      alt={item.title}
                      className="w-full h-48 object-cover"
                    />
                  ) : (
                    <div className="w-full h-48 bg-muted flex items-center justify-center text-sm text-muted-foreground">
                      Нет изображения
                    </div>
                  )}

                  <div className="p-6">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                      <Calendar className="h-4 w-4" />
                      <span>
                        {new Date(item.createdAt).toLocaleDateString("ru-RU")}
                      </span>
                    </div>

                    <h3 className="font-semibold text-xl mb-2">
                      {item.title}
                    </h3>

                    <p className="text-sm text-muted-foreground">
                      {item.preview}
                    </p>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default News;
