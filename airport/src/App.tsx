import { useState, useEffect, useContext, createContext } from "react";
import { getCompanies, initializeApp } from "./firebaseConfig";

import "./App.css";
import { FilterComponent } from "./components/FilterComponent";
import Company from "./models/company";

function App() {
  const [companies, setCompanies] = useState<Company[]>([]);

  useEffect(() => {
    async function fetchCompanies() {
      initializeApp();
      try {
        const fetchedCompanies = await getCompanies();
        const companyInstances = fetchedCompanies.map(
          (data: any) => new Company(data)
        );
        setCompanies(companyInstances);
      } catch (error) {
        console.error("Error fetching companies:", error);
      }
    }

    fetchCompanies();
  }, []);

  return (
    <div className="main-component">
      <FilterComponent
        companies={companies}
        setCompanies={setCompanies}
      ></FilterComponent>
    </div>
  );
}

export default App;
