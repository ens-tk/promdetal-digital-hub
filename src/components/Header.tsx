import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Search, MapPin, Clock, Phone, Mail, Globe, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [language, setLanguage] = useState<"ru" | "en">("ru");

  const aboutSubmenu = [
    { title: "История компании", path: "/about#history" },
    { title: "Миссия и ценности", path: "/about#mission" },
    { title: "Наша команда", path: "/about#team" },
    { title: "Сертификаты", path: "/about#certificates" },
  ];

  const servicesSubmenu = [
    { title: "Комплексное проектирование", path: "/services/design" },
    { title: "Комплексная автоматизация производства", path: "/services/automation" },
    { title: "Пусконаладочные работы", path: "/services/commissioning" },
    { title: "Сервисное обслуживание", path: "/services/maintenance" },
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
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList className="gap-1">
              {/* О компании - с подменю */}
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent text-sm font-medium text-foreground/80 hover:text-primary hover:bg-transparent data-[state=open]:bg-transparent">
                  О компании
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-48 gap-1 p-2 bg-background border rounded-md shadow-lg">
                    <li>
                      <NavigationMenuLink asChild>
                        <Link to="/about" className="block px-3 py-2 text-sm hover:bg-accent rounded-md transition-colors">
                          Обзор
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    {aboutSubmenu.map((item) => (
                      <li key={item.path}>
                        <NavigationMenuLink asChild>
                          <Link to={item.path} className="block px-3 py-2 text-sm hover:bg-accent rounded-md transition-colors">
                            {item.title}
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* Продукты и решения */}
              <NavigationMenuItem>
                <Link to="/equipment" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors px-4 py-2">
                  Продукты и решения
                </Link>
              </NavigationMenuItem>

              {/* Услуги и сервисы - с подменю */}
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent text-sm font-medium text-foreground/80 hover:text-primary hover:bg-transparent data-[state=open]:bg-transparent">
                  Услуги и сервисы
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-72 gap-1 p-2 bg-background border rounded-md shadow-lg">
                    <li>
                      <NavigationMenuLink asChild>
                        <Link to="/services" className="block px-3 py-2 text-sm font-medium hover:bg-accent rounded-md transition-colors">
                          Все услуги
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    {servicesSubmenu.map((item) => (
                      <li key={item.path}>
                        <NavigationMenuLink asChild>
                          <Link to={item.path} className="block px-3 py-2 text-sm hover:bg-accent rounded-md transition-colors">
                            {item.title}
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* Новости */}
              <NavigationMenuItem>
                <Link to="/news" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors px-4 py-2">
                  Новости
                </Link>
              </NavigationMenuItem>

              {/* Контакты */}
              <NavigationMenuItem>
                <Link to="/contacts" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors px-4 py-2">
                  Контакты
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

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
          <nav className="container flex flex-col space-y-2 py-4">
            {/* О компании */}
            <div className="space-y-1">
              <Link
                to="/about"
                className="block text-sm font-medium text-foreground/80 hover:text-primary transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                О компании
              </Link>
              <div className="pl-4 space-y-1">
                {aboutSubmenu.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="block text-sm text-muted-foreground hover:text-primary transition-colors py-1"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
            </div>

            {/* Продукты и решения */}
            <Link
              to="/equipment"
              className="block text-sm font-medium text-foreground/80 hover:text-primary transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Продукты и решения
            </Link>

            {/* Услуги и сервисы */}
            <div className="space-y-1">
              <Link
                to="/services"
                className="block text-sm font-medium text-foreground/80 hover:text-primary transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Услуги и сервисы
              </Link>
              <div className="pl-4 space-y-1">
                {servicesSubmenu.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="block text-sm text-muted-foreground hover:text-primary transition-colors py-1"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
            </div>

            {/* Новости */}
            <Link
              to="/news"
              className="block text-sm font-medium text-foreground/80 hover:text-primary transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Новости
            </Link>

            {/* Контакты */}
            <Link
              to="/contacts"
              className="block text-sm font-medium text-foreground/80 hover:text-primary transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Контакты
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
