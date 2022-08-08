import { createContext, useState } from "react";

const SearchContext = createContext();
export const SearchProvider = ({ children }) => {
  const [searchValue, setSearchValue] = useState("");

  const getSearch = (e) => {
    setSearchValue(e.target.value);
  };
  return (
    <SearchContext.Provider value={{ searchValue, getSearch }}>
      {children}
    </SearchContext.Provider>
  );
};

export default SearchContext;
