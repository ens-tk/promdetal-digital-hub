import HeroCarousel from "@/components/home/HeroCarousel";
import EquipmentCategories from "@/components/home/EquipmentCategories";
import PartnersSection from "@/components/home/PartnersSection";
import DeliveryMap from "@/components/home/DeliveryMap";

const Index = () => {
  return (
    <div className="min-h-screen">
      <div className="container py-8">
        <HeroCarousel />
      </div>
      <EquipmentCategories />
      <PartnersSection />
      <DeliveryMap />
    </div>
  );
};

export default Index;
