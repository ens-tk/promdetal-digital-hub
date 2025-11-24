const partners = [
  { id: 1, name: "Партнёр 1", logo: "/placeholder.svg" },
  { id: 2, name: "Партнёр 2", logo: "/placeholder.svg" },
  { id: 3, name: "Партнёр 3", logo: "/placeholder.svg" },
  { id: 4, name: "Партнёр 4", logo: "/placeholder.svg" },
  { id: 5, name: "Партнёр 5", logo: "/placeholder.svg" },
  { id: 6, name: "Партнёр 6", logo: "/placeholder.svg" },
];

const PartnersSection = () => {
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
