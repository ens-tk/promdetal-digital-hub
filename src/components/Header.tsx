import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, Search, MapPin, Clock, Phone, Mail, Globe, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import ensLogo from "@/assets/ens-logo-B60Hzgrb.png";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [language, setLanguage] = useState<"ru" | "en">("ru");
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Top Info Bar */}
      <div className="bg-primary text-primary-foreground">
        <div className="container flex items-center justify-between h-10 text-sm">
          <div className="hidden md:flex items-center gap-6">
            <div className="flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5" />
              <span>г. Томск, ул. Смирнова, 7/11 стр. 6</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" />
              <span>Пн-Пт: 9:00 - 18:00</span>
            </div>
          </div>
          <div className="flex items-center gap-4 md:gap-6 w-full md:w-auto justify-between md:justify-end">
            <a href="tel:+73822217988" className="flex items-center gap-1.5 hover:opacity-80 transition-opacity">
              <Phone className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">+7 (382 2) 21- 79- 88</span>
            </a>
            <a href="mailto:info@enspg.ru " className="flex items-center gap-1.5 hover:opacity-80 transition-opacity">
              <Mail className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">info@enspg.ru </span>
            </a>
            <Button
              variant="ghost"
              size="sm"
              className="h-7 px-2 text-primary-foreground hover:bg-primary-foreground/10"
              onClick={() => navigate("/search")}
            >
              <Search className="h-4 w-4" />
            </Button>
            {auth.isAuthenticated() && (
              <Button
                variant="ghost"
                size="sm"
                className="h-7 px-2 gap-1 text-primary-foreground hover:bg-primary-foreground/10"
                onClick={() => navigate("/admin/news")}
              >
                <Settings className="h-4 w-4" />
                <span className="hidden sm:inline">Админка</span>
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              className="h-7 px-2 gap-1 text-primary-foreground hover:bg-primary-foreground/10"
              onClick={() => setLanguage(language === "ru" ? "en" : "ru")}
            >
              <Globe className="h-4 w-4" />
              <span className="uppercase font-medium">{language}</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="border-b bg-background">
        <div className="container flex h-25 items-center justify-between overflow-visible">
          <Link to="/" className="flex items-center gap-5 group">
            <img src={ensLogo} alt="ENS Group" className="h-[130px] w-auto -mt-7 -mb-2" />
            <div className="flex flex-col leading-tight">
              <span className="text-3xl font-bold text-primary tracking-tight group-hover:opacity-80 transition-opacity">
                ENS Group
              </span>
              <span className="text-base text-muted-foreground font-medium tracking-wide uppercase">
                Промышленное оборудование
              </span>
            </div>
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
                  <div className="fixed left-0 right-0 w-screen bg-background border-b shadow-lg">
                    <div className="container py-6">
                      <div className="grid grid-cols-3 gap-8">
                        <div>
                          <h3 className="font-semibold text-foreground mb-4">О нас</h3>
                          <ul className="space-y-2">
                            <li>
                              <NavigationMenuLink asChild>
                                <Link to="/about" className="block py-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                                  Обзор компании
                                </Link>
                              </NavigationMenuLink>
                            </li>
                            <li>
                              <NavigationMenuLink asChild>
                                <Link to="/about?tab=history" className="block py-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                                  История компании
                                </Link>
                              </NavigationMenuLink>
                            </li>
                            <li>
                              <NavigationMenuLink asChild>
                                <Link to="/about?tab=mission" className="block py-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                                  Миссия и ценности
                                </Link>
                              </NavigationMenuLink>
                            </li>
                          </ul>
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground mb-4">Документы</h3>
                          <ul className="space-y-2">
                            <li>
                              <NavigationMenuLink asChild>
                                <Link to="/about?tab=reviews" className="block py-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                                  Отзывы
                                </Link>
                              </NavigationMenuLink>
                            </li>
                            <li>
                              <NavigationMenuLink asChild>
                                <Link to="/about?tab=docs" className="block py-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                                  Документация
                                </Link>
                              </NavigationMenuLink>
                            </li>
                            <li>
                              <NavigationMenuLink asChild>
                                <Link to="/about?tab=requisites" className="block py-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                                  Реквизиты
                                </Link>
                              </NavigationMenuLink>
                            </li>
                          </ul>
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground mb-4">Пресс-центр</h3>
                          <ul className="space-y-2">
                            <li>
                              <NavigationMenuLink asChild>
                                <Link to="/articles" className="block py-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                                  Статьи
                                </Link>
                              </NavigationMenuLink>
                            </li>
                            <li>
                              <NavigationMenuLink asChild>
                                <Link to="/projects" className="block py-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                                  Реализованные проекты
                                </Link>
                              </NavigationMenuLink>
                            </li>
                            <li>
                              <NavigationMenuLink asChild>
                                <Link to="/contacts" className="block py-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                                  Контакты
                                </Link>
                              </NavigationMenuLink>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* Продукты и решения - простая ссылка */}
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link 
                    to="/equipment" 
                    className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
                  >
                    Продукты и решения
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              {/* Услуги и сервисы - простая ссылка */}
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    to="/services"
                    className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
                  >
                    Услуги и сервисы
                  </Link>
                </NavigationMenuLink>
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
                <Link to="/about?tab=history" className="block text-sm text-muted-foreground hover:text-primary transition-colors py-1" onClick={() => setMobileMenuOpen(false)}>
                  История компании
                </Link>
                <Link to="/about?tab=mission" className="block text-sm text-muted-foreground hover:text-primary transition-colors py-1" onClick={() => setMobileMenuOpen(false)}>
                  Миссия и ценности
                </Link>
                <Link to="/about?tab=reviews" className="block text-sm text-muted-foreground hover:text-primary transition-colors py-1" onClick={() => setMobileMenuOpen(false)}>
                  Отзывы
                </Link>
                <Link to="/about?tab=docs" className="block text-sm text-muted-foreground hover:text-primary transition-colors py-1" onClick={() => setMobileMenuOpen(false)}>
                  Документация
                </Link>
                <Link to="/about?tab=requisites" className="block text-sm text-muted-foreground hover:text-primary transition-colors py-1" onClick={() => setMobileMenuOpen(false)}>
                  Реквизиты
                </Link>
              </div>
            </div>

            {/* Продукты и решения */}
            <div className="space-y-1">
              <Link
                to="/equipment"
                className="block text-sm font-medium text-foreground/80 hover:text-primary transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Продукты и решения
              </Link>
              <div className="pl-4 space-y-1">
                <Link to="/equipment/category/pumps" className="block text-sm text-muted-foreground hover:text-primary transition-colors py-1" onClick={() => setMobileMenuOpen(false)}>
                  Насосное оборудование
                </Link>
                <Link to="/equipment/category/compressors" className="block text-sm text-muted-foreground hover:text-primary transition-colors py-1" onClick={() => setMobileMenuOpen(false)}>
                  Компрессорное оборудование
                </Link>
                <Link to="/equipment/category/valves" className="block text-sm text-muted-foreground hover:text-primary transition-colors py-1" onClick={() => setMobileMenuOpen(false)}>
                  Трубопроводная арматура
                </Link>
              </div>
            </div>

            {/* Услуги и сервисы */}
            <Link
              to="/services"
              className="block text-sm font-medium text-foreground/80 hover:text-primary transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Услуги и сервисы
            </Link>

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
