import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
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
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === "ru" ? "en" : "ru");
  };

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Top Info Bar */}
      <div className="bg-primary text-primary-foreground">
        <div className="container flex items-center justify-between h-10 text-sm">
          <div className="hidden md:flex items-center gap-6">
            <div className="flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5" />
              <span>{t("header.address")}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" />
              <span>{t("header.hours")}</span>
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
                <span className="hidden sm:inline">{t("header.admin")}</span>
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              className="h-7 px-2 gap-1 text-primary-foreground hover:bg-primary-foreground/10"
              onClick={toggleLanguage}
            >
              <Globe className="h-4 w-4" />
              <span className="uppercase font-medium">{i18n.language}</span>
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
                {t("header.subtitle")}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList className="gap-1">
              {/* О компании - с подменю */}
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent text-sm font-medium text-foreground/80 hover:text-primary hover:bg-transparent data-[state=open]:bg-transparent">
                  {t("header.about")}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="fixed left-0 right-0 w-screen bg-background border-b shadow-lg">
                    <div className="container py-6">
                      <div className="grid grid-cols-3 gap-8">
                        <div>
                          <h3 className="font-semibold text-foreground mb-4">{t("header.about")}</h3>
                          <ul className="space-y-2">
                            <li>
                              <NavigationMenuLink asChild>
                                <Link to="/about" className="block py-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                                  {t("header.aboutOverview")}
                                </Link>
                              </NavigationMenuLink>
                            </li>
                            <li>
                              <NavigationMenuLink asChild>
                                <Link to="/about?tab=history" className="block py-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                                  {t("header.aboutHistory")}
                                </Link>
                              </NavigationMenuLink>
                            </li>
                            <li>
                              <NavigationMenuLink asChild>
                                <Link to="/about?tab=mission" className="block py-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                                  {t("header.aboutMission")}
                                </Link>
                              </NavigationMenuLink>
                            </li>
                          </ul>
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground mb-4">{t("header.documents")}</h3>
                          <ul className="space-y-2">
                            <li>
                              <NavigationMenuLink asChild>
                                <Link to="/contacts" className="block py-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                                  {t("header.requisites")}
                                </Link>
                              </NavigationMenuLink>
                            </li>
                          </ul>
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground mb-4">{t("header.pressCenter")}</h3>
                          <ul className="space-y-2">
                            <li>
                              <NavigationMenuLink asChild>
                                <Link to="/articles" className="block py-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                                  {t("header.articles")}
                                </Link>
                              </NavigationMenuLink>
                            </li>
                            <li>
                              <NavigationMenuLink asChild>
                                <Link to="/projects" className="block py-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                                  {t("header.projects")}
                                </Link>
                              </NavigationMenuLink>
                            </li>
                            <li>
                              <NavigationMenuLink asChild>
                                <Link to="/contacts" className="block py-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                                  {t("header.contacts")}
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
                    {t("header.equipment")}
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
                    {t("header.services")}
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              {/* Новости */}
              <NavigationMenuItem>
                <Link to="/news" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors px-4 py-2">
                  {t("header.news")}
                </Link>
              </NavigationMenuItem>

              {/* Контакты */}
              <NavigationMenuItem>
                <Link to="/contacts" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors px-4 py-2">
                  {t("header.contacts")}
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
                {t("header.about")}
              </Link>
              <div className="pl-4 space-y-1">
                <Link to="/about?tab=history" className="block text-sm text-muted-foreground hover:text-primary transition-colors py-1" onClick={() => setMobileMenuOpen(false)}>
                  {t("header.aboutHistory")}
                </Link>
                <Link to="/about?tab=mission" className="block text-sm text-muted-foreground hover:text-primary transition-colors py-1" onClick={() => setMobileMenuOpen(false)}>
                  {t("header.aboutMission")}
                </Link>
                <Link to="/contacts" className="block text-sm text-muted-foreground hover:text-primary transition-colors py-1" onClick={() => setMobileMenuOpen(false)}>
                  {t("header.requisites")}
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
                {t("header.equipment")}
              </Link>
              <div className="pl-4 space-y-1">
                <Link to="/equipment/category/pumps" className="block text-sm text-muted-foreground hover:text-primary transition-colors py-1" onClick={() => setMobileMenuOpen(false)}>
                  {t("header.pumps")}
                </Link>
                <Link to="/equipment/category/compressors" className="block text-sm text-muted-foreground hover:text-primary transition-colors py-1" onClick={() => setMobileMenuOpen(false)}>
                  {t("header.compressors")}
                </Link>
                <Link to="/equipment/category/valves" className="block text-sm text-muted-foreground hover:text-primary transition-colors py-1" onClick={() => setMobileMenuOpen(false)}>
                  {t("header.valves")}
                </Link>
              </div>
            </div>

            {/* Услуги и сервисы */}
            <Link
              to="/services"
              className="block text-sm font-medium text-foreground/80 hover:text-primary transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t("header.services")}
            </Link>

            {/* Новости */}
            <Link
              to="/news"
              className="block text-sm font-medium text-foreground/80 hover:text-primary transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t("header.news")}
            </Link>

            {/* Контакты */}
            <Link
              to="/contacts"
              className="block text-sm font-medium text-foreground/80 hover:text-primary transition-colors py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t("header.contacts")}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
