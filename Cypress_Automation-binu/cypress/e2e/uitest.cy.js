/// <reference types="Cypress" />
import HomePage from '../e2e/pageObjects/HomePage.cy'
import AmpChargePage from '../e2e/pageObjects/AmpChargePage.cy'
import AmpolEnergyPage from '../e2e/pageObjects/AmpolEnergyPage.cy'

import { visible } from "ansi-colors";

describe('UI test automation', () => {
    it('UITest Mandatory - Scenario A', () => {
        const homePage = new HomePage()
        const ampChargePage = new AmpChargePage()

        // Visit https://www.ampol.com.au/
        cy.visit("https://www.ampol.com.au/");
        cy.wait(1000);

        // Hover on ‘YOUR VEHICLE’ menu.
        // //Mouse hover to the vehicle menu by using invoke jquery show
        // cy.get("a[href*='/your-vehicle']").first()
        //     .should('be.visible')
        //     .invoke('show')
        //Mouse hover to the vehicle menu by using mousehover
        // cy.get("a[href*='/your-vehicle']").first()
       homePage.getVehicleMenu()
            .should('be.visible')
            .should('have.text', 'Your Vehicle')
            .trigger('mouseover')

        //Click on ‘EV charging’ option.
        // cy.xpath('(//a[normalize-space()="EV Charging"])[1]')
        homePage.getEvChargingOption()
            .should('have.text', 'EV Charging')
            .click({ force: true })

        //Verify that the URL is https://ampcharge.ampol.com.au
        cy.url().
            should('include', 'https://ampcharge.ampol.com.au')

        //Click on AMPOL energy icon at the top of the page.
       // cy.xpath('(//a[@class="link"])[2]')
       ampChargePage.getAmpolEnergyIcon()
            .click({ force: true })

        // Click on ‘SWITCH NOW’ button.
        //cy.get('.Hero-module_buttonContainer__sNadp > [data-testid="Button"]')
       ampChargePage.getSwitchNowButton()
            .should('have.text', 'Switch now')
            .click()

        // Verify that the URL is https://energy.ampol.com.au/sign-up/postcode
        cy.url()
            .should('include', 'https://energy.ampol.com.au/sign-up/postcode')

    })

    //     Bonus/Optional - Scenario B
    it('Bonus/Optional - Scenario B', () => {
        const ampolEnergyPage = new AmpolEnergyPage()
        // • Visit https://energy.ampol.com.au/sign-up/postcode
        cy.visit("https://energy.ampol.com.au/sign-up/postcode");
        cy.wait(1000);
        // • Enter Postcode “4011”
        // cy.get('#postcode').type('4011')
        ampolEnergyPage.getPostCode().type('4011')

        // • Select Clayfield 4011 QLD from dropdown.
       // cy.get('#postcode-dropdown').find('li[data-testid^="postcode-option-"]').each(($el, index, $list) => {
        ampolEnergyPage.getPostCodeDropdown().find('li[data-testid^="postcode-option-"]').each(($el, index, $list) => {
            const textSuburb = $el.find('div[class^="AddressAutocomplete_item__"]').text()
            if (textSuburb.includes('Clayfield 4011 QLD')) {
                expect(textSuburb).to.eq('Clayfield 4011 QLD')
                cy.wrap($el).find('div[class^="AddressAutocomplete_item__"]').click()
            }
        })

        // • Intercept the network request with Request URL:
        //  https://api.ampolenergy.com.au/onboarding/v1.0/lead & Request Method : POST
        cy.intercept('POST', 'https://api.ampolenergy.com.au/onboarding/v1.0/lead').as('posts')

        // • Click on VIEW PLANS button.
        // cy.get('button[type="submit"]')
        ampolEnergyPage.getViewPlansButton()
            .should('have.text', 'View Plans')
            .click()

        // • Write the network response to a text or JSON file.
        cy.intercept('GET', 'https://www.google.com.au/').as('posts')
        cy.wait('@posts').then((interception) => {
            console.log("INTERCEPTION: ", interception);
            const respArray = [interception.response.body]
            cy.writeFile('cypress/fixtures/leadFile.json', respArray);
            const leadId = interception.response.body.leadId

            // • Copy the leadId value from the response and go to the URL as follows :
            // https://energy.ampol.com.au/sign-up/agent?leadid={leadId}
            cy.request('https://energy.ampol.com.au/sign-up/agent?leadid=' + leadId + '')
                .then((response) => {
                    expect(response.status).to.eq(200)
                })
        })
    })
})  