import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import zh from "@/locales/zh.json";
import en from "@/locales/en.json";

// Read saved language preference from localStorage, default to Chinese
const savedLang = localStorage.getItem("wsl-lang") || "zh";

i18n
  .use(initReactI18next)
  .init({
    resources: {
      zh: { translation: zh },
      en: { translation: en },
    },
    lng: savedLang,
    fallbackLng: "zh",
    interpolation: {
      escapeValue: false, // React already escapes values
    },
  });

export default i18n;
