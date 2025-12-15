import { Card } from "@/components/ui/card";
import { Users, Award, Target, Globe, Factory, Truck, Settings, FileCheck, Wrench, Shield, Building2, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const About = () => {
  const technicalSolutions = [
    "Приёмка порошковых материалов (в том числе из биг бэгов и мешков до 50 кг)",
    "Пневматическая транспортировка сыпучих",
    "Складирование и фасование (в биг бэги и мешки клапанного типа)",
    "Отгрузка мелкодисперсных материалов в автоцементовозы и вагоны хопперы",
    "Обеспыливание процессов приёмки, перевалки и смешивания материалов",
    "Оснащение силосов аэрационными системами для эффективной выгрузки",
    "Разработка программного обеспечения АСУ ТП",
    "Проектирование и монтаж шкафов пневмоуправления"
  ];

  const services = [
    "Технический аудит существующего, либо проектируемого производственного участка",
    "Анализ задач и поиск индивидуального технического решения",
    "Подготовка предварительного 3D макета проектируемого участка с привязкой к месту",
    "Подготовка эскизного проекта проектируемого участка",
    "Тесное сотрудничество с проектными организациями",
    "Изготовление и комплектация оборудования",
    "Шеф монтажные и пусконаладочные работы",
    "Техническое сопровождение"
  ];

  const stats = [
    { icon: Users, value: "500+", label: "Довольных клиентов" },
    { icon: Award, value: "18+", label: "Лет на рынке" },
    { icon: Target, value: "1000+", label: "Выполненных проектов" },
    { icon: Globe, value: "50+", label: "Городов поставки" }
  ];

  const industries = [
    "Строительная промышленность",
    "Нефтехимическая промышленность",
    "Косметическая промышленность",
    "Алюминиевая промышленность",
    "Атомная промышленность",
    "Пищевая промышленность"
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-industrial-dark via-industrial-dark to-industrial-gray text-background py-16 md:py-24">
        <div className="container">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">О компании</h1>
          <p className="text-xl md:text-2xl text-background/80 max-w-3xl">
            ENS Group — надежный партнер в области промышленного оборудования для работы с сыпучими материалами
          </p>
        </div>
      </div>

      <div className="container py-12 md:py-16 space-y-16 md:space-y-24">
        {/* ENS Group сегодня */}
        <section>
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-foreground">ENS Group сегодня</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <p className="text-lg leading-relaxed text-muted-foreground">
                Мы специализируемся на комплексных решениях для работы с сыпучими мелкодисперсными (порошковыми) материалами, 
                типа цемент, известь, микрокремнезём, крахмал, в строительной, химической и пищевой промышленности.
              </p>
              <p className="text-lg leading-relaxed text-muted-foreground">
                Специалисты ENS Group имеют высшее техническое образование и длительное время работали на профильных производствах. 
                Богатый практический опыт дает возможность подходить к решению поставленных задач с практической стороны 
                и учетом особенностей эксплуатации оборудования.
              </p>
              <p className="text-lg leading-relaxed text-muted-foreground font-medium">
                Таким образом, разработанное нашим предприятием оборудование, является высокоэффективным и практичным в эксплуатации.
              </p>
            </div>
            <Card className="p-8 bg-primary/5 border-primary/20">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Factory className="h-6 w-6 text-primary" />
                Отрасли применения
              </h3>
              <ul className="space-y-3">
                {industries.map((industry, index) => (
                  <li key={index} className="flex items-center gap-3 text-muted-foreground">
                    <ChevronRight className="h-4 w-4 text-primary flex-shrink-0" />
                    {industry}
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </section>

        {/* Статистика */}
        <section>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {stats.map((stat, index) => (
              <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow">
                <stat.icon className="h-10 w-10 md:h-12 md:w-12 text-primary mx-auto mb-4" />
                <h3 className="font-bold text-2xl md:text-3xl mb-2 text-foreground">{stat.value}</h3>
                <p className="text-sm md:text-base text-muted-foreground">{stat.label}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* Технические решения */}
        <section>
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-foreground flex items-center gap-3">
            <Settings className="h-8 w-8 text-primary" />
            Технические решения на всех этапах производства
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {technicalSolutions.map((solution, index) => (
              <Card key={index} className="p-5 flex items-start gap-4 hover:shadow-md transition-shadow">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-primary font-semibold text-sm">{index + 1}</span>
                </div>
                <p className="text-muted-foreground">{solution}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* Что мы предлагаем */}
        <section className="bg-muted/30 -mx-4 px-4 py-12 md:-mx-8 md:px-8 lg:-mx-16 lg:px-16 rounded-2xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-foreground flex items-center gap-3">
            <Wrench className="h-8 w-8 text-primary" />
            Что мы предлагаем
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {services.map((service, index) => (
              <Card key={index} className="p-5 bg-background hover:shadow-lg transition-all hover:-translate-y-1">
                <div className="w-10 h-10 rounded-lg bg-primary text-primary-foreground flex items-center justify-center mb-4">
                  <span className="font-bold">{String(index + 1).padStart(2, '0')}</span>
                </div>
                <p className="text-foreground font-medium">{service}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* История */}
        <section>
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-foreground flex items-center gap-3">
            <Building2 className="h-8 w-8 text-primary" />
            История компании
          </h2>
          <div className="space-y-8">
            <Card className="p-8 border-l-4 border-l-primary">
              <h3 className="text-xl font-semibold mb-4 text-primary">2005 год — Основание</h3>
              <p className="text-muted-foreground leading-relaxed">
                История компании «Промдеталь» началась в 2005 году благодаря семейной инициативе — 
                братьев Энса Дмитрия Владимировича и Энса Алексея Владимировича, а также их отца 
                Энса Владимира Теобальдовича. Они решили организовать собственное дело, связанное с 
                поставкой производственно-технического оборудования на энергетические объекты РАО ЕЭС России.
              </p>
            </Card>

            <Card className="p-8">
              <h3 className="text-xl font-semibold mb-4 text-foreground">Распределение обязанностей основателей</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <p className="font-semibold text-foreground mb-2">Энс А.В.</p>
                  <p className="text-sm text-muted-foreground">Техническая сторона бизнеса</p>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <p className="font-semibold text-foreground mb-2">Энс В.Т.</p>
                  <p className="text-sm text-muted-foreground">Продвижение продукции</p>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <p className="font-semibold text-foreground mb-2">Энс Д.В.</p>
                  <p className="text-sm text-muted-foreground">Общее руководство организацией</p>
                </div>
              </div>
            </Card>

            <Card className="p-8 border-l-4 border-l-accent">
              <h3 className="text-xl font-semibold mb-4 text-accent">2009 год — Развитие</h3>
              <p className="text-muted-foreground leading-relaxed">
                Первоначально деятельность велась преимущественно на строительном рынке Сибири, однако 
                экономический кризис 2009 года заставил компанию адаптироваться и задуматься о производстве 
                собственных изделий для обеспечения стабильности качества и снижения издержек. Это привело к 
                строительству собственного производственного помещения и постепенному расширению бизнеса.
              </p>
            </Card>

            <Card className="p-8 bg-primary/5 border-primary/20">
              <h3 className="text-xl font-semibold mb-4 text-primary">Сегодня</h3>
              <p className="text-muted-foreground leading-relaxed">
                Сегодня ООО «Промдеталь» представляет собой успешное промышленное предприятие с развитой 
                производственной базой и квалифицированным персоналом. Компания прошла путь от небольшого 
                поставщика комплектующих до современного промышленного комплекса, способного выполнять 
                сложные технические задачи в разных регионах России.
              </p>
            </Card>
          </div>
        </section>

        {/* Миссия и ценности */}
        <section>
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-foreground">Миссия и ценности</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="p-8">
              <h3 className="text-2xl font-bold mb-4 text-foreground">Наша миссия</h3>
              <p className="text-muted-foreground leading-relaxed">
                Обеспечивать промышленные предприятия качественным оборудованием и инновационными 
                решениями для работы с сыпучими материалами, способствуя развитию производственного 
                сектора России.
              </p>
            </Card>
            <Card className="p-8">
              <h3 className="text-2xl font-bold mb-4 text-foreground">Наши ценности</h3>
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
        </section>

        {/* Быстрые ссылки */}
        <section>
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-foreground">Дополнительная информация</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link to="/projects">
              <Card className="p-6 hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer group">
                <Truck className="h-8 w-8 text-primary mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="font-semibold text-foreground mb-2">Реализованные проекты</h3>
                <p className="text-sm text-muted-foreground">Примеры наших работ</p>
              </Card>
            </Link>
            <Link to="/news">
              <Card className="p-6 hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer group">
                <FileCheck className="h-8 w-8 text-primary mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="font-semibold text-foreground mb-2">Пресс-центр</h3>
                <p className="text-sm text-muted-foreground">Новости и статьи</p>
              </Card>
            </Link>
            <Link to="/contacts">
              <Card className="p-6 hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer group">
                <Users className="h-8 w-8 text-primary mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="font-semibold text-foreground mb-2">Заказчики</h3>
                <p className="text-sm text-muted-foreground">Кто выбрал качество</p>
              </Card>
            </Link>
            <Card className="p-6 hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer group">
              <FileCheck className="h-8 w-8 text-primary mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="font-semibold text-foreground mb-2">Документация</h3>
              <p className="text-sm text-muted-foreground">Сертификаты и реквизиты</p>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
