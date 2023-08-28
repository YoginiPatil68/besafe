import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./en.json";
import mi from "./mi.json";
import hi from "./hi.json";

i18n.use(initReactI18next).init({
    compatibilityJSON: "v3",
    lng: "en",
    fallbackLng: "en",
    resources: {
        en,
        hi,
        mi
        // en json , hin json , marathi json
    }
});
export default i18n;
