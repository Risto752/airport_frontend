import React from "react";
import Select from "react-select";
import { SortOrder } from "./useFilterHook";

export const SelectComponentSort = (props: any) => {
  const options = [
    { value: SortOrder.ASCENDING, label: "Ascending" },
    { value: SortOrder.DESCENDING, label: "Descending" },
  ];
  return (
    <div>
      {" "}
      <Select
        placeholder="Choose the way of sorting"
        options={options}
        onChange={(selectedOption) => {
          if (selectedOption?.value === SortOrder.ASCENDING) {
            props.setSortToggle(SortOrder.ASCENDING);
          }

          if (selectedOption?.value === SortOrder.DESCENDING) {
            props.setSortToggle(SortOrder.DESCENDING);
          }
        }}
      ></Select>
    </div>
  );
};
