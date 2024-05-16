import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { ChangeEvent, useState } from "react";
import { TbSearch } from "react-icons/tb";
import { useSearchParams } from "react-router-dom";
import { usePathChange } from "../hooks/usePathChange";
type SearchbarProps = {
  paramKey?: string;
};
function SearchBar({ paramKey = "query" }: SearchbarProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get(paramKey) || "");
  usePathChange(() => {
    searchParams.delete(paramKey);
    setQuery("");
  });
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const newQuery = event.target.value;
    setQuery(newQuery);
    if (newQuery.length > 0) {
      searchParams.set(paramKey, newQuery);
      setSearchParams(searchParams);
    } else {
      searchParams.delete(paramKey);
      setSearchParams(searchParams);
    }
  }

  return (
    <InputGroup width='40rem' _focus={{ minWidth: "60rem" }} size={"lg"}>
      <InputLeftElement pointerEvents='none'>
        <TbSearch />
      </InputLeftElement>
      <Input
        value={query}
        onChange={handleChange}
        focusBorderColor='teal.400'
      ></Input>
    </InputGroup>
  );
}

export default SearchBar;
