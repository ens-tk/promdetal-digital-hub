import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Calendar } from "lucide-react";

const mockNews = [
  {
    id: 1,
    title: "Новое поступление оборудования",
    date: "15 ноября 2024",
    excerpt: "В наш каталог добавлено современное высокоточное оборудование для металлообработки",
    image: "/placeholder.svg",
  },
  {
    id: 2,
    title: "Участие в выставке ПромТех-2024",
    date: "10 ноября 2024",
    excerpt: "Наша компания примет участие в крупнейшей выставке промышленного оборудования",
    image: "/placeholder.svg",
  },
  {
    id: 3,
    title: "Расширение партнёрской сети",
    date: "5 ноября 2024",
    excerpt: "Мы заключили договоры с новыми поставщиками оборудования из Европы",
    image: "/placeholder.svg",
  },
];

const News = () => {
  return (
    <div className="min-h-screen">
      <div className="bg-industrial-dark text-background py-12">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Новости и статьи</h1>
          <p className="text-lg text-background/80">
            Последние новости компании и полезные материалы
          </p>
        </div>
      </div>

      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockNews.map((news) => (
            <Link key={news.id} to={`/news/${news.id}`}>
              <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full">
                <img
                  src={news.image}
                  alt={news.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                    <Calendar className="h-4 w-4" />
                    <span>{news.date}</span>
                  </div>
                  <h3 className="font-semibold text-xl mb-2">{news.title}</h3>
                  <p className="text-sm text-muted-foreground">{news.excerpt}</p>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default News;
