import { useEffect, useState } from "react";
import i18n from "./i18n";
import { useTranslation } from "react-i18next";

export function useSwitchLanguage() {
  const { i18n } = useTranslation();
  const [lang, setLang] = useState(() => i18n.language);
  useEffect(
    function () {
      i18n.changeLanguage(lang);
      document.dir = i18n.dir(lang);
    },
    [i18n, lang]
  );
  return { lang, setLang };
}
