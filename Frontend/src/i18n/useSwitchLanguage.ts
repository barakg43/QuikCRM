import { useEffect, useState } from "react";
import i18n from "./i18n";

export function useSwitchLanguage() {
  const [lang, setLang] = useState(() => i18n.language);
  useEffect(
    function () {
      i18n.changeLanguage(lang);
      document.dir = i18n.dir(lang);
    },
    [lang]
  );
  return { lang, setLang };
}
