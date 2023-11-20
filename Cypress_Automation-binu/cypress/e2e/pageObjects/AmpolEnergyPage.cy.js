class AmpolEnergyPage {

    getPostCode() 
    {
       return cy.get('#postcode')
    }

    getPostCodeDropdown() 
    {
        return  cy.get('#postcode-dropdown')
    }


    getViewPlansButton() 
    {
        return  cy.get('button[type="submit"]')
    }


}

export default AmpolEnergyPage