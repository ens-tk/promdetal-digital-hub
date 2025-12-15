import { useParams, Link } from "react-router-dom";
import { Calendar, ArrowLeft } from "lucide-react";
import { Card } from "@/components/ui/card";

const allArticles = [
  {
    id: "1",
    title: "Как выбрать оборудование для работы с порошковыми материалами",
    date: "12 ноября 2024",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=400&fit=crop",
    content: `
      <p>Выбор оборудования для работы с порошковыми материалами — ответственная задача, требующая учёта множества факторов.</p>
      <h3>Основные критерии выбора</h3>
      <ul>
        <li>Тип обрабатываемого материала (цемент, известь, крахмал и др.)</li>
        <li>Производительность линии</li>
        <li>Условия эксплуатации</li>
        <li>Требования к качеству конечного продукта</li>
      </ul>
      <p>Наши специалисты помогут подобрать оптимальное решение с учётом всех особенностей вашего производства.</p>
    `,
  },
  {
    id: "2",
    title: "Пневматическая транспортировка: преимущества и особенности",
    date: "8 ноября 2024",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=400&fit=crop",
    content: `
      <p>Пневматическая транспортировка — современный метод перемещения сыпучих материалов с помощью воздушного потока.</p>
      <h3>Преимущества пневмотранспорта</h3>
      <ul>
        <li>Герметичность системы — отсутствие потерь материала</li>
        <li>Гибкость маршрута — возможность прокладки по сложным траекториям</li>
        <li>Минимальное обслуживание — меньше движущихся частей</li>
        <li>Экологичность — отсутствие пыления</li>
      </ul>
      <p>Мы проектируем и устанавливаем системы пневмотранспорта под ключ.</p>
    `,
  },
  {
    id: "3",
    title: "Системы обеспыливания на производстве",
    date: "1 ноября 2024",
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&h=400&fit=crop",
    content: `
      <p>Обеспыливание — важнейший аспект безопасности и эффективности производства при работе с мелкодисперсными материалами.</p>
      <h3>Наши решения включают</h3>
      <ul>
        <li>Рукавные фильтры</li>
        <li>Циклонные сепараторы</li>
        <li>Комплексные аспирационные системы</li>
      </ul>
      <p>Правильно спроектированная система обеспыливания снижает потери материала и улучшает условия труда.</p>
    `,
  },
];

const ArticleDetail = () => {
  const { id } = useParams();
  const article = allArticles.find((a) => a.id === id);
  
  // 3 статьи, исключая текущую
  const relatedArticles = allArticles.filter((a) => a.id !== id).slice(0, 3);

  if (!article) {
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
  }

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
            <span>{article.date}</span>
          </div>
        </div>
      </div>

      <div className="container py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <img
              src={article.image}
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
            <h3 className="text-lg font-semibold mb-4 pb-2 border-b border-border">
              Также интересно
            </h3>
            <div className="space-y-4">
              {relatedArticles.map((item) => (
                <Link key={item.id} to={`/articles/${item.id}`}>
                  <Card className="overflow-hidden hover:shadow-md transition-shadow">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-32 object-cover"
                    />
                    <div className="p-4">
                      <h4 className="font-medium text-base line-clamp-2 mb-2">
                        {item.title}
                      </h4>
                      <span className="text-sm text-muted-foreground flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" />
                        {item.date}
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

export default ArticleDetail;
