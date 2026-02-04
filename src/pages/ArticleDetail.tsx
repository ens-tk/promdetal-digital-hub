"use client";

import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Calendar, ArrowLeft } from "lucide-react";
import { api } from "@/lib/api";

interface FileInfo {
  id: string;
  path?: string;
}

interface ArticleFullDto {
  id: number;
  title: string;
  content: string; // HTML
  createdAt: string; // ISO
  coverImage?: FileInfo | null;
  recommended?: ArticleFullDto[];
}

const ArticleDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [article, setArticle] = useState<ArticleFullDto | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadArticle = async () => {
      try {
        const res = await api.get(`/articles/${id}`);
        setArticle(res.data);
      } catch (err) {
        console.error("Ошибка загрузки статьи:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) loadArticle();
  }, [id]);

  const getImageUrl = (image?: FileInfo | null) =>
    image?.id ? `${api.defaults.baseURL}/Files/${image.id}` : "/placeholder.svg";

  const formatDate = (iso?: string) => {
    if (!iso) return "";
    const d = new Date(iso);
    return isNaN(d.getTime())
      ? ""
      : d.toLocaleDateString("ru-RU", {
          day: "numeric",
          month: "long",
          year: "numeric",
        });
  };

  if (loading) return <p>Загрузка...</p>;
  if (!article)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Статья не найдена</h1>
          <Link to="/articles" className="text-primary hover:underline">
            Вернуться к статьям
          </Link>
        </div>
      </div>
    );

  // Рекомендуемые статьи, исключая текущую
  const relatedArticles = article.recommended?.filter((a) => a.id !== article.id).slice(0, 3) || [];

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="bg-industrial-dark text-background py-8">
        <div className="container">
          <Link
            to="/articles"
            className="inline-flex items-center gap-2 text-background/70 hover:text-background transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Все статьи
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold">{article.title}</h1>
          <div className="flex items-center gap-2 text-background/70 mt-3">
            <Calendar className="w-4 h-4" />
            <span>{formatDate(article.createdAt)}</span>
          </div>
        </div>
      </div>

      <div className="container py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <img
              src={getImageUrl(article.coverImage)}
              alt={article.title}
              className="w-full h-64 md:h-80 object-cover rounded-lg mb-6"
            />
            <div
              className="prose prose-lg max-w-none text-foreground"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />
          </div>

          {/* Sidebar - Related Articles */}
          <aside>
            {relatedArticles.length > 0 && (
              <>
                <h3 className="text-lg font-semibold mb-4 pb-2 border-b border-border">
                  Также интересно
                </h3>
                <div className="space-y-4">
                  {relatedArticles.map((item) => (
                    <Link key={item.id} to={`/articles/${item.id}`}>
                      <Card className="overflow-hidden hover:shadow-md transition-shadow">
                        <img
                          src={getImageUrl(item.coverImage)}
                          alt={item.title}
                          className="w-full h-32 object-cover"
                        />
                        <div className="p-4">
                          <h4 className="font-medium text-base line-clamp-2 mb-2">
                            {item.title}
                          </h4>
                          <span className="text-sm text-muted-foreground flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5" />
                            {formatDate(item.createdAt)}
                          </span>
                        </div>
                      </Card>
                    </Link>
                  ))}
                </div>
              </>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
};

export default ArticleDetail;
