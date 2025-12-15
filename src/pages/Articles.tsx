import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Calendar } from "lucide-react";

const mockArticles = [
  {
    id: 1,
    title: "Как выбрать оборудование для работы с порошковыми материалами",
    date: "12 ноября 2024",
    excerpt: "Подробное руководство по подбору оборудования для различных типов сыпучих материалов",
    image: "/placeholder.svg",
  },
  {
    id: 2,
    title: "Пневматическая транспортировка: преимущества и особенности",
    date: "8 ноября 2024",
    excerpt: "Рассматриваем основные принципы и преимущества пневматической транспортировки материалов",
    image: "/placeholder.svg",
  },
  {
    id: 3,
    title: "Системы обеспыливания на производстве",
    date: "1 ноября 2024",
    excerpt: "Обзор современных решений для обеспыливания производственных процессов",
    image: "/placeholder.svg",
  },
];

const Articles = () => {
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockArticles.map((article) => (
            <Link key={article.id} to={`/articles/${article.id}`}>
              <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                    <Calendar className="h-4 w-4" />
                    <span>{article.date}</span>
                  </div>
                  <h3 className="font-semibold text-xl mb-2">{article.title}</h3>
                  <p className="text-sm text-muted-foreground">{article.excerpt}</p>
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
