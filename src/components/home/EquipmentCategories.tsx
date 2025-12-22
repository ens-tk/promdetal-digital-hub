import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useState } from "react";

const productCategories = [
  {
    id: "pumps",
    name: "Насосное оборудование",
    description: "Надёжные решения для перекачки жидкостей различной вязкости",
    solutions: [
      { id: "centrifugal", name: "Центробежные насосы", image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=300&h=200&fit=crop" },
      { id: "submersible", name: "Погружные насосы", image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=300&h=200&fit=crop" },
      { id: "dosing", name: "Дозировочные насосы", image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=300&h=200&fit=crop" },
    ],
  },
  {
    id: "compressors",
    name: "Компрессорное оборудование",
    description: "Промышленные компрессоры для сжатия воздуха и газов",
    solutions: [
      { id: "screw", name: "Винтовые компрессоры", image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=300&h=200&fit=crop" },
      { id: "piston", name: "Поршневые компрессоры", image: "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=300&h=200&fit=crop" },
    ],
  },
  {
    id: "valves",
    name: "Трубопроводная арматура",
    description: "Запорная и регулирующая арматура для трубопроводов",
    solutions: [
      { id: "gate", name: "Задвижки", image: "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?w=300&h=200&fit=crop" },
      { id: "ball", name: "Шаровые краны", image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=300&h=200&fit=crop" },
      { id: "check", name: "Обратные клапаны", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop" },
    ],
  },
  {
    id: "drives",
    name: "Приводная техника",
    description: "Электродвигатели и редукторы для промышленного применения",
    solutions: [
      { id: "motors", name: "Электродвигатели", image: "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?w=300&h=200&fit=crop" },
      { id: "gearboxes", name: "Редукторы", image: "https://images.unsplash.com/photo-1537462715879-360eeb61a0ad?w=300&h=200&fit=crop" },
    ],
  },
];

const EquipmentCategories = () => {
  const [activeCategory, setActiveCategory] = useState(productCategories[0].id);
  
  const currentCategory = productCategories.find(c => c.id === activeCategory)!;

  return (
    <section className="py-16 bg-muted/30">
      <div className="container">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-2xl md:text-3xl font-bold">Продукты и решения</h2>
          <Link 
            to="/equipment" 
            className="group inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            Весь каталог
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
        
        {/* Timeline Layout */}
        <div className="flex gap-8 md:gap-12">
          {/* Left side - Timeline with categories */}
          <div className="relative flex-shrink-0">
            {/* Vertical line */}
            <div className="absolute left-3 top-0 bottom-0 w-px bg-border" />
            
            <div className="space-y-6">
              {productCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`relative flex items-center gap-4 text-left transition-all group ${
                    activeCategory === category.id ? '' : 'opacity-60 hover:opacity-100'
                  }`}
                >
                  {/* Dot */}
                  <div className={`relative z-10 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                    activeCategory === category.id 
                      ? 'bg-primary border-primary' 
                      : 'bg-background border-border group-hover:border-primary'
                  }`}>
                    <div className={`w-2 h-2 rounded-full transition-all ${
                      activeCategory === category.id ? 'bg-primary-foreground' : 'bg-muted-foreground'
                    }`} />
                  </div>
                  
                  {/* Category name */}
                  <div>
                    <span className={`font-semibold text-base md:text-lg transition-colors ${
                      activeCategory === category.id ? 'text-foreground' : 'text-muted-foreground group-hover:text-foreground'
                    }`}>
                      {category.name}
                    </span>
                    {/* Description - показывается только для активной */}
                    {activeCategory === category.id && (
                      <p className="text-sm text-muted-foreground mt-1 max-w-[280px] animate-fade-in">
                        {category.description}
                      </p>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
          
          {/* Right side - Solutions grid */}
          <div className="flex-1 min-w-0">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3" key={activeCategory}>
              {currentCategory.solutions.map((solution, index) => (
                <Link
                  key={solution.id}
                  to={`/solution/${currentCategory.id}-${solution.id}`}
                  className="group/card animate-fade-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="aspect-[4/3] rounded-lg overflow-hidden bg-muted mb-2">
                    <img
                      src={solution.image}
                      alt={solution.name}
                      className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <span className="text-sm font-medium text-foreground group-hover/card:text-primary transition-colors">
                    {solution.name}
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
