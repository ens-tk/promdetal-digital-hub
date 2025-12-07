import { useParams, Link } from "react-router-dom";
import { Calendar, ArrowLeft } from "lucide-react";
import { Card } from "@/components/ui/card";

const allNews = [
  {
    id: "1",
    title: "Новое поступление оборудования",
    date: "15 ноября 2024",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=400&fit=crop",
    content: `
      <p>В наш каталог добавлено современное высокоточное оборудование для металлообработки от ведущих европейских производителей.</p>
      <p>Новое оборудование включает в себя:</p>
      <ul>
        <li>Токарные станки с ЧПУ повышенной точности</li>
        <li>Фрезерные обрабатывающие центры</li>
        <li>Шлифовальное оборудование</li>
      </ul>
      <p>Все оборудование прошло сертификацию и полностью готово к поставке. Наши специалисты готовы провести консультацию и помочь с выбором оптимального решения для вашего производства.</p>
      <p>Для получения подробной информации свяжитесь с нашими менеджерами по телефону или оставьте заявку на сайте.</p>
    `,
  },
  {
    id: "2",
    title: "Участие в выставке ПромТех-2024",
    date: "10 ноября 2024",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=400&fit=crop",
    content: `
      <p>Наша компания примет участие в крупнейшей выставке промышленного оборудования ПромТех-2024, которая пройдёт с 20 по 23 ноября в Экспоцентре.</p>
      <p>На стенде компании будут представлены:</p>
      <ul>
        <li>Новейшие модели насосного оборудования</li>
        <li>Компрессорные установки</li>
        <li>Инновационные решения в области автоматизации</li>
      </ul>
      <p>Приглашаем всех партнёров и потенциальных клиентов посетить наш стенд №A-42 в павильоне 3. Наши эксперты ответят на все вопросы и продемонстрируют работу оборудования.</p>
    `,
  },
  {
    id: "3",
    title: "Расширение партнёрской сети",
    date: "5 ноября 2024",
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&h=400&fit=crop",
    content: `
      <p>Мы рады сообщить о заключении договоров с новыми поставщиками оборудования из Европы. Это позволит значительно расширить ассортимент и предложить клиентам ещё более выгодные условия.</p>
      <p>Новые партнёры:</p>
      <ul>
        <li>Grundfos (Дания) — насосное оборудование</li>
        <li>Atlas Copco (Швеция) — компрессоры</li>
        <li>KSB (Германия) — трубопроводная арматура</li>
      </ul>
      <p>Благодаря прямым поставкам от производителей мы гарантируем оригинальность продукции, конкурентные цены и полное сервисное обслуживание.</p>
    `,
  },
];

const NewsDetail = () => {
  const { id } = useParams();
  const news = allNews.find((n) => n.id === id);
  
  // Последние 3 новости, исключая текущую
  const latestNews = allNews.filter((n) => n.id !== id).slice(0, 3);

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
            <span>{news.date}</span>
          </div>
        </div>
      </div>

      <div className="container py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <img
              src={news.image}
              alt={news.title}
              className="w-full h-64 md:h-80 object-cover rounded-lg mb-6"
            />
            <div 
              className="prose prose-lg max-w-none text-foreground"
              dangerouslySetInnerHTML={{ __html: news.content }}
            />
          </div>

          {/* Sidebar - Latest News */}
          <aside>
            <h3 className="text-lg font-semibold mb-4 pb-2 border-b border-border">
              Последние новости
            </h3>
            <div className="space-y-4">
              {latestNews.map((item) => (
                <Link key={item.id} to={`/news/${item.id}`}>
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

export default NewsDetail;