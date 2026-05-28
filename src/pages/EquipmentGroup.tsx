import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { api } from "@/lib/api";
import { Card } from "@/components/ui/card";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface Group {
  id: number;
  title: string;
  description: string;
  coverImage?: { id: string } | null;
}

interface Equipment {
  id: string;
  title: string;
  shortDescription: string;
  mainImageId?: string | null;
}

const getFileUrl = (id?: string | null) =>
  id ? `http://157.22.174.170:8080/promdetal/api/Files/${id}` : "/placeholder.svg";

const EquipmentGroup = () => {
  const { id } = useParams<{ id: string }>();
  const [group, setGroup] = useState<Group | null>(null);
  const [equipment, setEquipment] = useState<Equipment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const load = async () => {
      try {
        const [groupRes, eqRes] = await Promise.all([
          api.get(`/groups/${id}`),
          api.get("/equipment", { params: { groupId: id } }),
        ]);

        setGroup(groupRes.data);
        setEquipment(Array.isArray(eqRes.data) ? eqRes.data : []);
      } catch {
        setError("Не удалось загрузить данные группы");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Загрузка...</p>
      </div>
    );
  }

  if (error || !group) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-destructive">{error ?? "Группа не найдена"}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="relative bg-industrial-dark text-background">
        {group.coverImage?.id && (
          <img
            src={getFileUrl(group.coverImage.id)}
            alt={group.title}
            className="absolute inset-0 w-full h-full object-cover opacity-25"
          />
        )}
        <div className="relative container py-16">
          <Link
            to="/equipment"
            className="inline-flex items-center gap-2 text-background/70 hover:text-background text-sm mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Все группы
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{group.title}</h1>
          {group.description && (
            <div
              className="text-lg text-background/80 max-w-2xl"
              dangerouslySetInnerHTML={{ __html: group.description }}
            />
          )}
        </div>
      </div>

      {/* Equipment grid */}
      <div className="container py-12">
        <h2 className="text-2xl font-bold mb-8">
          Оборудование{" "}
          <span className="text-muted-foreground font-normal text-lg">
            ({equipment.length})
          </span>
        </h2>

        {equipment.length === 0 ? (
          <p className="text-muted-foreground">В этой группе пока нет оборудования</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {equipment.map((item) => (
              <Link key={item.id} to={`/equipment/${item.id}`}>
                <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col group">
                  <div className="relative h-48 bg-muted overflow-hidden">
                    <img
                      src={getFileUrl(item.mainImageId)}
                      alt={item.title}
                      className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="font-semibold text-base mb-2 leading-snug">
                      {item.title}
                    </h3>
                    {item.shortDescription && (
                      <p className="text-sm text-muted-foreground line-clamp-3 flex-1">
                        {item.shortDescription}
                      </p>
                    )}
                    <span className="mt-4 inline-flex items-center gap-1 text-sm text-primary font-medium">
                      Подробнее <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EquipmentGroup;
