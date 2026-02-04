import { useEffect, useState, useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Search as SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { api } from "@/lib/api";

interface Equipment {
  id: number;
  title: string;
  slug: string;
  groupId: number;
  searchKeywords?: string;
  description?: string;
}

interface Group {
  id: number;
  title: string;
}

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [equipment, setEquipment] = useState<Equipment[]>([]);
  const [groups, setGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState(true);

  // Load all equipment and groups on mount
  useEffect(() => {
    const loadData = async () => {
      try {
        const [groupsRes, equipmentRes] = await Promise.all([
          api.get("/groups"),
          api.get("/equipment"),
        ]);

        setGroups(Array.isArray(groupsRes.data) ? groupsRes.data : []);
        setEquipment(Array.isArray(equipmentRes.data) ? equipmentRes.data : []);
      } catch (e) {
        console.error("Ошибка загрузки данных:", e);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Update URL when query changes
  useEffect(() => {
    if (query) {
      setSearchParams({ q: query });
    } else {
      setSearchParams({});
    }
  }, [query, setSearchParams]);

  // Filter equipment based on query
  const filteredEquipment = useMemo(() => {
    if (!query.trim()) return [];

    const lowerQuery = query.toLowerCase().trim();
    const queryWords = lowerQuery.split(/\s+/);

    return equipment.filter((item) => {
      const title = item.title?.toLowerCase() || "";
      const keywords = item.searchKeywords?.toLowerCase() || "";
      const description = item.description?.toLowerCase() || "";
      const searchableText = `${title} ${keywords} ${description}`;

      // Check if all query words are found in searchable text
      return queryWords.every((word) => searchableText.includes(word));
    });
  }, [query, equipment]);

  // Group results by equipment group
  const groupedResults = useMemo(() => {
    const grouped: Record<number, Equipment[]> = {};

    filteredEquipment.forEach((item) => {
      if (!grouped[item.groupId]) {
        grouped[item.groupId] = [];
      }
      grouped[item.groupId].push(item);
    });

    return grouped;
  }, [filteredEquipment]);

  const getGroupName = (groupId: number) => {
    return groups.find((g) => g.id === groupId)?.title || "Без категории";
  };

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="bg-industrial-dark text-background py-12">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Поиск оборудования
          </h1>
          <p className="text-lg text-background/80">
            Найдите нужное оборудование по названию или характеристикам
          </p>
        </div>
      </div>

      {/* Search Input */}
      <div className="container py-8">
        <div className="relative max-w-2xl mx-auto">
          <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Введите название оборудования..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-12 h-14 text-lg"
            autoFocus
          />
        </div>
      </div>

      {/* Results */}
      <div className="container pb-12">
        {loading && (
          <p className="text-center text-muted-foreground">Загрузка...</p>
        )}

        {!loading && query.trim() && filteredEquipment.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg mb-2">
              По запросу «{query}» ничего не найдено
            </p>
            <p className="text-sm text-muted-foreground">
              Попробуйте изменить запрос или использовать другие ключевые слова
            </p>
          </div>
        )}

        {!loading && !query.trim() && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              Начните вводить запрос для поиска оборудования
            </p>
          </div>
        )}

        {!loading && filteredEquipment.length > 0 && (
          <div className="space-y-8">
            <p className="text-sm text-muted-foreground">
              Найдено: {filteredEquipment.length}{" "}
              {filteredEquipment.length === 1
                ? "результат"
                : filteredEquipment.length < 5
                ? "результата"
                : "результатов"}
            </p>

            {Object.entries(groupedResults).map(([groupId, items]) => (
              <div key={groupId}>
                <h2 className="text-lg font-semibold mb-4 text-foreground">
                  {getGroupName(Number(groupId))}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {items.map((item) => (
                    <Link
                      key={item.id}
                      to={`/equipment/${item.id}`}
                      className="block p-4 rounded-lg border bg-card hover:border-primary hover:shadow-md transition-all"
                    >
                      <h3 className="font-medium text-foreground mb-1">
                        {item.title}
                      </h3>
                      {item.description && (
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {item.description}
                        </p>
                      )}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
