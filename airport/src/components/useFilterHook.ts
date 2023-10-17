import { useState } from "react";

const SortOrder = {
  ASCENDING: "asc",
  DESCENDING: "desc",
};

const SortOption = {
  CHEAPEST_BUSINESS_PRICE: "Cheapest business price",
  CHEAPEST_ECONOMIC_PRICE: "Cheapest economic price",
  FASTEST: "Fastest",
  
};

function useFilterHook(){


    const [selectSortState, setSelectSortState] = useState(SortOption.CHEAPEST_BUSINESS_PRICE);
  const [searchValue, setSearchValue] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [rangeValuesBussines, setRangeValuesBussines] = useState([0, 0]);
  const [rangeValuesEconomic, setRangeValuesEconomic] = useState([0,0])
  const [stops, setStops] = useState("")
  const [sortToggle, setSortToggle] = useState(SortOrder.ASCENDING)


  let filterObject = {
    searchValue: searchValue,
    setSearchValue: setSearchValue,
    selectSortState: selectSortState,
    setSelectSortState: setSelectSortState,
    companyName: companyName,
    setCompanyName: setCompanyName,
    rangeValuesBussines: rangeValuesBussines,
    setRangeValuesBussines: setRangeValuesBussines,
     rangeValuesEconomic: rangeValuesEconomic,
    setRangeValuesEconomic: setRangeValuesEconomic,
    stops: stops,
    setStops: setStops,
    sortToggle:sortToggle,
    setSortToggle: setSortToggle,
  };

  return filterObject

}

export default useFilterHook;
export {SortOrder,SortOption}