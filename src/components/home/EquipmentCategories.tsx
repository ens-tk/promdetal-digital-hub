"use client";

import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";

/* ===== TYPES ===== */
interface Group {
  id: number;
  title: string;
  description: string;
  coverImage?: {
    id: string;
  };
}

interface Equipment {
  id: number;
  title: string;
  groupId: number;
  mainImageId?: string;
}

/* ===== COMPONENT ===== */
const EquipmentCategories = () => {
  const [groups, setGroups] = useState<Group[]>([]);
  const [equipment, setEquipment] = useState<Record<number, Equipment[]>>({});
  const [activeGroupId, setActiveGroupId] = useState<number | null>(null);

  useEffect(() => {
    const loadData = async () => {
      const groupsRes = await api.get("/groups");
      console.log("GROUPS FROM BACK:", groupsRes.data);
      const groupsData: Group[] = groupsRes.data || [];

      setGroups(groupsData);

      if (groupsData.length) {
        setActiveGroupId(groupsData[0].id);
      }

      const eqMap: Record<number, Equipment[]> = {};

      await Promise.all(
        groupsData.map(async (group) => {
          const eqRes = await api.get("/equipment", {
            params: { groupId: group.id },
          });
          eqMap[group.id] = eqRes.data || [];
        })
      );

      setEquipment(eqMap);
    };

    loadData().catch(console.error);
  }, []);

  const getImageUrl = (id?: string | null) =>
  id ? `${api.defaults.baseURL}/Files/${id}` : "/placeholder.svg";

  const activeGroup = groups.find((g) => g.id === activeGroupId);

  if (!groups.length || !activeGroup) return null;

  return (
    <section className="py-16 bg-muted/30">
      <div className="container">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-2xl md:text-3xl font-bold">
            Продукты и решения
          </h2>
          <Link
            to="/equipment"
            className="group inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary"
          >
            Весь каталог
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        <div className="flex gap-8 md:gap-12">
          {/* LEFT — Groups */}
          <div className="relative flex-shrink-0">
            <div className="absolute left-3 top-0 bottom-0 w-px bg-border" />

            <div className="space-y-6">
              {groups.map((group) => (
                <button
                  key={group.id}
                  onClick={() => setActiveGroupId(group.id)}
                  className={`relative flex items-center gap-4 text-left transition-all ${
                    activeGroupId === group.id
                      ? ""
                      : "opacity-60 hover:opacity-100"
                  }`}
                >
                  <div
                    className={`relative z-10 w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      activeGroupId === group.id
                        ? "bg-primary border-primary"
                        : "bg-background border-border"
                    }`}
                  >
                    <div
                      className={`w-2 h-2 rounded-full ${
                        activeGroupId === group.id
                          ? "bg-primary-foreground"
                          : "bg-muted-foreground"
                      }`}
                    />
                  </div>

                  <div>
                    <span className="font-semibold text-base md:text-lg">
                      {group.title}
                    </span>
                    {activeGroupId === group.id && (
                      <div
  className="text-sm text-muted-foreground mt-1 max-w-[280px]"
  dangerouslySetInnerHTML={{ __html: group.description || "" }}
/>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT — Equipment */}
          <div className="flex-1 min-w-0">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {equipment[activeGroup.id]?.map((item, index) => (
                <Link
                  key={item.id}
                  to={`/equipment/${item.id}`}
                  className="group/card"
                >
                  <div className="aspect-[4/3] rounded-lg overflow-hidden bg-muted mb-2">
                    <img
                      src={getImageUrl(item.mainImageId)}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover/card:scale-105 transition-transform"
                    />
                  </div>
                  <span className="text-sm font-medium group-hover/card:text-primary">
                    {item.title}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EquipmentCategories;
