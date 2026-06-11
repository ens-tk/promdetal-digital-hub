import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t bg-industrial-dark text-background">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Промдеталь</h3>
            <p className="text-sm text-background/80">
              Производство и поставка промышленного оборудования
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold">Навигация</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/equipment" className="text-background/80 hover:text-background">
                  Оборудование
                </Link>
              </li>
              <li>
                <Link to="/projects" className="text-background/80 hover:text-background">
                  Проекты
                </Link>
              </li>
              <li>
                <Link to="/news" className="text-background/80 hover:text-background">
                  Новости
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-background/80 hover:text-background">
                  О компании
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h4 className="font-semibold">Компания</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/about/partners" className="text-background/80 hover:text-background">
                  Партнёры
                </Link>
              </li>
              <li>
                <Link to="/contacts" className="text-background/80 hover:text-background">
                  Контакты
                </Link>
              </li>
              <li>
                <Link to="/contacts" className="text-background/80 hover:text-background">
                  Реквизиты
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-semibold">Контакты</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-1 flex-shrink-0" />
                <span className="text-background/80">г. Томск, ул. Смирнова, 7/11 стр. 6</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 flex-shrink-0" />
                <span className="text-background/80">+7 (382 2) 21-79-88</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 flex-shrink-0" />
                <span className="text-background/80">info@enspg.ru</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-background/20 text-center text-sm text-background/60">
          <p>&copy; {new Date().getFullYear()} Промдеталь. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
