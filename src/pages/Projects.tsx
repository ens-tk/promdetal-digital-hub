import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "@/lib/api";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Building2 } from "lucide-react";

/* ===== TYPES ===== */
interface CaseImage {
  path: string;
}

interface ProjectCase {
  id: number;
  equipmentId: number;
  equipmentTitle: string;
  customer: string;
  deliveryDate: string;
  equipmentType: string;
  purpose1?: string;
  purpose2?: string;
  purpose3?: string;
  image?: CaseImage;
}

/* ===== COMPONENT ===== */
const Projects = () => {
  const [cases, setCases] = useState<ProjectCase[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/cases")
      .then((res) => {
        const data = Array.isArray(res.data) ? res.data : [];
        setCases(data);
      })
      .catch((err) => {
        console.error("Ошибка загрузки кейсов:", err);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="bg-industrial-dark text-background py-12">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Реализованные проекты
          </h1>
          <p className="text-lg text-background/80">
            Примеры нашей работы и успешно выполненных заказов
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="container py-12">
        {loading && <p>Загрузка...</p>}

        {!loading && cases.length === 0 && (
          <p className="text-muted-foreground">Проекты не найдены</p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cases.map((project) => (
            <Link key={project.id} to={`/projects/${project.id}`}>
              <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full">
                <img
                  src={project.image?.path || "/placeholder.svg"}
                  alt={project.equipmentTitle}
                  className="w-full h-48 object-cover"
                />

                <div className="p-6">
                  <Badge className="mb-2">
                    {project.equipmentType}
                  </Badge>

                  <h3 className="font-semibold text-xl mb-2">
                    {project.equipmentTitle}
                  </h3>

                  <p className="text-sm text-muted-foreground mb-4">
                    {[project.purpose1, project.purpose2, project.purpose3]
                      .filter(Boolean)
                      .join(" • ")}
                  </p>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Building2 className="h-4 w-4" />
                      <span>{project.customer}</span>
                    </div>

                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>
                        {new Date(project.deliveryDate).toLocaleDateString(
                          "ru-RU",
                          { year: "numeric", month: "long" }
                        )}
                      </span>
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
