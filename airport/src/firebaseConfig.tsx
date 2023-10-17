import firebase from "firebase/app";
import "firebase/firestore";
import Company from "./models/company";
import { SortOrder, SortOption } from "./components/useFilterHook";

const firebaseConfig = {
  apiKey: "AIzaSyBHWQrqPZfAEhnFT-hjPnpE-LiU6xGdmNk",
  authDomain: "airport-d8ab3.firebaseapp.com",
  projectId: "airport-d8ab3",
  storageBucket: "airport-d8ab3.appspot.com",
  messagingSenderId: "1079069419642",
  appId: "1:1079069419642:web:964df5a9f56644bcb8b3c3",
};

export const initializeApp = () => {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  } else {
    firebase.app();
  }
};

export const getCompanies = async () => {
  try {
    const snapshot = await firebase.firestore().collection("company").get();
    const companiesData = snapshot.docs.map((doc) => doc.data());
    return companiesData;
  } catch (error) {
    console.error("Error fetching companies:", error);
    throw error;
  }
};

export const getAllCompanyNamesAndIds = async () => {
  try {
    const result = await firebase.firestore().collection("company").get();

    const companies = result.docs.map((doc) => {
      return new Company({ id: doc.id, ...doc.data() });
    });

    const companyNames = companies.map((company) => {
      return { value: company.id, label: company.title };
    });

    return companyNames;
  } catch (error: any) {
    throw new Error("Error fetching company names and IDs: " + error.message);
  }
};

export const theGreatFilter = async (
  companyName: string,
  stops: string,
  location: string,
  selectSortState: string,
  sortToggle: string,
  rangeValuesBussines: number[],
  rangeValuesEconomic: number[]
) => {
  if (firebase.apps.length) {
    const result = await firebase.firestore().collection("company").get();
    const companies: Company[] = result.docs.map(
      (l) => new Company({ id: l.id, ...l.data() })
    );

    let filteredCompanies: Company[] = [...companies];

    if (companyName !== "") {
      filteredCompanies = filteredCompanies.filter(
        (c) => c.title === companyName
      );
    }

    if (stops !== "") {
      filteredCompanies = filteredCompanies.filter((c) => {
        c.flights = c.flights.filter((flight) => {
          return flight.stops === stops;
        });
        return c.flights.length > 0;
      });
    }

    if (location !== "") {
      let testFilteredCompanies = filteredCompanies;

      testFilteredCompanies = testFilteredCompanies.filter((c) => {
        c.flights = c.flights.filter((flight) => {
          return flight.to === location || flight.from === location;
        });

        return c.flights.length > 0;
      });

      if (testFilteredCompanies.length > 0) {
        filteredCompanies = filteredCompanies.filter((c) => {
          c.flights = c.flights.filter((flight) => {
            return flight.to === location || flight.from === location;
          });
          return c.flights.length > 0;
        });
      } else {
        // do nothing
      }
    }

    if (selectSortState !== "") {
      if (sortToggle === SortOrder.ASCENDING) {
        if (selectSortState === SortOption.CHEAPEST_BUSINESS_PRICE) {
          filteredCompanies.forEach((company) => {
            company.flights.sort((a, b) => a.bussinesPrice - b.bussinesPrice);
          });
        }

        if (selectSortState === SortOption.CHEAPEST_ECONOMIC_PRICE) {
          filteredCompanies.forEach((company) => {
            company.flights.sort((a, b) => a.economicPrice - b.economicPrice);
          });
        }

        if (selectSortState === SortOption.FASTEST) {
          filteredCompanies.forEach((company) => {
            company.flights.sort((a, b) => a.flightDuration - b.flightDuration);
          });
        }
      } else if (sortToggle === SortOrder.DESCENDING) {
        if (selectSortState === SortOption.CHEAPEST_BUSINESS_PRICE) {
          filteredCompanies.forEach((company) => {
            company.flights.sort((a, b) => b.bussinesPrice - a.bussinesPrice);
          });
        }

        if (selectSortState === SortOption.CHEAPEST_ECONOMIC_PRICE) {
          filteredCompanies.forEach((company) => {
            company.flights.sort((a, b) => b.economicPrice - a.economicPrice);
          });
        }

        if (selectSortState === SortOption.FASTEST) {
          filteredCompanies.forEach((company) => {
            company.flights.sort((a, b) => b.flightDuration - a.flightDuration);
          });
        }
      }
    }

    filteredCompanies.forEach((c) => {
      c.flights = c.flights.filter((f) => {
        return (
          f.bussinesPrice >= rangeValuesBussines[0] &&
          f.bussinesPrice <= rangeValuesBussines[1]
        );
      });
    });

    filteredCompanies.forEach((c) => {
      c.flights = c.flights.filter((f) => {
        return (
          f.economicPrice >= rangeValuesEconomic[0] &&
          f.economicPrice <= rangeValuesEconomic[1]
        );
      });
    });

    return filteredCompanies;
  }
};
