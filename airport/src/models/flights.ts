class Flight {
    from: String = '';
    to: String = '';
    departureDate: any = 0;
    bussinesPrice: number = 0;
    economicPrice: number = 0;
    flightDuration: number = 0;
    stops: string = ""

    constructor(data: any) {
        this.from = data.from;
        this.to = data.to;
        this.departureDate = data.departureDate;
        this.bussinesPrice = data.bussinesPrice;
        this.economicPrice = data.economicPrice;
        this.flightDuration = data.flightDuration
        this.stops = data.stops;
    }
}

export default Flight;