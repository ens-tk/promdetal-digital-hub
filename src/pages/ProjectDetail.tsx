import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { api } from "@/lib/api";
import { ArrowLeft, Calendar, MapPin, Building2, Wrench, Cog } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ProjectStage {
  title: string;
  description: string;
}

interface Project {
  id: string;
  name: string;
  date: string;
  imageId?: string;
  client: string;
  location: string;
  equipmentType: string;
  services: string[];
  stages: ProjectStage[];
}

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  const getFileUrl = (id?: string) => {
    if (!id) return "/placeholder.svg";
    return `${api.defaults.baseURL}/Files/${id}`;
  };

  useEffect(() => {
    if (!id) return;

    api.get(`/cases/${id}`)
      .then(res => {
        const data = res.data;
        // Преобразуем данные под наш интерфейс
        const projectData: Project = {
          id: data.id,
          name: data.title,
          date: data.year ? String(data.year) : "-",
          imageId: data.imageId,
          client: data.customer || "-",
          location: data.city || "-",
          equipmentType: data.equipmentType || "-",
          services: data.services ? data.services.split(",") : [],
          stages: [
            { title: "Проблема", description: data.problem || "-" },
            { title: "Решение", description: data.solution || "-" },
            { title: "Итог", description: data.result || "-" },
          ],
        };
        setProject(projectData);
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="p-8 text-center">Загрузка...</div>;
  if (!project) return <div className="p-8 text-center">Проект не найден</div>;

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
          src={getFileUrl(project.imageId)}
          alt={project.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="container">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {project.name}
            </h1>
            <div className="flex flex-wrap gap-4 text-white/90">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <span>{project.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                <span>{project.location}</span>
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
            <p className="font-semibold text-lg">{project.client}</p>
          </div>

          {/* Equipment Type */}
          <div className="bg-card rounded-lg p-6 border">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Cog className="w-5 h-5 text-primary" />
              </div>
              <span className="text-sm text-muted-foreground">Тип оборудования</span>
            </div>
            <p className="font-semibold text-lg">{project.equipmentType}</p>
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
              {project.services.map((service, index) => (
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
            {project.stages.map((stage, index) => (
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
