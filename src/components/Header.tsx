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
import ensLogo from "@/assets/ens-logo.jpg";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [language, setLanguage] = useState<"ru" | "en">("ru");

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Top Info Bar */}
      <div className="bg-primary text-primary-foreground">
        <div className="container flex items-center justify-between h-10 text-sm">
          <div className="hidden md:flex items-center gap-6">
            <div className="flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5" />
              <span>г. Томск, ул. Промышленная, 25</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" />
              <span>Пн-Пт: 8:00 - 17:00</span>
            </div>
          </div>
          <div className="flex items-center gap-4 md:gap-6 w-full md:w-auto justify-between md:justify-end">
            <a href="tel:+73822123456" className="flex items-center gap-1.5 hover:opacity-80 transition-opacity">
              <Phone className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">+7 (3822) 12-34-56</span>
            </a>
            <a href="mailto:info@promdetal.ru" className="flex items-center gap-1.5 hover:opacity-80 transition-opacity">
              <Mail className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">info@promdetal.ru</span>
            </a>
            <Button
              variant="ghost"
              size="sm"
              className="h-7 px-2 text-primary-foreground hover:bg-primary-foreground/10"
              onClick={() => setSearchOpen(!searchOpen)}
            >
              <Search className="h-4 w-4" />
            </Button>
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
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <img src={ensLogo} alt="ENS Group" className="h-14 w-auto" />
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

              {/* Услуги и сервисы - с подменю */}
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent text-sm font-medium text-foreground/80 hover:text-primary hover:bg-transparent data-[state=open]:bg-transparent">
                  Услуги и сервисы
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="fixed left-0 right-0 w-screen bg-background border-b shadow-lg">
                    <div className="container py-6">
                      <div className="grid grid-cols-2 gap-8">
                        <div>
                          <h3 className="font-semibold text-foreground mb-4">Проектирование</h3>
                          <ul className="space-y-2">
                            <li>
                              <NavigationMenuLink asChild>
                                <Link to="/services" className="block py-2 text-sm font-medium text-primary hover:opacity-80 transition-opacity">
                                  Все услуги →
                                </Link>
                              </NavigationMenuLink>
                            </li>
                            <li>
                              <NavigationMenuLink asChild>
                                <Link to="/services/design" className="block py-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                                  Комплексное проектирование
                                </Link>
                              </NavigationMenuLink>
                            </li>
                            <li>
                              <NavigationMenuLink asChild>
                                <Link to="/services/automation" className="block py-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                                  Комплексная автоматизация производства
                                </Link>
                              </NavigationMenuLink>
                            </li>
                          </ul>
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground mb-4">Сервис</h3>
                          <ul className="space-y-2">
                            <li>
                              <NavigationMenuLink asChild>
                                <Link to="/services/commissioning" className="block py-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                                  Пусконаладочные работы
                                </Link>
                              </NavigationMenuLink>
                            </li>
                            <li>
                              <NavigationMenuLink asChild>
                                <Link to="/services/maintenance" className="block py-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                                  Сервисное обслуживание
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
            <div className="space-y-1">
              <Link
                to="/services"
                className="block text-sm font-medium text-foreground/80 hover:text-primary transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Услуги и сервисы
              </Link>
              <div className="pl-4 space-y-1">
                <Link to="/services/design" className="block text-sm text-muted-foreground hover:text-primary transition-colors py-1" onClick={() => setMobileMenuOpen(false)}>
                  Комплексное проектирование
                </Link>
                <Link to="/services/automation" className="block text-sm text-muted-foreground hover:text-primary transition-colors py-1" onClick={() => setMobileMenuOpen(false)}>
                  Комплексная автоматизация
                </Link>
                <Link to="/services/commissioning" className="block text-sm text-muted-foreground hover:text-primary transition-colors py-1" onClick={() => setMobileMenuOpen(false)}>
                  Пусконаладочные работы
                </Link>
                <Link to="/services/maintenance" className="block text-sm text-muted-foreground hover:text-primary transition-colors py-1" onClick={() => setMobileMenuOpen(false)}>
                  Сервисное обслуживание
                </Link>
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
