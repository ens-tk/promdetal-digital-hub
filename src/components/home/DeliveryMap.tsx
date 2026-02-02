import { useEffect, useRef } from "react";
import { MapPin } from "lucide-react";

declare global {
  interface Window {
    ymaps: any;
  }
}

const deliveries = [
  { id: 1, city: "Москва", count: 24, coords: [55.751244, 37.618423] },
  { id: 2, city: "Санкт-Петербург", count: 18, coords: [59.9342802, 30.3350986] },
  { id: 3, city: "Новосибирск", count: 12, coords: [55.008353, 82.935733] },
  { id: 4, city: "Екатеринбург", count: 15, coords: [56.838011, 60.597465] },
  { id: 5, city: "Казань", count: 8, coords: [55.796127, 49.106414] },
];

const DeliveryMap = () => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.ymaps || !mapRef.current) return;

    window.ymaps.ready(() => {
      const map = new window.ymaps.Map(mapRef.current, {
        center: [56.838011, 60.597465], // центр РФ
        zoom: 4,
        controls: ["zoomControl"],
      });

      deliveries.forEach((delivery) => {
        const placemark = new window.ymaps.Placemark(
          delivery.coords,
          {
            balloonContent: `
              <strong>${delivery.city}</strong><br/>
              Поставок: ${delivery.count}
            `,
          },
          {
            preset: "islands#redIcon",
          }
        );

        map.geoObjects.add(placemark);
      });
    });
  }, []);

  return (
    <section className="py-16">
      <div className="container">
        <h2 className="text-3xl md:text-4xl font-bold mb-8">
          География поставок
        </h2>

        {/* Map */}
        <div className="rounded-lg overflow-hidden border">
          <div
            ref={mapRef}
            className="w-full h-[400px]"
          />
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
