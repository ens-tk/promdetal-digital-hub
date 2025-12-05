import { Link } from "react-router-dom";
import { Settings, Cpu, Wrench, HeadphonesIcon } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const services = [
  {
    id: "design",
    title: "Комплексное проектирование",
    description: "Разработка проектной документации для промышленных объектов любой сложности",
    icon: Settings,
    features: ["Технико-экономическое обоснование", "Рабочая документация", "Авторский надзор"],
  },
  {
    id: "automation",
    title: "Комплексная автоматизация производства",
    description: "Внедрение современных систем автоматизации для повышения эффективности",
    icon: Cpu,
    features: ["SCADA системы", "ПЛК программирование", "Интеграция оборудования"],
  },
  {
    id: "commissioning",
    title: "Пусконаладочные работы",
    description: "Профессиональный запуск и настройка промышленного оборудования",
    icon: Wrench,
    features: ["Монтаж оборудования", "Наладка систем", "Обучение персонала"],
  },
  {
    id: "maintenance",
    title: "Сервисное обслуживание",
    description: "Техническая поддержка и регулярное обслуживание оборудования",
    icon: HeadphonesIcon,
    features: ["Плановое ТО", "Аварийный ремонт", "Поставка запчастей"],
  },
];

const Services = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-industrial-dark text-primary-foreground py-16">
        <div className="container">
          <h1 className="text-4xl font-bold mb-4">Услуги и сервисы</h1>
          <p className="text-lg text-primary-foreground/80 max-w-2xl">
            Полный спектр услуг для промышленных предприятий: от проектирования до сервисного обслуживания
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service) => (
              <Card key={service.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <service.icon className="h-8 w-8 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">{service.title}</CardTitle>
                      <CardDescription className="mt-1">{service.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button asChild variant="outline">
                    <Link to={`/services/${service.id}`}>Подробнее</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-muted">
        <div className="container text-center">
          <h2 className="text-2xl font-bold mb-4">Нужна консультация?</h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Свяжитесь с нами для обсуждения вашего проекта. Наши специалисты помогут подобрать оптимальное решение.
          </p>
          <Button asChild size="lg">
            <Link to="/contacts">Связаться с нами</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Services;
