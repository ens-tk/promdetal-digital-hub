"use client";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Calendar } from "lucide-react";
import { api } from "@/lib/api";

interface FileInfo {
  id: string;
  path?: string;
}

interface ArticleListItemDto {
  id: number;
  title: string;
  preview: string; // аналог excerpt
  createdAt: string; // ISO string
  coverImage?: FileInfo | null;
}

const Articles = () => {
  const [articles, setArticles] = useState<ArticleListItemDto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadArticles = async () => {
      try {
        const res = await api.get("/articles"); // должен вернуть List<ArticleListItemDto>
        const data: ArticleListItemDto[] = Array.isArray(res.data) ? res.data : [];
        setArticles(data);
      } catch (err) {
        console.error("Ошибка загрузки статей:", err);
      } finally {
        setLoading(false);
      }
    };

    loadArticles();
  }, []);

  const getImageUrl = (image?: FileInfo | null) => {
    if (!image) return "/placeholder.svg";
    return image.id
      ? `${api.defaults.baseURL}/Files/${image.id}`
      : image.path
      ? `${api.defaults.baseURL}/${image.path}`
      : "/placeholder.svg";
  };

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "";
    const d = new Date(dateStr);
    return isNaN(d.getTime())
      ? ""
      : d.toLocaleDateString("ru-RU", {
          day: "numeric",
          month: "long",
          year: "numeric",
        });
  };

  return (
    <div className="min-h-screen">
      <div className="bg-industrial-dark text-background py-12">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Статьи</h1>
          <p className="text-lg text-background/80">
            Полезные материалы и экспертные публикации
          </p>
        </div>
      </div>

      <div className="container py-12">
        {loading && <p>Загрузка...</p>}
        {!loading && articles.length === 0 && (
          <p className="text-muted-foreground">Статьи не найдены</p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <Link key={article.id} to={`/articles/${article.id}`}>
              <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full">
                <img
                  src={getImageUrl(article.coverImage)}
                  alt={article.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  {article.createdAt && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                      <Calendar className="h-4 w-4" />
                      <span>{formatDate(article.createdAt)}</span>
                    </div>
                  )}
                  <h3 className="font-semibold text-xl mb-2">{article.title}</h3>
                          <div
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: article.preview }}
        />
                  
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Articles;
