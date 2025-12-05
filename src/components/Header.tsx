import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Search, MapPin, Clock, Phone, Mail, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [language, setLanguage] = useState<"ru" | "en">("ru");

  const navItems = [
    { title: "Оборудование", path: "/equipment" },
    { title: "Проекты", path: "/projects" },
    { title: "Новости", path: "/news" },
    { title: "О компании", path: "/about" },
    { title: "Контакты", path: "/contacts" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Top Info Bar */}
      <div className="bg-industrial-dark text-primary-foreground">
        <div className="container flex items-center justify-between h-10 text-sm">
          <div className="hidden md:flex items-center gap-6">
            <div className="flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 text-primary" />
              <span>г. Томск, ул. Промышленная, 25</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-primary" />
              <span>Пн-Пт: 8:00 - 17:00</span>
            </div>
          </div>
          <div className="flex items-center gap-4 md:gap-6 w-full md:w-auto justify-between md:justify-end">
            <a href="tel:+73822123456" className="flex items-center gap-1.5 hover:text-primary transition-colors">
              <Phone className="h-3.5 w-3.5 text-primary" />
              <span className="hidden sm:inline">+7 (3822) 12-34-56</span>
            </a>
            <a href="mailto:info@promdetal.ru" className="flex items-center gap-1.5 hover:text-primary transition-colors">
              <Mail className="h-3.5 w-3.5 text-primary" />
              <span className="hidden sm:inline">info@promdetal.ru</span>
            </a>
            <Button
              variant="ghost"
              size="sm"
              className="h-7 px-2 text-primary-foreground hover:text-primary hover:bg-transparent"
              onClick={() => setSearchOpen(!searchOpen)}
            >
              <Search className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-7 px-2 gap-1 text-primary-foreground hover:text-primary hover:bg-transparent"
              onClick={() => setLanguage(language === "ru" ? "en" : "ru")}
            >
              <Globe className="h-4 w-4" />
              <span className="uppercase font-medium">{language}</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <div className="text-2xl font-bold text-primary">Промдеталь</div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
              >
                {item.title}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Search Bar */}
      {searchOpen && (
        <div className="border-t bg-background p-4">
          <div className="container">
            <Input
              type="search"
              placeholder="Поиск оборудования..."
              className="max-w-md"
              autoFocus
            />
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t bg-background">
          <nav className="container flex flex-col space-y-4 py-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.title}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
