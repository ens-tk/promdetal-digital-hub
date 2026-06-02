import HeroCarousel from "@/components/home/HeroCarousel";
import EquipmentCategories from "@/components/home/EquipmentCategories";
import PartnersSection from "@/components/home/PartnersSection";
// import DeliveryMap from "@/components/home/DeliveryMap";

const statsStrip = [
  { value: "20+", label: "лет опыта" },
  { value: "50+", label: "проектов" },
  { value: "Полный цикл", label: "работ" },
  { value: "Решения", label: "под ключ" },
];

const Index = () => {
  return (
    <div className="min-h-screen">
      <div className="container py-8">
        <HeroCarousel />
      </div>

      {/* Stats strip */}
      <div className="bg-primary text-primary-foreground">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-primary-foreground/20">
            {statsStrip.map((item, index) => (
              <div key={index} className="px-6 py-4 text-center">
                <p className="text-xl md:text-2xl font-bold">{item.value}</p>
                <p className="text-sm text-primary-foreground/80">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <EquipmentCategories />
      <PartnersSection />
      {/* <DeliveryMap /> */}
    </div>
  );
};

export default Index;
