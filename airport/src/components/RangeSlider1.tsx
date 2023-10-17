import * as React from "react";
import { NumberRange, RangeSlider } from "@blueprintjs/core";
import { useEffect, useState } from "react";
import _ from "lodash";

function RangeSliderComponent1(props: any) {
  const [widestRange, setWidestRange] = useState([0, 0]);

  useEffect(() => {
    setWidestRange([findMinEconomicPrice(), findMaxEconomicPrice()]);
    props.setRangeValuesEconomic([
      findMinEconomicPrice(),
      findMaxEconomicPrice(),
    ]);
  }, []);

  const handleRelease = (numbers: NumberRange) => {
    props.setRangeValuesEconomic(numbers);
  };

  function findMinEconomicPrice() {
    const minEconomicPrice = _.chain(props.companies)
      .flatMap((c: any) => c.flights)
      .map((flight: any) => flight.economicPrice)
      .min()
      .value();

    return minEconomicPrice || 0;
  }

  function findMaxEconomicPrice() {
    const maxEconomicPrice = _.chain(props.companies)
      .flatMap((c: any) => c.flights)
      .map((flight: any) => flight.economicPrice)
      .max()
      .value();

    return maxEconomicPrice || 0;
  }

  return (
    <>
      <RangeSlider
        min={widestRange[0]}
        max={widestRange[1]}
        stepSize={1}
        value={[props.rangeValuesEconomic[0], props.rangeValuesEconomic[1]]}
        onChange={handleRelease}
        labelValues={[]}
      />
    </>
  );
}

export default RangeSliderComponent1;
