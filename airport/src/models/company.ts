import Flight from "./flights";

class Company {
    id: string = '';
    title: String = '';
    flights: Array<Flight> = [];

    constructor(data: any) {
        this.id = data.id;
        this.title = data.title;
        this.flights = data.flights?.map((el: Flight) => new Flight(el));
    }


    
}

export default Company;