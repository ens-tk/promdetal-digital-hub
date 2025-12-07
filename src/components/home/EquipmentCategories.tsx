import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const productCategories = [
  {
    id: "pumps",
    name: "Насосное оборудование",
    solutions: [
      { id: "centrifugal", name: "Центробежные насосы", image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=300&h=200&fit=crop" },
      { id: "submersible", name: "Погружные насосы", image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=300&h=200&fit=crop" },
      { id: "dosing", name: "Дозировочные насосы", image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=300&h=200&fit=crop" },
    ],
  },
  {
    id: "compressors",
    name: "Компрессорное оборудование",
    solutions: [
      { id: "screw", name: "Винтовые компрессоры", image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=300&h=200&fit=crop" },
      { id: "piston", name: "Поршневые компрессоры", image: "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=300&h=200&fit=crop" },
    ],
  },
  {
    id: "valves",
    name: "Трубопроводная арматура",
    solutions: [
      { id: "gate", name: "Задвижки", image: "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?w=300&h=200&fit=crop" },
      { id: "ball", name: "Шаровые краны", image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=300&h=200&fit=crop" },
      { id: "check", name: "Обратные клапаны", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop" },
    ],
  },
  {
    id: "drives",
    name: "Приводная техника",
    solutions: [
      { id: "motors", name: "Электродвигатели", image: "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?w=300&h=200&fit=crop" },
      { id: "gearboxes", name: "Редукторы", image: "https://images.unsplash.com/photo-1537462715879-360eeb61a0ad?w=300&h=200&fit=crop" },
    ],
  },
];

const EquipmentCategories = () => {
  return (
    <section className="py-12 bg-muted/30">
      <div className="container">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl md:text-3xl font-bold">Продукты и решения</h2>
          <Link 
            to="/equipment" 
            className="group inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            Весь каталог
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
        
        {/* Compact Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {productCategories.map((category) => (
            <div key={category.id} className="bg-card rounded-lg border border-border p-4">
              {/* Category Name */}
              <Link 
                to={`/equipment/category/${category.id}`}
                className="text-sm font-semibold text-muted-foreground hover:text-primary transition-colors mb-3 block"
              >
                {category.name}
              </Link>
              
              {/* Solutions - horizontal scroll */}
              <div className="flex gap-3 overflow-x-auto pb-1 -mx-1 px-1">
                {category.solutions.map((solution) => (
                  <Link
                    key={solution.id}
                    to={`/solution/${category.id}-${solution.id}`}
                    className="group/card flex-shrink-0 w-28"
                  >
                    <div className="aspect-square rounded-lg overflow-hidden bg-muted mb-1.5">
                      <img
                        src={solution.image}
                        alt={solution.name}
                        className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <span className="text-xs font-medium text-foreground group-hover/card:text-primary transition-colors line-clamp-2 leading-tight">
                      {solution.name}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EquipmentCategories;
