import { useContext } from "react";

import SearchContext from "../../../contexts/SearchContext/searchContext";

function SearchBar({placeholder}) {
  const { getSearch, searchValue } = useContext(SearchContext);

  return (
    <input
      onChange={getSearch}
      value={searchValue}
      type="text"
      placeholder= {placeholder}
    />
  )
}

export default SearchBar