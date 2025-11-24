import { Card } from "@/components/ui/card";
import { Users, Award, Target, Globe } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen">
      <div className="bg-industrial-dark text-background py-12">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">О компании</h1>
          <p className="text-lg text-background/80">
            Промдеталь - надежный партнер в области промышленного оборудования
          </p>
        </div>
      </div>

      <div className="container py-12">
        <div className="prose max-w-none mb-12">
          <p className="text-lg leading-relaxed">
            Компания Промдеталь работает на рынке промышленного оборудования более 15 лет.
            Мы специализируемся на производстве и поставке высококачественного оборудования
            для машиностроительной отрасли, а также разрабатываем индивидуальные технические
            решения для наших клиентов.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card className="p-6 text-center">
            <Users className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="font-semibold text-2xl mb-2">500+</h3>
            <p className="text-muted-foreground">Довольных клиентов</p>
          </Card>
          <Card className="p-6 text-center">
            <Award className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="font-semibold text-2xl mb-2">15+</h3>
            <p className="text-muted-foreground">Лет на рынке</p>
          </Card>
          <Card className="p-6 text-center">
            <Target className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="font-semibold text-2xl mb-2">1000+</h3>
            <p className="text-muted-foreground">Выполненных проектов</p>
          </Card>
          <Card className="p-6 text-center">
            <Globe className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="font-semibold text-2xl mb-2">50+</h3>
            <p className="text-muted-foreground">Городов поставки</p>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="p-8">
            <h2 className="text-2xl font-bold mb-4">Наша миссия</h2>
            <p className="text-muted-foreground">
              Обеспечивать промышленные предприятия качественным оборудованием
              и инновационными решениями, способствуя развитию производственного
              сектора России.
            </p>
          </Card>
          <Card className="p-8">
            <h2 className="text-2xl font-bold mb-4">Наши ценности</h2>
            <ul className="space-y-2 text-muted-foreground">
              <li>• Качество продукции и услуг</li>
              <li>• Индивидуальный подход к каждому клиенту</li>
              <li>• Постоянное развитие и инновации</li>
              <li>• Надежность и ответственность</li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default About;
