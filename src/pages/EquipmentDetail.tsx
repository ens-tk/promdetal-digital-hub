import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { api } from "@/lib/api";
import { getIconById } from "@/components/admin/EquipmentIconPicker";

interface Advantage {
  id: number;
  iconId?: string;
  text: string;
}

interface Hotspot {
  id: number;
  x: number;
  y: number;
  text: string;
}

interface Project {
  id: number;
  image: string;
  year: number;
  location: string;
}

interface Equipment {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  mainImageId?: string | null;
  hotspotImageId?: string | null;
  advantages: Advantage[];
  hotspots: Hotspot[];
  videoUrl?: string;
  completedProjects?: Project[];
}

/* ===================== HELPERS ===================== */
const getRutubeEmbedUrl = (url?: string) => {
  if (!url) return null;
  if (/^[a-zA-Z0-9]+$/.test(url)) return `https://rutube.ru/play/embed/${url}`;
  const match = url.match(/rutube\.ru\/video\/([a-zA-Z0-9]+)/);
  return match ? `https://rutube.ru/play/embed/${match[1]}` : null;
};

const getFileUrl = (id?: string) =>
  id ? `http://localhost:8080/promdetal/api/Files/${id}` : "/placeholder.svg";

/* ===================== COMPONENT ===================== */
const EquipmentDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [equipment, setEquipment] = useState<Equipment | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeHotspot, setActiveHotspot] = useState<Hotspot | null>(null);

  const [mainImageUrl, setMainImageUrl] = useState<string | null>(null);
  const [hotspotImageUrl, setHotspotImageUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const loadEquipment = async () => {
      try {
        const { data } = await api.get<Equipment>(`/equipment/${id}`);
        setEquipment(data);

        // Подгружаем основное изображение
        if (data.mainImageId) {
          const res = await api.get(`/Files/${data.mainImageId}`, {
            responseType: "blob",
          });
          setMainImageUrl(URL.createObjectURL(res.data));
        }

        // Подгружаем изображение для hotspot
        if (data.hotspotImageId) {
          const res = await api.get(`/Files/${data.hotspotImageId}`, {
            responseType: "blob",
          });
          setHotspotImageUrl(URL.createObjectURL(res.data));
        }
      } catch (e) {
        console.error(e);
        setError("Не удалось загрузить оборудование");
      } finally {
        setLoading(false);
      }
    };

    loadEquipment();
  }, [id]);

  if (loading) return <div className="container py-8">Загрузка…</div>;
  if (error) return <div className="container py-8 text-red-500">{error}</div>;
  if (!equipment) return null;

  const embedUrl = getRutubeEmbedUrl(equipment.videoUrl);

  return (
    <div className="min-h-screen">
      <div className="container py-8">
        {/* HERO */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="aspect-[4/3] rounded-lg overflow-hidden bg-muted">
            {mainImageUrl && (
              <img
                src={mainImageUrl}
                alt={equipment.title}
                className="w-full h-full object-cover"
              />
            )}
          </div>
          <div className="flex flex-col justify-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              {equipment.title}
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {equipment.shortDescription}
            </p>
          </div>
        </div>

        {/* ADVANTAGES */}
        {equipment.advantages.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Преимущества</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {equipment.advantages.map((adv) => {
                const IconComponent = adv.iconId ? getIconById(adv.iconId)?.icon : null;
                return (
                  <div key={adv.id} className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-lg bg-muted flex items-center justify-center">
                      {IconComponent ? (
                        <IconComponent className="w-6 h-6 text-primary" />
                      ) : (
                        <div className="w-4 h-4 bg-muted-foreground rounded" />
                      )}
                    </div>
                    <p className="text-sm font-medium">{adv.text}</p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* DESCRIPTION */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Описание</h2>
          <div className="columns-1 md:columns-2 gap-8 text-muted-foreground leading-relaxed">
            {equipment.fullDescription?.split("\n\n").map((paragraph, idx) => (
              <p key={idx} className="mb-4 break-inside-avoid">
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        {/* INTERACTIVE SCHEME */}
        {hotspotImageUrl && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Интерактивная схема</h2>
            <div className="relative aspect-[16/9] rounded-lg overflow-hidden bg-muted">
              <img
                src={hotspotImageUrl}
                alt="Интерактивная схема"
                className="w-full h-full object-cover"
              />
              {equipment.hotspots.map((hotspot) => (
                <button
                  key={hotspot.id}
                  className={`absolute w-8 h-8 rounded-full border-2 border-primary bg-primary/20 hover:bg-primary/40 transition-all
                    ${activeHotspot?.id === hotspot.id ? "bg-primary scale-110" : ""}`}
                  style={{
                    left: `${hotspot.x}%`,
                    top: `${hotspot.y}%`,
                    transform: "translate(-50%, -50%)",
                  }}
                  onClick={() =>
                    setActiveHotspot(
                      activeHotspot?.id === hotspot.id ? null : hotspot
                    )
                  }
                >
                  <span className="w-3 h-3 rounded-full bg-primary animate-pulse" />
                </button>
              ))}
              {activeHotspot && (
                <div
                  className="absolute bg-background/95 border rounded-lg p-4 max-w-xs shadow-lg z-10"
                  style={{
                    left: `${Math.min(Math.max(activeHotspot.x, 15), 85)}%`,
                    top: `${activeHotspot.y + 8}%`,
                    transform: "translateX(-50%)",
                  }}
                >
                  <p className="text-sm">{activeHotspot.text}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* VIDEO */}
        {embedUrl && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Видео</h2>
            <div className="relative aspect-video rounded-lg overflow-hidden bg-muted">
              <iframe
                src={embedUrl}
                title="Видео"
                frameBorder="0"
                allow="autoplay; encrypted-media"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            </div>
          </div>
        )}

        {/* PROJECTS */}
        {equipment.completedProjects && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Реализованные проекты</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {equipment.completedProjects.map((project) => (
                <Link key={project.id} to={`/projects/${project.id}`}>
                  <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="aspect-[4/3]">
                      <img
                        src={project.image}
                        alt={`Проект ${project.year}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <p className="font-bold text-lg">{project.year}</p>
                      <p className="text-sm text-muted-foreground">
                        {project.location}
                      </p>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EquipmentDetail;
