import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, Award, Target, Globe, Factory, Settings, FileCheck, Wrench, Shield, Building2, ChevronRight, Star, FileText, Building, MessageSquareQuote, CheckCircle2 } from "lucide-react";
import { useSearchParams } from "react-router-dom";

const About = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentTab = searchParams.get("tab") || "overview";

  const handleTabChange = (value: string) => {
    setSearchParams({ tab: value });
  };

  const technicalSolutions = [
    "Приёмка сыпучих материалов, включая разгрузку биг-бэгов и мешков до 50 кг",
    "Пневматическое транспортирование порошковых материалов",
    "Складирование, дозирование и фасовка в биг-бэги и клапанные мешки",
    "Автоматизированная загрузка автоцементовозов и вагонов-хопперов",
    "Локальное обеспыливание процессов приёмки, транспортирования и смешивания",
    "Оснащение силосов аэрационными системами для эффективной выгрузки материалов",
    "Разработка программного обеспечения АСУ ТП",
    "Проектирование и изготовление шкафов управления и пневмоуправления",
  ];

  const services = [
    "Технический аудит существующих и проектируемых производственных участков",
    "Разработка индивидуальных инженерных решений",
    "Создание предварительных 3D-моделей и компоновочных решений",
    "Подготовка эскизной и проектной документации",
    "Взаимодействие с техническими службами заказчика и проектными организациями",
    "Изготовление и комплектация оборудования",
    "Шеф-монтажные и пусконаладочные работы",
    "Техническое сопровождение и сервисная поддержка",
  ];

  const whyUs = [
    "Более 20 лет инженерного опыта",
    "Более 50 реализованных проектов",
    "Индивидуальные решения под конкретные производственные задачи",
    "Инженерные расчёты и технико-экономическое обоснование решений",
    "Собственное производство и конструкторская база",
    "Комплексная реализация проектов «под ключ»",
  ];

  const offer = [
    "Технический аудит производственного участка",
    "Подбор и разработка технического решения",
    "Проектирование и подготовка документации",
    "Производство и поставка оборудования",
    "Шеф-монтаж и ввод в эксплуатацию",
    "Обучение персонала и техническое сопровождение",
  ];

  const stats = [
    { icon: Award, value: "20+", label: "Лет инженерного опыта" },
    { icon: Target, value: "50+", label: "Реализованных проектов" },
    { icon: Settings, value: "360°", label: "Полный цикл работ" },
    { icon: Factory, value: "6", label: "Отраслей применения" },
  ];

  const industries = [
    "Строительная промышленность",
    "Нефтехимическая промышленность",
    "Косметическая промышленность",
    "Алюминиевая промышленность",
    "Атомная промышленность",
    "Пищевая промышленность",
  ];

  const reviews = [
    { company: "ООО Сибирский Цемент", text: "Отличное качество оборудования и профессиональный подход к решению задач.", rating: 5 },
    { company: "АО Химпром", text: "Благодарим за оперативную поставку и техническое сопровождение проекта.", rating: 5 },
    { company: "ЗАО Стройматериалы", text: "Надежный партнер с многолетним опытом. Рекомендуем!", rating: 5 },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-industrial-dark via-industrial-dark to-industrial-gray text-background py-12 md:py-16">
        <div className="container">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">О компании</h1>
          <p className="text-lg md:text-xl text-background/80 max-w-3xl">
            Инженерные решения для работы с сыпучими материалами
          </p>
        </div>
      </div>

      <div className="container py-8 md:py-12">
        <Tabs value={currentTab} onValueChange={handleTabChange} className="w-full">
          <TabsList className="w-full flex flex-wrap h-auto gap-1 bg-muted/50 p-2 mb-8">
            <TabsTrigger value="overview" className="flex-1 min-w-[120px] data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Building2 className="h-4 w-4 mr-2" />
              Обзор
            </TabsTrigger>
            <TabsTrigger value="history" className="flex-1 min-w-[120px] data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Building className="h-4 w-4 mr-2" />
              История
            </TabsTrigger>
            <TabsTrigger value="mission" className="flex-1 min-w-[120px] data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Target className="h-4 w-4 mr-2" />
              Миссия
            </TabsTrigger>
            <TabsTrigger value="reviews" className="flex-1 min-w-[120px] data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <MessageSquareQuote className="h-4 w-4 mr-2" />
              Отзывы
            </TabsTrigger>
            <TabsTrigger value="docs" className="flex-1 min-w-[120px] data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <FileText className="h-4 w-4 mr-2" />
              Документация
            </TabsTrigger>
            <TabsTrigger value="requisites" className="flex-1 min-w-[120px] data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <FileCheck className="h-4 w-4 mr-2" />
              Реквизиты
            </TabsTrigger>
          </TabsList>

          {/* Обзор */}
          <TabsContent value="overview" className="space-y-12">
            {/* ENS Group сегодня */}
            <section>
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-foreground">ENS Group сегодня</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <p className="text-base leading-relaxed text-muted-foreground">
                    ENS Group специализируется на разработке и внедрении комплексных технических решений для предприятий,
                    работающих с сыпучими и порошковыми материалами: цементом, известью, микрокремнезёмом, крахмалом
                    и другими продуктами строительной, химической и пищевой промышленности.
                  </p>
                  <p className="text-base leading-relaxed text-muted-foreground">
                    Более 20 лет опыта и 50+ реализованных проектов позволяют нам создавать решения, которые повышают
                    производительность, снижают потери материала и обеспечивают стабильную работу производственных участков.
                  </p>
                </div>
                <Card className="p-6 bg-primary/5 border-primary/20">
                  <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <Factory className="h-5 w-5 text-primary" />
                    Отрасли применения
                  </h3>
                  <ul className="space-y-2">
                    {industries.map((industry, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <ChevronRight className="h-3 w-3 text-primary flex-shrink-0" />
                        {industry}
                      </li>
                    ))}
                  </ul>
                </Card>
              </div>
            </section>

            {/* Статистика */}
            <section>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {stats.map((stat, index) => (
                  <Card key={index} className="p-4 text-center">
                    <stat.icon className="h-8 w-8 text-primary mx-auto mb-2" />
                    <h3 className="font-bold text-xl md:text-2xl text-foreground">{stat.value}</h3>
                    <p className="text-xs md:text-sm text-muted-foreground">{stat.label}</p>
                  </Card>
                ))}
              </div>
            </section>

            {/* Решения для всех этапов */}
            <section>
              <h2 className="text-2xl md:text-3xl font-bold mb-2 text-foreground flex items-center gap-2">
                <Settings className="h-6 w-6 text-primary" />
                Решения для всех этапов технологического процесса
              </h2>
              <p className="text-muted-foreground mb-6">
                Мы разрабатываем и внедряем решения для ключевых участков производства:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {technicalSolutions.map((solution, index) => (
                  <Card key={index} className="p-4 flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-primary font-semibold text-xs">{index + 1}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{solution}</p>
                  </Card>
                ))}
              </div>
            </section>

            {/* От идеи до запуска */}
            <section className="bg-muted/30 -mx-4 px-4 py-8 md:-mx-8 md:px-8 rounded-xl">
              <h2 className="text-2xl md:text-3xl font-bold mb-2 text-foreground flex items-center gap-2">
                <Wrench className="h-6 w-6 text-primary" />
                От идеи до запуска оборудования
              </h2>
              <p className="text-muted-foreground mb-6">
                Мы сопровождаем проект на всех этапах — от анализа задачи до ввода оборудования в эксплуатацию. Наши компетенции включают:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {services.map((service, index) => (
                  <Card key={index} className="p-4 bg-background">
                    <div className="w-8 h-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center mb-3 text-sm font-bold">
                      {String(index + 1).padStart(2, "0")}
                    </div>
                    <p className="text-sm text-foreground">{service}</p>
                  </Card>
                ))}
              </div>
            </section>

            {/* Почему выбирают ENS Group */}
            <section>
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-foreground flex items-center gap-2">
                <Award className="h-6 w-6 text-primary" />
                Почему выбирают ENS Group
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {whyUs.map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-muted-foreground">{item}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Помогаем решать сложные задачи */}
            <section className="bg-primary/5 border border-primary/20 rounded-xl p-6 md:p-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-2 text-foreground">
                Помогаем решать сложные производственные задачи
              </h2>
              <p className="text-muted-foreground mb-6">ENS Group предлагает:</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {offer.map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-foreground">{item}</p>
                  </div>
                ))}
              </div>
              <p className="mt-6 text-sm font-medium text-primary">
                ENS Group — инженерные решения для эффективной работы с сыпучими материалами.
              </p>
            </section>
          </TabsContent>

          {/* История */}
          <TabsContent value="history" className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-foreground flex items-center gap-2">
              <Building2 className="h-6 w-6 text-primary" />
              История компании
            </h2>

            <Card className="p-6 border-l-4 border-l-primary">
              <h3 className="text-lg font-semibold mb-3 text-primary">2005 год — Основание</h3>
              <p className="text-muted-foreground leading-relaxed">
                История компании «Промдеталь» началась в 2005 году благодаря семейной инициативе —
                братьев Энса Дмитрия Владимировича и Энса Алексея Владимировича, а также их отца
                Энса Владимира Теобальдовича. Они решили организовать собственное дело, связанное с
                поставкой производственно-технического оборудования на энергетические объекты РАО ЕЭС России.
              </p>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4 text-foreground">Распределение обязанностей основателей</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <p className="font-semibold text-foreground mb-1">Энс А.В.</p>
                  <p className="text-sm text-muted-foreground">Техническая сторона бизнеса</p>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <p className="font-semibold text-foreground mb-1">Энс В.Т.</p>
                  <p className="text-sm text-muted-foreground">Продвижение продукции</p>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <p className="font-semibold text-foreground mb-1">Энс Д.В.</p>
                  <p className="text-sm text-muted-foreground">Общее руководство организацией</p>
                </div>
              </div>
            </Card>

            <Card className="p-6 border-l-4 border-l-accent">
              <h3 className="text-lg font-semibold mb-3 text-accent">2009 год — Развитие</h3>
              <p className="text-muted-foreground leading-relaxed">
                Первоначально деятельность велась преимущественно на строительном рынке Сибири, однако
                экономический кризис 2009 года заставил компанию адаптироваться и задуматься о производстве
                собственных изделий для обеспечения стабильности качества и снижения издержек. Это привело к
                строительству собственного производственного помещения и постепенному расширению бизнеса.
              </p>
            </Card>

            <Card className="p-6 bg-primary/5 border-primary/20">
              <h3 className="text-lg font-semibold mb-3 text-primary">Сегодня</h3>
              <p className="text-muted-foreground leading-relaxed">
                Сегодня ООО «Промдеталь» представляет собой успешное промышленное предприятие с развитой
                производственной базой и квалифицированным персоналом. Компания прошла путь от небольшого
                поставщика комплектующих до современного промышленного комплекса, способного выполнять
                сложные технические задачи в разных регионах России.
              </p>
            </Card>
          </TabsContent>

          {/* Миссия и ценности */}
          <TabsContent value="mission" className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-foreground">Миссия и ценности</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4 text-foreground">Наша миссия</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Обеспечивать промышленные предприятия качественным оборудованием и инновационными
                  решениями для работы с сыпучими материалами, способствуя развитию производственного
                  сектора России.
                </p>
              </Card>
              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4 text-foreground">Наши ценности</h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-center gap-3">
                    <Shield className="h-5 w-5 text-primary flex-shrink-0" />
                    Качество продукции и услуг
                  </li>
                  <li className="flex items-center gap-3">
                    <Users className="h-5 w-5 text-primary flex-shrink-0" />
                    Индивидуальный подход к каждому клиенту
                  </li>
                  <li className="flex items-center gap-3">
                    <Target className="h-5 w-5 text-primary flex-shrink-0" />
                    Постоянное развитие и инновации
                  </li>
                  <li className="flex items-center gap-3">
                    <Award className="h-5 w-5 text-primary flex-shrink-0" />
                    Надежность и ответственность
                  </li>
                </ul>
              </Card>
            </div>
          </TabsContent>

          {/* Отзывы */}
          <TabsContent value="reviews" className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-foreground flex items-center gap-2">
              <MessageSquareQuote className="h-6 w-6 text-primary" />
              Отзывы наших клиентов
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {reviews.map((review, index) => (
                <Card key={index} className="p-6">
                  <div className="flex gap-1 mb-3">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4 italic">"{review.text}"</p>
                  <p className="font-semibold text-foreground">{review.company}</p>
                </Card>
              ))}
            </div>
            <Card className="p-6 bg-muted/30 text-center">
              <p className="text-muted-foreground">
                Здесь будут отображаться реальные отзывы клиентов, загруженные из базы данных.
              </p>
            </Card>
          </TabsContent>

          {/* Документация */}
          <TabsContent value="docs" className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-foreground flex items-center gap-2">
              <FileText className="h-6 w-6 text-primary" />
              Документация
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
                <FileCheck className="h-8 w-8 text-primary mb-3" />
                <h3 className="font-semibold text-foreground mb-2">Сертификаты качества</h3>
                <p className="text-sm text-muted-foreground">Сертификаты соответствия продукции</p>
              </Card>
              <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
                <FileCheck className="h-8 w-8 text-primary mb-3" />
                <h3 className="font-semibold text-foreground mb-2">Лицензии</h3>
                <p className="text-sm text-muted-foreground">Лицензии на ведение деятельности</p>
              </Card>
              <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
                <FileCheck className="h-8 w-8 text-primary mb-3" />
                <h3 className="font-semibold text-foreground mb-2">Благодарственные письма</h3>
                <p className="text-sm text-muted-foreground">Отзывы от партнеров и клиентов</p>
              </Card>
            </div>
            <Card className="p-6 bg-muted/30 text-center">
              <p className="text-muted-foreground">
                Документы будут загружены из базы данных с возможностью скачивания.
              </p>
            </Card>
          </TabsContent>

          {/* Реквизиты */}
          <TabsContent value="requisites" className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-foreground flex items-center gap-2">
              <FileCheck className="h-6 w-6 text-primary" />
              Реквизиты компании
            </h2>
            <Card className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Полное наименование</p>
                    <p className="font-medium text-foreground">Общество с ограниченной ответственностью «Промдеталь»</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Сокращенное наименование</p>
                    <p className="font-medium text-foreground">ООО «Промдеталь»</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">ИНН</p>
                    <p className="font-medium text-foreground">7017000000</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">КПП</p>
                    <p className="font-medium text-foreground">701701001</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground">ОГРН</p>
                    <p className="font-medium text-foreground">1057000000000</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Юридический адрес</p>
                    <p className="font-medium text-foreground">634000, г. Томск, ул. Промышленная, д. 25</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Банк</p>
                    <p className="font-medium text-foreground">ПАО Сбербанк</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Р/с</p>
                    <p className="font-medium text-foreground">40702810000000000000</p>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default About;
