import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Building2 } from "lucide-react";

const mockProjects = [
  {
    id: 1,
    title: "Автоматизация производственной линии",
    client: "ООО \"ПромТех\"",
    date: "Октябрь 2024",
    category: "Автоматизация",
    description: "Комплексная автоматизация линии по производству деталей",
    image: "/placeholder.svg",
  },
  {
    id: 2,
    title: "Поставка фрезерных станков",
    client: "ЗАО \"МеталлПром\"",
    date: "Сентябрь 2024",
    category: "Станки",
    description: "Поставка и настройка 5 единиц фрезерного оборудования",
    image: "/placeholder.svg",
  },
  {
    id: 3,
    title: "Модернизация цеха",
    client: "АО \"ТехМаш\"",
    date: "Август 2024",
    category: "Модернизация",
    description: "Полная модернизация производственного цеха",
    image: "/placeholder.svg",
  },
];

const Projects = () => {
  return (
    <div className="min-h-screen">
      <div className="bg-industrial-dark text-background py-12">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Реализованные проекты</h1>
          <p className="text-lg text-background/80">
            Примеры нашей работы и успешно выполненных заказов
          </p>
        </div>
      </div>

      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockProjects.map((project) => (
            <Link key={project.id} to={`/projects/${project.id}`}>
              <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <Badge className="mb-2">{project.category}</Badge>
                  <h3 className="font-semibold text-xl mb-2">{project.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {project.description}
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Building2 className="h-4 w-4" />
                      <span>{project.client}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>{project.date}</span>
                    </div>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;
