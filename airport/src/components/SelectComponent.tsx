import Select from "react-select";
import { SortOption } from "./useFilterHook";

export const SelectComponent = (props: any) => {
  const options = [
    { value: "1", label: SortOption.CHEAPEST_BUSINESS_PRICE },
    { value: "2", label: SortOption.CHEAPEST_ECONOMIC_PRICE },
    { value: "3", label: SortOption.FASTEST },
  ];

  return (
    <div>
      {" "}
      <Select
        placeholder="Choose a sorting option"
        onChange={(selectedOption) => {
          if (selectedOption?.label === SortOption.CHEAPEST_BUSINESS_PRICE) {
            props.setSelectSortState(selectedOption?.label);
          }
          if (selectedOption?.label === SortOption.CHEAPEST_ECONOMIC_PRICE) {
            props.setSelectSortState(selectedOption?.label);
          }
          if (selectedOption?.label === SortOption.FASTEST) {
            props.setSelectSortState(selectedOption?.label);
          }
        }}
        options={options}
      />
    </div>
  );
};
