import { Link } from "react-router-dom";

const productCategories = [
  {
    id: "pumps",
    name: "Насосное оборудование",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&h=300&fit=crop",
    solutions: [
      { id: "centrifugal", name: "Центробежные насосы" },
      { id: "submersible", name: "Погружные насосы" },
      { id: "dosing", name: "Дозировочные насосы" },
    ],
  },
  {
    id: "compressors",
    name: "Компрессорное оборудование",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop",
    solutions: [
      { id: "screw", name: "Винтовые компрессоры" },
      { id: "piston", name: "Поршневые компрессоры" },
    ],
  },
  {
    id: "valves",
    name: "Трубопроводная арматура",
    image: "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?w=400&h=300&fit=crop",
    solutions: [
      { id: "gate", name: "Задвижки" },
      { id: "ball", name: "Шаровые краны" },
      { id: "check", name: "Обратные клапаны" },
    ],
  },
  {
    id: "drives",
    name: "Приводная техника",
    image: "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=400&h=300&fit=crop",
    solutions: [
      { id: "motors", name: "Электродвигатели" },
      { id: "gearboxes", name: "Редукторы" },
    ],
  },
];

const EquipmentCategories = () => {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl md:text-4xl font-bold">Продукты и решения</h2>
          <Link 
            to="/equipment" 
            className="text-primary hover:underline font-medium"
          >
            Смотреть все →
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {productCategories.map((category) => (
            <div key={category.id} className="group">
              {/* Card with Image */}
              <Link to={`/equipment/category/${category.id}`} className="block">
                <div className="relative h-40 rounded-lg overflow-hidden mb-3">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-white font-semibold text-base">{category.name}</h3>
                  </div>
                </div>
              </Link>

              {/* Solutions List - compact */}
              <div className="space-y-1 pl-1">
                {category.solutions.map((solution) => (
                  <Link
                    key={solution.id}
                    to={`/solution/${category.id}-${solution.id}`}
                    className="block text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {solution.name}
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
