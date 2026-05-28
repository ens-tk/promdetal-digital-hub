import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/api";
import { getIconById } from "@/components/admin/EquipmentIconPicker";
import { Wrench } from "lucide-react";

interface Service {
  id: number;
  title: string;
  description: string;
  imageId?: string | null;
  features: string[];
  iconId?: string | null;
}

const Services = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get<Service[]>("/services")
      .then((res) => setServices(Array.isArray(res.data) ? res.data : []))
      .catch((err) => console.error("Ошибка загрузки услуг:", err))
      .finally(() => setLoading(false));
  }, []);

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
          {loading ? (
            <div className="text-center text-muted-foreground">Загрузка...</div>
          ) : (
            <div className="grid md:grid-cols-2 gap-8">
              {services.map((service) => {
                const iconData = service.iconId ? getIconById(service.iconId) : null;
                const IconComponent = iconData?.icon ?? Wrench;

                return (
                  <Card key={service.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-primary/10 rounded-lg">
                          <IconComponent className="h-8 w-8 text-primary" />
                        </div>
                        <div>
                          <CardTitle className="text-xl">{service.title}</CardTitle>
                          <CardDescription className="mt-1 line-clamp-2">
                            {service.description}
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      {service.features.length > 0 && (
                        <ul className="space-y-2 mb-6">
                          {service.features.map((feature, index) => (
                            <li
                              key={index}
                              className="flex items-center gap-2 text-sm text-muted-foreground"
                            >
                              <div className="h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      )}
                      <Button asChild variant="outline">
                        <Link to={`/services/${service.id}`}>Подробнее</Link>
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
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
