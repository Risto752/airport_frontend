import React, { useEffect, useState } from "react";
import Company from "../models/company";
import Flight from "../models/flights";
import { Cell, Column, Table2 } from "@blueprintjs/table";
import RangeSliderComponent from "./RangeSlider";
import { SelectComponent } from "./SelectComponent";
import { DynamicSelectComponent } from "./DynamicSelectComponent";
import { SearchBarComponent } from "./SearchBarComponent";
import RangeSliderComponent1 from "./RangeSlider1";
import { SelectComponentStops } from "./SelectComponentStops";
import { SelectComponentSort } from "./SelectComponentSort";
import _ from "lodash";

function Flights(props: any) {
  const getMaxNumberOfFlights = () => {
    const maxFlightCount =
      _.maxBy(props.companies, (c: any) => c.flights.length)?.flights.length ||
      0;
    return maxFlightCount;
  };

  const [companyNames, setCompanyNames] = useState([]);

  const getRowHeights = () => {
    const maxNumberOfFlights = getMaxNumberOfFlights();
    const rowHeights = _.times(maxNumberOfFlights, () => 130);
    return rowHeights;
  };

  const getColumnWidths = () => {
    const columnWidths = _.times(props.companies.length, () => 200);
    return columnWidths;
  };

  const formatFlight = (flight: Flight) => {
    if (!flight.from && !flight.to) return <></>;
    return (
      <div>
        <div>
          Destination: {flight.from} - {flight.to}{" "}
        </div>
        <div>
          Departure Date: {flight.departureDate.toDate().toDateString()}{" "}
        </div>
        <div>Businness Price: {flight.bussinesPrice} $</div>
        <div>Economic Price: {flight.economicPrice} $</div>
        <div>Flight duration: {flight.flightDuration} Hours</div>
        <div>Stops: {flight.stops} </div>
      </div>
    );
  };

  const renderCell = (rowIndex: any, id: any) => {
    // salje se uvjek element
    return (
      <Cell>
        {props.companies[id].flights[rowIndex]
          ? formatFlight(props.companies[id].flights[rowIndex])
          : ""}
      </Cell>
    );
  };

  if (props.companies.length) {
    return (
      <div className="row mb-3">
        <div className="col-md-6" style={{ padding: "35px" }}>
          <label className="form-label">Bussiness class:</label>{" "}
          <RangeSliderComponent
            companies={props.companies}
            rangeValuesBussines={props.rangeValuesBussines}
            setRangeValuesBussines={props.setRangeValuesBussines}
            setCompanies={(e: any) => {
              props.setCompanies(e);
            }}
          ></RangeSliderComponent>
        </div>
        <div className="col-md-6" style={{ padding: "35px" }}>
          <label className="form-label">Economic class:</label>
          <RangeSliderComponent1
            companies={props.companies}
            rangeValuesEconomic={props.rangeValuesEconomic}
            setRangeValuesEconomic={props.setRangeValuesEconomic}
            setCompanies={(e: any) => {
              props.setCompanies(e);
            }}
          ></RangeSliderComponent1>
        </div>{" "}
        <div className="row mb-3">
          <div className="col-md-6">
            <DynamicSelectComponent
              companies={props.companies}
              setCompanies={props.setCompanies}
              setCompanyNames={setCompanyNames}
              companyName={props.companyName}
              setCompanyName={props.setCompanyName}
            ></DynamicSelectComponent>
          </div>
          <div className="col-md-6">
            <SelectComponent
              companies={props.companies}
              setCompanies={props.setCompanies}
              selectSortState={props.selectSortState}
              setSelectSortState={props.setSelectSortState}
            ></SelectComponent>
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-md-6">
            <SelectComponentSort
              setSortToggle={props.setSortToggle}
            ></SelectComponentSort>
          </div>
          <div className="col-md-6">
            <SearchBarComponent
              searchValue={props.searchValue}
              setSearchValue={props.setSearchValue}
            ></SearchBarComponent>
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-md-6">
            <SelectComponentStops
              stops={props.stops}
              setStops={props.setStops}
            ></SelectComponentStops>
          </div>
        </div>
        <Table2
          numRows={getMaxNumberOfFlights()}
          rowHeights={getRowHeights()}
          columnWidths={getColumnWidths()}
          cellRendererDependencies={props.companies}
        >
          {props.companies.map((c: Company, companyIndex: any) => (
            <Column
              key={companyIndex}
              name={String(c.title)}
              cellRenderer={(rowIndex) => renderCell(rowIndex, companyIndex)}
            />
          ))}
        </Table2>
      </div>
    );
  } else
    return (
      <div className="alert alert-info">
        Nema letova koji su definisani po Vašim kriterijumima
      </div>
    );
}

export default Flights;
