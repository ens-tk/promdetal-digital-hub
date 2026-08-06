import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const STORAGE_KEY = "language";

const resources = {
  ru: {
    translation: {
      header: {
        address: "г. Томск, ул. Смирнова, 7/11 стр. 6",
        hours: "Пн-Пт: 9:00 - 18:00",
        admin: "Админка",
        about: "О компании",
        aboutOverview: "Обзор компании",
        aboutHistory: "История компании",
        aboutMission: "Миссия и ценности",
        documents: "Документы",
        requisites: "Реквизиты",
        pressCenter: "Пресс-центр",
        articles: "Статьи",
        projects: "Реализованные проекты",
        contacts: "Контакты",
        equipment: "Продукты и решения",
        services: "Услуги и сервисы",
        news: "Новости",
        pumps: "Насосное оборудование",
        compressors: "Компрессорное оборудование",
        valves: "Трубопроводная арматура",
        subtitle: "Промышленное оборудование",
      },
      footer: {
        companyName: "Промдеталь",
        description: "Производство и поставка промышленного оборудования",
        navigation: "Навигация",
        equipment: "Оборудование",
        projects: "Проекты",
        news: "Новости",
        about: "О компании",
        company: "Компания",
        partners: "Партнёры",
        contacts: "Контакты",
        requisites: "Реквизиты",
        contactsTitle: "Контакты",
        rights: "Все права защищены.",
      },
      home: {
        yearsExperience: "лет опыта",
        projects: "проектов",
        fullCycle: "Полный цикл",
        fullCycleLabel: "работ",
        turnkeySolutions: "Решения",
        turnkeyLabel: "под ключ",
        productsAndSolutions: "Продукты и решения",
        fullCatalog: "Весь каталог",
        ourPartners: "Наши партнёры",
        readMore: "Подробнее",
      },
      notFound: {
        title: "Страница не найдена",
        description:
          "Мы обновили сайт, и старая ссылка могла устареть или перестать работать. Пожалуйста, перейдите на главную страницу, чтобы найти нужный раздел.",
        backHome: "Вернуться на главную",
      },
    },
  },
  en: {
    translation: {
      header: {
        address: "7/11 bld. 6, Smirnova St., Tomsk, Russia",
        hours: "Mon-Fri: 9:00 AM - 6:00 PM",
        admin: "Admin",
        about: "About",
        aboutOverview: "Company overview",
        aboutHistory: "Company history",
        aboutMission: "Mission and values",
        documents: "Documents",
        requisites: "Company details",
        pressCenter: "Press center",
        articles: "Articles",
        projects: "Completed projects",
        contacts: "Contacts",
        equipment: "Products and solutions",
        services: "Services",
        news: "News",
        pumps: "Pumping equipment",
        compressors: "Compressor equipment",
        valves: "Pipeline valves",
        subtitle: "Industrial equipment",
      },
      footer: {
        companyName: "Promdetal",
        description: "Manufacturing and supply of industrial equipment",
        navigation: "Navigation",
        equipment: "Equipment",
        projects: "Projects",
        news: "News",
        about: "About us",
        company: "Company",
        partners: "Partners",
        contacts: "Contacts",
        requisites: "Company details",
        contactsTitle: "Contacts",
        rights: "All rights reserved.",
      },
      home: {
        yearsExperience: "years of experience",
        projects: "projects",
        fullCycle: "Full cycle",
        fullCycleLabel: "of works",
        turnkeySolutions: "Solutions",
        turnkeyLabel: "turnkey",
        productsAndSolutions: "Products and solutions",
        fullCatalog: "Full catalog",
        ourPartners: "Our partners",
        readMore: "Read more",
      },
      notFound: {
        title: "Page not found",
        description:
          "We've updated our website, so the old link may be outdated or broken. Please go to the home page to find what you're looking for.",
        backHome: "Return to home",
      },
    },
  },
};

const savedLanguage = typeof window !== "undefined" ? localStorage.getItem(STORAGE_KEY) : null;

i18n.use(initReactI18next).init({
  resources,
  lng: savedLanguage === "en" ? "en" : "ru",
  fallbackLng: "ru",
  interpolation: {
    escapeValue: false,
  },
});

i18n.on("languageChanged", (lng) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, lng);
  }
});

export default i18n;
