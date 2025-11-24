import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const mockProjects = [
  {
    id: 1,
    title: "Автоматизированная линия для завода",
    description: "Комплексное решение для производства деталей",
    image: "/placeholder.svg",
  },
  {
    id: 2,
    title: "Промышленное оборудование для металлообработки",
    description: "Высокоточное оборудование для точной обработки",
    image: "/placeholder.svg",
  },
  {
    id: 3,
    title: "Система автоматизации склада",
    description: "Современные решения для логистики",
    image: "/placeholder.svg",
  },
];

const HeroCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % mockProjects.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + mockProjects.length) % mockProjects.length);
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-[500px] overflow-hidden rounded-lg bg-muted">
      {mockProjects.map((project, index) => (
        <div
          key={project.id}
          className={`absolute inset-0 transition-opacity duration-500 ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="relative h-full w-full">
            <img
              src={project.image}
              alt={project.title}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-industrial-dark/80 to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-center px-12 text-background">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 max-w-2xl">
                {project.title}
              </h2>
              <p className="text-lg md:text-xl mb-6 max-w-xl text-background/90">
                {project.description}
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
        {mockProjects.map((_, index) => (
          <button
            key={index}
            className={`h-2 rounded-full transition-all ${
              index === currentIndex ? "w-8 bg-background" : "w-2 bg-background/50"
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;
