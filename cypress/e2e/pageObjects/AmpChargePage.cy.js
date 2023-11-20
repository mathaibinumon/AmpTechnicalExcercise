class AmpChargePage {

    getAmpolEnergyIcon() 
    {
        return  cy.xpath('(//a[@class="link"])[2]')
    }

    getSwitchNowButton() 
    {
       return cy.get('.Hero-module_buttonContainer__sNadp > [data-testid="Button"]')
    }

}

export default AmpChargePage