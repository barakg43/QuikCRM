import StyledSelect, { Option } from "../components/StyledSelect";
import { useSwitchLanguage } from "./useSwitchLanguage";

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
      width='10rem'
      fontSize='1.2rem'
    />
  );
}

export default LanguageSelector;
