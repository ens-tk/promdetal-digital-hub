import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle } from "lucide-react";
import { api } from "@/lib/api";

interface Service {
  id: number;
  title: string;
  description: string;
  imageId?: string | null;
  features: string[];
  iconId?: string | null;
}

const ServiceDetail = () => {
  const { serviceId } = useParams<{ serviceId: string }>();
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);

  const getFileUrl = (id?: string | null) =>
    id
      ? `http://157.22.174.170:8080/promdetal/api/Files/${id}`
      : null;

  useEffect(() => {
    if (!serviceId) return;
    setLoading(true);
    api
      .get<Service>(`/services/${serviceId}`)
      .then((res) => setService(res.data))
      .catch(() => setService(null))
      .finally(() => setLoading(false));
  }, [serviceId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Загрузка...</p>
      </div>
    );
  }

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

  const imageUrl = getFileUrl(service.imageId);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {imageUrl ? (
          <>
            <div className="h-[400px]">
              <img
                src={imageUrl}
                alt={service.title}
                className="w-full h-full object-cover"
              />
            </div>
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
          </>
        ) : (
          <div className="bg-industrial-dark text-primary-foreground py-16">
            <div className="container">
              <Link
                to="/services"
                className="inline-flex items-center text-white/80 hover:text-white mb-4 transition-colors"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Назад к услугам
              </Link>
              <h1 className="text-4xl md:text-5xl font-bold">{service.title}</h1>
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="container py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="prose prose-lg max-w-none">
              {service.description.split("\n\n").map((paragraph, index) => (
                <p key={index} className="text-muted-foreground mb-4">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          {service.features.length > 0 && (
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
          )}
        </div>
      </div>
    </div>
  );
};

export default ServiceDetail;
