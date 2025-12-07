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
    <section className="py-20 bg-muted/30">
      <div className="container">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
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
        
        {/* Categories Grid */}
        <div className="space-y-8">
          {productCategories.map((category) => (
            <div key={category.id} className="group">
              {/* Category Header */}
              <div className="flex items-center gap-3 mb-4">
                <Link 
                  to={`/equipment/category/${category.id}`}
                  className="text-lg font-semibold hover:text-primary transition-colors"
                >
                  {category.name}
                </Link>
                <div className="h-px flex-1 bg-border" />
              </div>
              
              {/* Solutions Row */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
                {category.solutions.map((solution) => (
                  <Link
                    key={solution.id}
                    to={`/solution/${category.id}-${solution.id}`}
                    className="group/card relative rounded-xl overflow-hidden bg-card border border-border hover:border-primary/50 transition-all hover:shadow-lg"
                  >
                    {/* Image */}
                    <div className="aspect-[4/3] overflow-hidden">
                      <img
                        src={solution.image}
                        alt={solution.name}
                        className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-300"
                      />
                    </div>
                    
                    {/* Name */}
                    <div className="p-3">
                      <h4 className="text-sm font-medium text-foreground group-hover/card:text-primary transition-colors line-clamp-2">
                        {solution.name}
                      </h4>
                    </div>
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
