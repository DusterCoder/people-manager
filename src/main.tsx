import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { I18nextProvider } from "react-i18next";
import i18next from "i18next";
import commn_it from "./translation/it-IT.json";

import common_en from "./translation/en-EN.json";
i18next.init({
  interpolation: { escapeValue: false }, // React already does escaping
  lng: "it", // language to use
  resources: {
    it: {
      common: commn_it, // 'common' is our custom namespace
    },
    en: {
      common: common_en,
    },
  },
});
const handleLanguageChange = (lng: string) => {
  console.log(lng);
  i18next.changeLanguage(lng);
};
createRoot(document.getElementById("root")!).render(

  <I18nextProvider i18n={i18next}>
    <App
      handleLanguageChange={(lng: string) => {
        handleLanguageChange(lng);
      }}
    />
  </I18nextProvider>
);
