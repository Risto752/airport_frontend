import React, { useEffect, useState } from "react";
import Flights from "./Flights";
import useFilterHook from "./useFilterHook";
import { theGreatFilter } from "../firebaseConfig";

export const FilterComponent = (props: any) => {
  const {
    companyName,
    stops,
    searchValue,
    selectSortState,
    sortToggle,
    rangeValuesBussines,
    rangeValuesEconomic,
    setSearchValue,
    setSelectSortState,
    setCompanyName,
    setRangeValuesBussines,
    setRangeValuesEconomic,
    setStops,
    setSortToggle,
  } = useFilterHook();

  useEffect(() => {
    async function fetchDataAndFilter() {
      try {
        const filteredCompanies = await theGreatFilter(
          companyName,
          stops,
          searchValue,
          selectSortState,
          sortToggle,
          rangeValuesBussines,
          rangeValuesEconomic
        );

        props.setCompanies(filteredCompanies);
      } catch (error) {
        console.error("Error fetching and filtering data:", error);
      }
    }

    fetchDataAndFilter();
  }, [
    companyName,
    stops,
    searchValue,
    selectSortState,
    sortToggle,
    rangeValuesBussines,
    rangeValuesEconomic,
  ]);
  return (
    <div>
      &nbsp;
      {props.companies && props.companies.length > 0 ? (
        <Flights
          companies={props.companies}
          setCompanies={props.setCompanies}
          selectSortState={selectSortState}
          setSelectSortState={setSelectSortState}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          companyName={companyName}
          setCompanyName={setCompanyName}
          mounted={props.mounted}
          rangeValuesBussines={rangeValuesBussines}
          setRangeValuesBussines={setRangeValuesBussines}
          rangeValuesEconomic={rangeValuesEconomic}
          setRangeValuesEconomic={setRangeValuesEconomic}
          setStops={setStops}
          setSortToggle={setSortToggle}
        />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};
