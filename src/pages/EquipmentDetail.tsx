import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const mockEquipmentDetail = {
  id: 1,
  name: "Токарный станок CNC-2000",
  category: "Станки",
  shortDescription: "Высокоточный токарный станок с числовым программным управлением",
  fullDescription: "Полное описание оборудования с техническими характеристиками, возможностями и преимуществами использования в промышленном производстве.",
  images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
  advantages: [
    { image: "/placeholder.svg", text: "Высокая точность обработки" },
    { image: "/placeholder.svg", text: "Автоматизированное управление" },
    { image: "/placeholder.svg", text: "Энергоэффективность" },
  ],
  specifications: {
    "Максимальный диаметр обработки": "200 мм",
    "Длина обработки": "500 мм",
    "Мощность двигателя": "5.5 кВт",
    "Точность позиционирования": "±0.005 мм",
  },
};

const relatedEquipment = [
  { id: 2, name: "Фрезерный станок FRS-500", image: "/placeholder.svg" },
  { id: 3, name: "Промышленный робот ARM-X", image: "/placeholder.svg" },
];

const EquipmentDetail = () => {
  const { id } = useParams();

  return (
    <div className="min-h-screen">
      <div className="container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Images */}
          <div className="space-y-4">
            <img
              src={mockEquipmentDetail.images[0]}
              alt={mockEquipmentDetail.name}
              className="w-full h-96 object-cover rounded-lg"
            />
            <div className="grid grid-cols-3 gap-4">
              {mockEquipmentDetail.images.slice(1).map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`${mockEquipmentDetail.name} ${idx + 2}`}
                  className="w-full h-24 object-cover rounded-lg cursor-pointer hover:opacity-80"
                />
              ))}
            </div>
          </div>

          {/* Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">
                {mockEquipmentDetail.name}
              </h1>
              <p className="text-muted-foreground">{mockEquipmentDetail.category}</p>
            </div>

            <p className="text-lg">{mockEquipmentDetail.shortDescription}</p>

            <div className="flex gap-4">
              <Button size="lg">Запросить цену</Button>
              <Button size="lg" variant="outline">Задать вопрос</Button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="description" className="mb-12">
          <TabsList>
            <TabsTrigger value="description">Описание</TabsTrigger>
            <TabsTrigger value="specs">Характеристики</TabsTrigger>
            <TabsTrigger value="advantages">Преимущества</TabsTrigger>
          </TabsList>

          <TabsContent value="description" className="mt-6">
            <p className="text-lg leading-relaxed">{mockEquipmentDetail.fullDescription}</p>
          </TabsContent>

          <TabsContent value="specs" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(mockEquipmentDetail.specifications).map(([key, value]) => (
                <div key={key} className="p-4 border rounded-lg">
                  <p className="text-sm text-muted-foreground mb-1">{key}</p>
                  <p className="font-semibold">{value}</p>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="advantages" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {mockEquipmentDetail.advantages.map((adv, idx) => (
                <Card key={idx} className="p-6 text-center">
                  <img
                    src={adv.image}
                    alt={adv.text}
                    className="w-full h-32 object-cover rounded mb-4"
                  />
                  <p className="font-semibold">{adv.text}</p>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Related Equipment */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Вам также может быть интересно</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedEquipment.map((item) => (
              <Link key={item.id} to={`/equipment/${item.id}`}>
                <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold">{item.name}</h3>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EquipmentDetail;
