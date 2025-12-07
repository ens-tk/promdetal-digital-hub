import { Link } from "react-router-dom";
import { ArrowRight, Cog, Gauge, PipetteIcon, Zap } from "lucide-react";

const productCategories = [
  {
    id: "pumps",
    name: "Насосное оборудование",
    description: "Надёжные решения для перекачки",
    icon: Gauge,
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&h=400&fit=crop",
    solutions: [
      { id: "centrifugal", name: "Центробежные насосы" },
      { id: "submersible", name: "Погружные насосы" },
      { id: "dosing", name: "Дозировочные насосы" },
    ],
    featured: true,
  },
  {
    id: "compressors",
    name: "Компрессорное оборудование",
    description: "Промышленные компрессоры",
    icon: Zap,
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=400&fit=crop",
    solutions: [
      { id: "screw", name: "Винтовые компрессоры" },
      { id: "piston", name: "Поршневые компрессоры" },
    ],
    featured: false,
  },
  {
    id: "valves",
    name: "Трубопроводная арматура",
    description: "Запорная и регулирующая арматура",
    icon: PipetteIcon,
    image: "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?w=600&h=400&fit=crop",
    solutions: [
      { id: "gate", name: "Задвижки" },
      { id: "ball", name: "Шаровые краны" },
      { id: "check", name: "Обратные клапаны" },
    ],
    featured: false,
  },
  {
    id: "drives",
    name: "Приводная техника",
    description: "Двигатели и редукторы",
    icon: Cog,
    image: "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=600&h=400&fit=crop",
    solutions: [
      { id: "motors", name: "Электродвигатели" },
      { id: "gearboxes", name: "Редукторы" },
    ],
    featured: true,
  },
];

const EquipmentCategories = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/30">
      <div className="container">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <span className="text-primary font-medium text-sm uppercase tracking-wider">Каталог</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-2">
              Продукты и решения
            </h2>
          </div>
          <Link 
            to="/equipment" 
            className="group inline-flex items-center gap-2 text-foreground hover:text-primary transition-colors font-medium"
          >
            Весь каталог
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        
        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[200px]">
          {productCategories.map((category, index) => {
            const Icon = category.icon;
            const isLarge = category.featured;
            
            return (
              <div 
                key={category.id} 
                className={`group relative rounded-2xl overflow-hidden ${
                  isLarge ? 'md:row-span-2' : ''
                }`}
              >
                {/* Background Image */}
                <img
                  src={category.image}
                  alt={category.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20" />
                
                {/* Content */}
                <div className="relative h-full p-6 flex flex-col justify-between">
                  {/* Icon Badge */}
                  <div className="self-start">
                    <div className="w-12 h-12 rounded-xl bg-primary/20 backdrop-blur-sm border border-primary/30 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                  
                  {/* Bottom Content */}
                  <div>
                    <Link to={`/equipment/category/${category.id}`}>
                      <h3 className="text-white font-bold text-xl mb-1 group-hover:text-primary transition-colors">
                        {category.name}
                      </h3>
                    </Link>
                    <p className="text-white/60 text-sm mb-4">{category.description}</p>
                    
                    {/* Solutions */}
                    <div className="flex flex-wrap gap-2">
                      {category.solutions.slice(0, isLarge ? 3 : 2).map((solution) => (
                        <Link
                          key={solution.id}
                          to={`/solution/${category.id}-${solution.id}`}
                          className="text-xs px-3 py-1.5 rounded-full bg-white/10 text-white/80 hover:bg-primary hover:text-primary-foreground transition-colors backdrop-blur-sm border border-white/10"
                        >
                          {solution.name}
                        </Link>
                      ))}
                      {category.solutions.length > (isLarge ? 3 : 2) && (
                        <span className="text-xs px-3 py-1.5 rounded-full bg-white/5 text-white/50">
                          +{category.solutions.length - (isLarge ? 3 : 2)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default EquipmentCategories;
