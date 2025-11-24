import { MapPin } from "lucide-react";

const deliveries = [
  { id: 1, city: "Москва", count: 24 },
  { id: 2, city: "Санкт-Петербург", count: 18 },
  { id: 3, city: "Новосибирск", count: 12 },
  { id: 4, city: "Екатеринбург", count: 15 },
  { id: 5, city: "Казань", count: 8 },
];

const DeliveryMap = () => {
  return (
    <section className="py-16">
      <div className="container">
        <h2 className="text-3xl md:text-4xl font-bold mb-8">География поставок</h2>
        <div className="rounded-lg bg-muted p-8 min-h-[400px] relative">
          {/* Placeholder for actual map - можно интегрировать Яндекс.Карты или аналог */}
          <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
            <div className="text-center">
              <MapPin className="h-16 w-16 mx-auto mb-4 text-primary" />
              <p className="text-lg">Карта поставок</p>
              <p className="text-sm">Интеграция с картами будет добавлена</p>
            </div>
          </div>
        </div>
        
        {/* Deliveries List */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-5 gap-4">
          {deliveries.map((delivery) => (
            <div
              key={delivery.id}
              className="p-4 rounded-lg bg-card border text-center"
            >
              <div className="flex items-center justify-center mb-2">
                <MapPin className="h-5 w-5 text-primary" />
              </div>
              <p className="font-semibold">{delivery.city}</p>
              <p className="text-sm text-muted-foreground">
                {delivery.count} поставок
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DeliveryMap;
