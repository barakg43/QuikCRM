import styled from "styled-components";
import { useSwitchLanguage } from "./useSwitchLanguage";
import StyledSelect, { Option } from "../components/StyledSelect";
import { ChangeEvent, ChangeEventHandler } from "react";

const langOption: Option[] = [
  { value: "en", label: "English" },
  {
    value: "he",
    label: "עברית",
  },
];

function LanguageSelector() {
  const { lang, setLang } = useSwitchLanguage();
  function handleLangChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setLang(e.target.value);
  }

  return (
    <StyledSelect
      options={langOption}
      value={lang}
      onChange={handleLangChange}
    />
  );
}

export default LanguageSelector;
