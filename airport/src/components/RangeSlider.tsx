import * as React from "react";
import { NumberRange, RangeSlider } from "@blueprintjs/core";
import { useEffect, useState } from "react";
import _ from "lodash";

function RangeSliderComponent(props: any) {
  const [widestRange, setWidestRange] = useState([0, 0]);

  useEffect(() => {
    setWidestRange([findMinBussinesPrice(), findMaxBussinesPrice()]);
    props.setRangeValuesBussines([
      findMinBussinesPrice(),
      findMaxBussinesPrice(),
    ]);
  }, []);

  const handleRelease = (numbers: NumberRange) => {
    props.setRangeValuesBussines(numbers);
  };

  function findMinBussinesPrice() {
    const minBusinessPrice = _.chain(props.companies)
      .flatMap((c: any) => c.flights)
      .map((flight: any) => flight.bussinesPrice)
      .min()
      .value();

    return minBusinessPrice || 0;
  }

  function findMaxBussinesPrice() {
    const maxBusinessPrice = _.chain(props.companies)
      .flatMap((c: any) => c.flights)
      .map((flight: any) => flight.bussinesPrice)
      .max()
      .value();

    return maxBusinessPrice || 0;
  }

  return (
    <>
      <RangeSlider
        min={widestRange[0]}
        max={widestRange[1]}
        stepSize={1}
        value={[props.rangeValuesBussines[0], props.rangeValuesBussines[1]]}
        onChange={handleRelease}
        labelValues={[]}
      />
    </>
  );
}

export default RangeSliderComponent;
