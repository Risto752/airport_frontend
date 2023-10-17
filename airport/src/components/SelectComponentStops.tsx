import React from "react";
import Select from "react-select";

const Stops = {
  DIRECT: "Direct",
  _1_STOP: "1 stop",
};

export const SelectComponentStops = (props: any) => {
  // useContext
  const options = [
    { value: "1", label: Stops.DIRECT },
    { value: "2", label: Stops._1_STOP },
  ];
  return (
    <div>
      <Select
        placeholder="Choose number of stops"
        options={options}
        onChange={(selectedOption) => {
          if (selectedOption?.label === Stops.DIRECT) {
            props.setStops(Stops.DIRECT);
          }

          if (selectedOption?.label === Stops._1_STOP) {
            props.setStops(Stops._1_STOP);
          }
        }}
      ></Select>
    </div>
  );
};
