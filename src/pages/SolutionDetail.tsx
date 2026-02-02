import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Card } from "@/components/ui/card";

interface Hotspot {
  id: number;
  x: number;
  y: number;
  text: string;
}

const mockSolution = {
  id: 1,
  name: "Автоматизированная линия сборки",
  description: "Высокопроизводительная автоматизированная линия для сборки промышленных компонентов с интегрированной системой контроля качества.",
  image: "/placeholder.svg",
  youtubeVideoId: "dQw4w9WgXcQ", // YouTube video ID
  advantages: [
    { image: "/placeholder.svg", text: "Повышение производительности до 300%" },
    { image: "/placeholder.svg", text: "Снижение брака на 95%" },
    { image: "/placeholder.svg", text: "Автоматический контроль качества" },
    { image: "/placeholder.svg", text: "Энергоэффективность класса A+" },
    { image: "/placeholder.svg", text: "Минимальное обслуживание" },
    { image: "/placeholder.svg", text: "Гарантия 5 лет" },
  ],
  fullDescription: `Наша автоматизированная линия сборки представляет собой комплексное решение для современного производства. Система включает в себя передовые технологии машинного зрения, роботизированные манипуляторы и интеллектуальную систему управления.

Линия способна обрабатывать широкий спектр компонентов различных размеров и конфигураций. Встроенная система контроля качества обеспечивает 100% проверку каждого изделия на соответствие заданным параметрам.

Модульная конструкция позволяет легко масштабировать производство и адаптировать линию под изменяющиеся требования. Система управления обеспечивает полную прослеживаемость каждого этапа производственного процесса.

Интеграция с существующими ERP и MES системами позволяет обеспечить бесшовное взаимодействие с другими производственными процессами предприятия.`,
  coverImage: {
    id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    path: "/placeholder.svg",
    hotspots: [
      { id: 1, x: 20, y: 30, text: "Система подачи материалов с автоматической загрузкой" },
      { id: 2, x: 45, y: 50, text: "Роботизированный манипулятор высокой точности" },
      { id: 3, x: 70, y: 40, text: "Станция контроля качества с машинным зрением" },
      { id: 4, x: 85, y: 70, text: "Конвейерная система с регулируемой скоростью" },
    ],
  },
  completedProjects: [
    { id: 1, image: "/placeholder.svg", year: 2024, location: "Москва, Россия" },
    { id: 2, image: "/placeholder.svg", year: 2023, location: "Санкт-Петербург, Россия" },
    { id: 3, image: "/placeholder.svg", year: 2023, location: "Казань, Россия" },
    { id: 4, image: "/placeholder.svg", year: 2022, location: "Екатеринбург, Россия" },
  ],
};

const SolutionDetail = () => {
  const { id } = useParams();
  const [activeHotspot, setActiveHotspot] = useState<Hotspot | null>(null);

  return (
    <div className="min-h-screen">
      <div className="container py-8">
        {/* Hero Section - Image and Title */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="aspect-[4/3] rounded-lg overflow-hidden">
            <img
              src={mockSolution.image}
              alt={mockSolution.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col justify-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              {mockSolution.name}
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {mockSolution.description}
            </p>
          </div>
        </div>

        {/* Advantages Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Преимущества</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockSolution.advantages.map((advantage, idx) => (
              <div key={idx} className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-muted">
                  <img
                    src={advantage.image}
                    alt={advantage.text}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-sm font-medium">{advantage.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Full Description - Two Columns */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Описание</h2>
          <div className="columns-1 md:columns-2 gap-8 text-muted-foreground leading-relaxed">
            {mockSolution.fullDescription.split('\n\n').map((paragraph, idx) => (
              <p key={idx} className="mb-4 break-inside-avoid">
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        {/* Interactive Image with Hotspots */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Интерактивная схема</h2>
          <div className="relative aspect-[16/9] rounded-lg overflow-hidden bg-muted">
            <img
              src={mockSolution.coverImage.path}
              alt="Интерактивная схема"
              className="w-full h-full object-cover"
            />
            {mockSolution.coverImage.hotspots.map((hotspot) => (
              <button
                key={hotspot.id}
                className={`absolute w-8 h-8 rounded-full border-2 border-primary bg-primary/20 hover:bg-primary/40 transition-all cursor-pointer flex items-center justify-center ${
                  activeHotspot?.id === hotspot.id ? 'bg-primary scale-110' : ''
                }`}
                style={{
                  left: `${hotspot.x}%`,
                  top: `${hotspot.y}%`,
                  transform: 'translate(-50%, -50%)',
                }}
                onClick={() => setActiveHotspot(activeHotspot?.id === hotspot.id ? null : hotspot)}
              >
                <span className="w-3 h-3 rounded-full bg-primary animate-pulse" />
              </button>
            ))}
            
            {/* Hotspot Tooltip */}
            {activeHotspot && (
              <div
                className="absolute bg-background/95 backdrop-blur-sm border rounded-lg p-4 max-w-xs shadow-lg z-10"
                style={{
                  left: `${Math.min(Math.max(activeHotspot.x, 15), 85)}%`,
                  top: `${activeHotspot.y + 8}%`,
                  transform: 'translateX(-50%)',
                }}
              >
                <p className="text-sm">{activeHotspot.text}</p>
              </div>
            )}
          </div>
        </div>

        {/* YouTube Video Section */}
        {mockSolution.youtubeVideoId && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Видео</h2>
            <div className="relative aspect-video rounded-lg overflow-hidden bg-muted">
              <iframe
                src={`https://www.youtube.com/embed/${mockSolution.youtubeVideoId}`}
                title="YouTube video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            </div>
          </div>
        )}

        {/* Completed Projects */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Реализованные проекты</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {mockSolution.completedProjects.map((project) => (
              <Link key={project.id} to={`/projects/${project.id}`}>
                <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-[4/3]">
                    <img
                      src={project.image}
                      alt={`Проект ${project.year}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <p className="font-bold text-lg">{project.year}</p>
                    <p className="text-sm text-muted-foreground">{project.location}</p>
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

export default SolutionDetail;
