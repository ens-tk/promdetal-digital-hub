import { useEffect, useState } from "react";
import { api } from "@/lib/api";

interface Partner {
  id: number;
  name: string;
  logo: string;
}

const PartnersSection = () => {
  const [partners, setPartners] = useState<Partner[]>([]);

  useEffect(() => {
    api.get("/partners")
      .then(res => setPartners(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <section className="py-16 bg-muted">
      <div className="container">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          Наши партнёры
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {partners.map((partner) => (
            <div
              key={partner.id}
              className="flex items-center justify-center p-4 bg-background rounded-lg hover:shadow-md transition-shadow"
            >
              <img
                src={partner.logo}
                alt={partner.name}
                className="h-12 object-contain grayscale hover:grayscale-0 transition-all"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
