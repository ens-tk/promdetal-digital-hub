import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Settings, Wrench, Cpu, Factory } from "lucide-react";

const categories = [
  {
    id: 1,
    name: "Станки и оборудование",
    icon: Settings,
    count: 45,
    slug: "machines",
  },
  {
    id: 2,
    name: "Инструменты",
    icon: Wrench,
    count: 120,
    slug: "tools",
  },
  {
    id: 3,
    name: "Автоматизация",
    icon: Cpu,
    count: 32,
    slug: "automation",
  },
  {
    id: 4,
    name: "Производственные линии",
    icon: Factory,
    count: 18,
    slug: "lines",
  },
];

const EquipmentCategories = () => {
  return (
    <section className="py-16">
      <div className="container">
        <h2 className="text-3xl md:text-4xl font-bold mb-8">Категории оборудования</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Link key={category.id} to={`/equipment/category/${category.slug}`}>
                <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer group">
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className="p-4 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">{category.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {category.count} позиций
                      </p>
                    </div>
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default EquipmentCategories;
