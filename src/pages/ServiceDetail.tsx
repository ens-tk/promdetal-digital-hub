import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle } from "lucide-react";

const servicesData: Record<string, {
  title: string;
  image: string;
  description: string;
  features: string[];
}> = {
  design: {
    title: "Комплексное проектирование",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200",
    description: `Наша компания предлагает полный цикл проектных работ для промышленных объектов, связанных с переработкой и транспортировкой сыпучих материалов.

Мы разрабатываем индивидуальные технические решения, учитывая специфику вашего производства, характеристики материалов и особенности эксплуатации оборудования.

Проектирование включает разработку технологических схем, подбор оборудования, создание 3D-моделей и подготовку полного комплекта рабочей документации.`,
    features: [
      "Технический аудит существующего производства",
      "Разработка концептуальных решений",
      "3D-моделирование и визуализация",
      "Подготовка рабочей документации",
      "Авторский надзор"
    ]
  },
  automation: {
    title: "Комплексная автоматизация производства",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200",
    description: `Автоматизация производственных процессов позволяет значительно повысить эффективность работы предприятия, снизить влияние человеческого фактора и обеспечить стабильное качество продукции.

Мы разрабатываем и внедряем системы АСУ ТП для управления технологическими процессами приёмки, транспортировки, складирования и отгрузки сыпучих материалов.

Наши решения включают программирование контроллеров, разработку SCADA-систем и интеграцию с существующими системами управления предприятием.`,
    features: [
      "Разработка программного обеспечения АСУ ТП",
      "Проектирование шкафов управления",
      "Интеграция с ERP-системами",
      "Удалённый мониторинг и диагностика",
      "Техническая поддержка 24/7"
    ]
  },
  commissioning: {
    title: "Пусконаладочные работы",
    image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=1200",
    description: `Пусконаладочные работы — важнейший этап ввода оборудования в эксплуатацию. Наши специалисты обеспечивают профессиональный монтаж, настройку и запуск оборудования на вашем объекте.

Мы проводим полный комплекс работ: от входного контроля оборудования до обучения персонала и передачи объекта в эксплуатацию.

Гарантируем соблюдение сроков и достижение проектных показателей производительности.`,
    features: [
      "Шеф-монтажные работы",
      "Настройка и калибровка оборудования",
      "Пробные пуски и испытания",
      "Обучение эксплуатационного персонала",
      "Передача технической документации"
    ]
  },
  maintenance: {
    title: "Сервисное обслуживание",
    image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=1200",
    description: `Регулярное техническое обслуживание — залог бесперебойной работы оборудования и увеличения срока его службы. Мы предлагаем гибкие программы сервисного обслуживания, адаптированные под потребности вашего предприятия.

Наши инженеры оперативно реагируют на заявки и выезжают на объект в кратчайшие сроки. Мы обеспечиваем поставку оригинальных запасных частей и расходных материалов.

Заключение договора на сервисное обслуживание позволяет планировать бюджет и избежать незапланированных простоев.`,
    features: [
      "Плановое техническое обслуживание",
      "Аварийный ремонт",
      "Поставка запасных частей",
      "Модернизация оборудования",
      "Консультационная поддержка"
    ]
  }
};

const ServiceDetail = () => {
  const { serviceId } = useParams();
  const service = serviceId ? servicesData[serviceId] : null;

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Услуга не найдена</h1>
          <Button asChild>
            <Link to="/services">Вернуться к услугам</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[400px] overflow-hidden">
        <img
          src={service.image}
          alt={service.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="container">
            <Link
              to="/services"
              className="inline-flex items-center text-white/80 hover:text-white mb-4 transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Назад к услугам
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              {service.title}
            </h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="prose prose-lg max-w-none">
              {service.description.split('\n\n').map((paragraph, index) => (
                <p key={index} className="text-muted-foreground mb-4">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div>
            <div className="bg-muted rounded-lg p-6 sticky top-24">
              <h3 className="font-semibold text-lg mb-4">Что включено</h3>
              <ul className="space-y-3">
                {service.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button className="w-full mt-6" asChild>
                <Link to="/contacts">Заказать услугу</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetail;
