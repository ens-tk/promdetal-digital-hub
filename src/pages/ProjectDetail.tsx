import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Calendar, MapPin, Building2, Wrench, Cog } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const mockProject = {
  id: "1",
  name: "Модернизация насосной станции",
  date: "2024",
  image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&h=600&fit=crop",
  client: "ПАО «Газпром нефть»",
  location: "г. Омск, Россия",
  equipmentType: "Центробежные насосы",
  services: ["Проектирование", "Поставка", "Монтаж", "Пусконаладка"],
  stages: [
    {
      title: "Проблема",
      description: "Существующее насосное оборудование морально и физически устарело, что приводило к частым поломкам и простоям производства. Энергопотребление превышало нормативы на 40%, а производительность снизилась на 25% от проектной мощности.",
    },
    {
      title: "Решение",
      description: "Разработан комплексный проект модернизации с заменой насосного оборудования на современные энергоэффективные центробежные насосы. Внедрена система автоматического управления и мониторинга параметров работы.",
    },
    {
      title: "Итог",
      description: "Снижение энергопотребления на 35%, увеличение производительности до проектных показателей. Срок окупаемости проекта составил 18 месяцев. Гарантийное обслуживание на 3 года.",
    },
  ],
};

const ProjectDetail = () => {
  const { id } = useParams();

  return (
    <div className="min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-muted/50 py-4">
        <div className="container">
          <Link 
            to="/projects" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Назад к проектам
          </Link>
        </div>
      </div>

      {/* Hero Image */}
      <div className="relative h-[400px] overflow-hidden">
        <img
          src={mockProject.image}
          alt={mockProject.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="container">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {mockProject.name}
            </h1>
            <div className="flex flex-wrap gap-4 text-white/90">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <span>{mockProject.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                <span>{mockProject.location}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Project Info */}
      <div className="container py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Client */}
          <div className="bg-card rounded-lg p-6 border">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Building2 className="w-5 h-5 text-primary" />
              </div>
              <span className="text-sm text-muted-foreground">Заказчик</span>
            </div>
            <p className="font-semibold text-lg">{mockProject.client}</p>
          </div>

          {/* Equipment Type */}
          <div className="bg-card rounded-lg p-6 border">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Cog className="w-5 h-5 text-primary" />
              </div>
              <span className="text-sm text-muted-foreground">Тип оборудования</span>
            </div>
            <p className="font-semibold text-lg">{mockProject.equipmentType}</p>
          </div>

          {/* Services */}
          <div className="bg-card rounded-lg p-6 border">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Wrench className="w-5 h-5 text-primary" />
              </div>
              <span className="text-sm text-muted-foreground">Услуги</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {mockProject.services.map((service, index) => (
                <Badge key={index} variant="secondary">
                  {service}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {/* Development Stages */}
        <div>
          <h2 className="text-2xl font-bold mb-8 text-center">Этапы реализации</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {mockProject.stages.map((stage, index) => (
              <div 
                key={index} 
                className="relative bg-card rounded-lg p-6 border"
              >
                {/* Stage Number */}
                <div className="absolute -top-4 left-6 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
                  {index + 1}
                </div>
                <h3 className="text-xl font-semibold mb-4 mt-2">{stage.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {stage.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
