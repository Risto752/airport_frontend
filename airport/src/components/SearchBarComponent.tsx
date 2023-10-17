import { InputGroup } from "@blueprintjs/core";

export const SearchBarComponent = (props: any) => {
  return (
    <div>
      <InputGroup
        leftIcon="filter"
        placeholder="Search by location"
        value={props.searchValue}
        onChange={(event) => {
          props.setSearchValue(event.target.value);
        }}
      ></InputGroup>
    </div>
  );
};
