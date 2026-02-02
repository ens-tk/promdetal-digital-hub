import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/api";

interface EquipmentItem {
  id: number;
  title: string;
  shortDescription: string;
  imageIds: string[];
}

const HeroCarousel = () => {
  const [items, setItems] = useState<EquipmentItem[]>([]);
  const [images, setImages] = useState<Record<number, string>>({});
  const [currentIndex, setCurrentIndex] = useState(0);

  // ------------------------
  // Load equipment for main
  // ------------------------
  const loadEquipment = async () => {
    try {
      const res = await api.get("/equipment/main");
      const data: EquipmentItem[] = Array.isArray(res.data) ? res.data : [];
      setItems(data);

      // Загружаем первую картинку
      data.forEach(async (item) => {
        const imageId = item.imageIds?.[0];
        if (imageId && !images[item.id]) {
          const imgRes = await api.get(`/Files/${imageId}`, {
            responseType: "blob",
          });
          const url = URL.createObjectURL(imgRes.data);
          setImages((prev) => ({ ...prev, [item.id]: url }));
        }
      });
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadEquipment();
  }, []);

  // ------------------------
  // Slider logic
  // ------------------------
  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  useEffect(() => {
    if (!items.length) return;
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [items]);

  if (!items.length) return null;

  // ------------------------
  // Render
  // ------------------------
  return (
    <div className="relative w-full h-[500px] overflow-hidden rounded-lg bg-muted">
      {items.map((item, index) => (
        <div
          key={item.id}
          className={`absolute inset-0 transition-opacity duration-500 ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="relative h-full w-full">
            <img
              src={images[item.id] || "/placeholder.svg"}
              alt={item.title}
              className="h-full w-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-r from-industrial-dark/80 to-transparent" />

            <div className="absolute inset-0 flex flex-col justify-center px-12 text-background">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 max-w-2xl">
                {item.title}
              </h2>
              <p className="text-lg md:text-xl mb-6 max-w-xl text-background/90">
                {item.shortDescription}
              </p>
              <Button className="w-fit">Подробнее</Button>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/20 hover:bg-background/40 text-background"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/20 hover:bg-background/40 text-background"
        onClick={nextSlide}
      >
        <ChevronRight className="h-6 w-6" />
      </Button>

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {items.map((_, index) => (
          <button
            key={index}
            className={`h-2 rounded-full transition-all ${
              index === currentIndex
                ? "w-8 bg-background"
                : "w-2 bg-background/50"
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;
