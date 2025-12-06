import { Link } from "react-router-dom";

const productCategories = [
  {
    id: "pumps",
    name: "Насосное оборудование",
    description: "Промышленные насосы и системы",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&h=400&fit=crop",
    solutions: [
      { id: "centrifugal", name: "Центробежные насосы" },
      { id: "submersible", name: "Погружные насосы" },
      { id: "dosing", name: "Дозировочные насосы" },
      { id: "vacuum", name: "Вакуумные насосы" },
    ],
  },
  {
    id: "compressors",
    name: "Компрессорное оборудование",
    description: "Винтовые и поршневые компрессоры",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=400&fit=crop",
    solutions: [
      { id: "screw", name: "Винтовые компрессоры" },
      { id: "piston", name: "Поршневые компрессоры" },
      { id: "centrifugal", name: "Центробежные компрессоры" },
    ],
  },
  {
    id: "valves",
    name: "Трубопроводная арматура",
    description: "Задвижки, клапаны, затворы",
    image: "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?w=600&h=400&fit=crop",
    solutions: [
      { id: "gate", name: "Задвижки" },
      { id: "ball", name: "Шаровые краны" },
      { id: "check", name: "Обратные клапаны" },
      { id: "butterfly", name: "Дисковые затворы" },
    ],
  },
  {
    id: "drives",
    name: "Приводная техника",
    description: "Электродвигатели и редукторы",
    image: "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=600&h=400&fit=crop",
    solutions: [
      { id: "motors", name: "Электродвигатели" },
      { id: "gearboxes", name: "Редукторы" },
      { id: "vfd", name: "Частотные преобразователи" },
    ],
  },
  {
    id: "heat-exchange",
    name: "Теплообменное оборудование",
    description: "Теплообменники и котельное оборудование",
    image: "https://images.unsplash.com/photo-1513828583688-c52646db42da?w=600&h=400&fit=crop",
    solutions: [
      { id: "plate", name: "Пластинчатые теплообменники" },
      { id: "shell-tube", name: "Кожухотрубные теплообменники" },
      { id: "boilers", name: "Котельное оборудование" },
    ],
  },
  {
    id: "filtration",
    name: "Фильтрационное оборудование",
    description: "Системы очистки и фильтрации",
    image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=600&h=400&fit=crop",
    solutions: [
      { id: "oil", name: "Масляные фильтры" },
      { id: "air", name: "Воздушные фильтры" },
      { id: "water", name: "Водяные фильтры" },
    ],
  },
];

const Equipment = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-industrial-dark text-background py-12">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Продукты и решения</h1>
          <p className="text-lg text-background/80">
            Комплексные решения для промышленных предприятий
          </p>
        </div>
      </div>

      {/* Product Categories Grid */}
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {productCategories.map((category) => (
            <div key={category.id} className="group">
              {/* Card with Image */}
              <Link to={`/equipment/category/${category.id}`} className="block">
                <div className="relative h-52 rounded-lg overflow-hidden mb-4">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <h3 className="text-white font-bold text-xl mb-1">{category.name}</h3>
                    <p className="text-white/80 text-sm">{category.description}</p>
                  </div>
                </div>
              </Link>

              {/* Solutions List */}
              <div className="space-y-1.5 pl-1">
                {category.solutions.map((solution) => (
                  <Link
                    key={solution.id}
                    to={`/solution/${category.id}-${solution.id}`}
                    className="block text-sm text-muted-foreground hover:text-primary transition-colors py-0.5"
                  >
                    {solution.name}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Equipment;
