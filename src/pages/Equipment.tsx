import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const mockEquipment = [
  {
    id: 1,
    name: "Токарный станок CNC-2000",
    category: "Станки",
    shortDescription: "Высокоточный токарный станок с числовым программным управлением",
    image: "/placeholder.svg",
    price: "По запросу",
  },
  {
    id: 2,
    name: "Фрезерный станок FRS-500",
    category: "Станки",
    shortDescription: "Универсальный фрезерный станок для обработки металлов",
    image: "/placeholder.svg",
    price: "По запросу",
  },
  {
    id: 3,
    name: "Промышленный робот ARM-X",
    category: "Автоматизация",
    shortDescription: "Роботизированная система для автоматизации производства",
    image: "/placeholder.svg",
    price: "По запросу",
  },
];

const Equipment = () => {
  return (
    <div className="min-h-screen">
      <div className="bg-industrial-dark text-background py-12">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Оборудование</h1>
          <p className="text-lg text-background/80">
            Каталог промышленного оборудования и инструментов
          </p>
        </div>
      </div>

      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockEquipment.map((item) => (
            <Link key={item.id} to={`/equipment/${item.id}`}>
              <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <Badge className="mb-2">{item.category}</Badge>
                  <h3 className="font-semibold text-xl mb-2">{item.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {item.shortDescription}
                  </p>
                  <p className="text-primary font-semibold">{item.price}</p>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Equipment;
