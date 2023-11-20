class HomePage {

    getVehicleMenu() 
    {
        return cy.get("a[href*='/your-vehicle']").first()
    }

    getEvChargingOption() 
    {
        return  cy.xpath('(//a[normalize-space()="EV Charging"])[1]')
    }

}

export default HomePage