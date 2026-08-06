import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="border-t bg-industrial-dark text-background">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">{t("footer.companyName")}</h3>
            <p className="text-sm text-background/80">
              {t("footer.description")}
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold">{t("footer.navigation")}</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/equipment" className="text-background/80 hover:text-background">
                  {t("footer.equipment")}
                </Link>
              </li>
              <li>
                <Link to="/projects" className="text-background/80 hover:text-background">
                  {t("footer.projects")}
                </Link>
              </li>
              <li>
                <Link to="/news" className="text-background/80 hover:text-background">
                  {t("footer.news")}
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-background/80 hover:text-background">
                  {t("footer.about")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h4 className="font-semibold">{t("footer.company")}</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/about/partners" className="text-background/80 hover:text-background">
                  {t("footer.partners")}
                </Link>
              </li>
              <li>
                <Link to="/contacts" className="text-background/80 hover:text-background">
                  {t("footer.contacts")}
                </Link>
              </li>
              <li>
                <Link to="/contacts" className="text-background/80 hover:text-background">
                  {t("footer.requisites")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-semibold">{t("footer.contactsTitle")}</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-1 flex-shrink-0" />
                <span className="text-background/80">{t("header.address")}</span>
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
          <p>&copy; {new Date().getFullYear()} {t("footer.companyName")}. {t("footer.rights")}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
