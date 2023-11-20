/// <reference types="Cypress" />


describe('API test automation', () => {
    it('API test queries Weather API', () => {
        // Write a script which queries Weather API and get the current weather details[Get air quality
        //     data] for Sydney 
        cy.request({
            method: 'GET',
            url: 'https://api.weatherapi.com/v1/current.json',
            qs: {
                key: '6216bd84c7ee4ca5b4a30610232011',
                 q: 'Sydney',
                 aqi: 'no'
                 }
        //  Once the response is received, read the attributes from the response and extract the
        // temperature in celsius from the response and store in a results file.
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body.current).to.have.property('temp_c')
            const respArray = ["temp in sydney", response.body.current.temp_c]
            cy.writeFile('cypress/fixtures/resultsFile.json', respArray);
        })
    })
})
