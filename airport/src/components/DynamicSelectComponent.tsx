import Select from "react-select";
import React, { useEffect, useState } from "react";
import { getAllCompanyNamesAndIds } from "../firebaseConfig";

interface CompanyOption {
  value: string;
  label: String;
}

export const DynamicSelectComponent = (props: any) => {
  const [companyNames, setCompanyNames] = useState<CompanyOption[]>([]);

  useEffect(() => {
    async function fetchCompanyNames() {
      try {
        const namesAndIds = await getAllCompanyNamesAndIds();
        setCompanyNames(namesAndIds);
      } catch (error) {
        console.error("Error fetching company names and IDs:", error);
      }
    }

    fetchCompanyNames();
  }, []);

  return (
    <div>
      <Select
        placeholder="Choose a company"
        options={companyNames}
        onChange={(selectedOption: any) => {
          props.setCompanyName(selectedOption.label);
        }}
      ></Select>
    </div>
  );
};
