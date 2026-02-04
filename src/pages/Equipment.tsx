import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "@/lib/api";

/* ====== TYPES ====== */
interface Equipment {
  id: number;
  title: string;
  slug: string;
  groupId: number;
}

interface Group {
  id: number;
  title: string;
  description: string;
  coverImage?: {
    path: string;
    id: string;
  };
}

/* ====== COMPONENT ====== */
const EquipmentPage = () => {
  const [groups, setGroups] = useState<Group[]>([]);
  const [equipmentByGroup, setEquipmentByGroup] = useState<Record<number, Equipment[]>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        /* 1️⃣ Получаем группы */
        const groupsRes = await api.get("/groups");
        const groupsArray: Group[] = Array.isArray(groupsRes.data)
          ? groupsRes.data
          : [];

        setGroups(groupsArray);

        /* 2️⃣ Для каждой группы получаем оборудование */
        const equipmentMap: Record<number, Equipment[]> = {};

        await Promise.all(
          groupsArray.map(async (group) => {
            const eqRes = await api.get("/equipment", {
              params: { groupId: group.id },
            });

            equipmentMap[group.id] = Array.isArray(eqRes.data) ? eqRes.data : [];
          })
        );

        setEquipmentByGroup(equipmentMap);
      } catch (e) {
        console.error("Ошибка загрузки оборудования:", e);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  /* ====== UI ====== */
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="bg-industrial-dark text-background py-12">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Продукты и решения
          </h1>
          <p className="text-lg text-background/80">
            Комплексные решения для промышленных предприятий
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="container py-12">
        {loading && <p>Загрузка...</p>}

        {!loading && groups.length === 0 && (
          <p className="text-muted-foreground">Группы не найдены</p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {groups.map((group) => (
            <div key={group.id} className="group">
              {/* Group Card */}
              <Link to={`/equipment/group/${group.id}`} className="block">
                <div className="relative h-52 rounded-lg overflow-hidden mb-4">
                  <img
  src={group.coverImage?.id ? `${api.defaults.baseURL}/Files/${group.coverImage.id}` : "/placeholder.svg"}
  alt={group.title}
  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
/>

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <h3 className="text-white font-bold text-xl mb-1">
                      {group.title}
                    </h3>
                    <div 
  className="text-white/80 text-sm" 
  dangerouslySetInnerHTML={{ __html: group.description || "" }}
/>
                  </div>
                </div>
              </Link>

              {/* Equipment list (solutions) */}
              <div className="space-y-1.5 pl-1">
                {equipmentByGroup[group.id]?.map((eq) => (
                  <Link
                    key={eq.id}
                    to={`/equipment/${eq.id}`}
                    className="block text-sm text-muted-foreground hover:text-primary transition-colors py-0.5"
                  >
                    {eq.title}
                  </Link>
                ))}

                {equipmentByGroup[group.id]?.length === 0 && (
                  <span className="text-sm text-muted-foreground">
                    Нет оборудования
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EquipmentPage;
