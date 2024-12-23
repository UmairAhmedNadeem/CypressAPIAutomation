describe('GET /api/unknown API Tests', () => {
  const url = 'https://reqres.in/api/unknown';

  // Test Case 1: Validate the status code
  it('should return status code 200', () => {
    cy.verifyResponseStatus(url);  // Custom command to verify status code
  });

  // Test Case 2: Validate the response structure and required fields
  it('should have correct response structure for Color Data', () => {
    cy.request(url).then((response) => {
    // Validate the root-level fields
    expect(response.body).to.have.property('page').and.to.be.a('number');
    expect(response.body).to.have.property('per_page').and.to.be.a('number');
    expect(response.body).to.have.property('total').and.to.be.a('number');
    expect(response.body).to.have.property('total_pages').and.to.be.a('number');
    expect(response.body).to.have.property('data').and.to.be.an('array');
    expect(response.body).to.have.property('support').and.to.be.an('object');

    // Validate the "data" array structure
    response.body.data.forEach((item) => {
      expect(item).to.have.property('id').and.to.be.a('number');
      expect(item).to.have.property('name').and.to.be.a('string');
      expect(item).to.have.property('year').and.to.be.a('number');
      expect(item).to.have.property('color').and.to.match(/^#[0-9A-Fa-f]{6}$/);  // Validate hex color format
      expect(item).to.have.property('pantone_value').and.to.be.a('string');
    });

    // Validate the "support" object structure
    expect(response.body.support).to.have.property('url').and.to.be.a('string');
    expect(response.body.support).to.have.property('text').and.to.be.a('string');
  });
   
  });

  // Test Case 3: Validate the correct number of color records based on per_page
  it('should return the correct number of colors based on per_page', () => {
    cy.request(url).then((response) => {
      expect(response.body.data.length).to.eq(response.body.per_page);  // Validate the length of color records matches the per_page
    });
  });

  // Test Case 4: Validate the support object
  it('should validate the support object structure', () => {
    cy.verifySupportObject(url);  // Custom command to verify the support object structure
  });

  // Test Case 5: Validate total_pages and current page values
  it('should validate the total_pages and page values', () => {
    cy.request(url).then((response) => {
      const totalPages = response.body.total_pages;
      const currentPage = response.body.page;

      expect(currentPage).to.eq(1);  // Validate current page is 1 (default)
      expect(totalPages).to.be.a('number');
      expect(totalPages).to.be.greaterThan(0);  // Ensure total_pages is a valid number
    });
  });

  // Test Case 6:  Verify that no color object is empty
  it('should not have empty color objects', () => {
    cy.verifyNoEmptyUserObjects(url); // Custom command to verify no empty color objects
  });

  // Test Case 7: Validate that the Pantone values are non-empty
  it('should ensure that all Pantone values are non-empty', () => {
    cy.request(url).then((response) => {
      response.body.data.forEach((color) => {
        expect(color.pantone_value).to.not.be.empty;  // Ensure Pantone values are not empty
      });
    });
  });

  // Test Case 8: Edge Case - Test for an invalid page number (non-existent page)
  it('should return empty data for a non-existent page', () => {
    cy.request({
      method: 'GET',
      url: 'https://reqres.in/api/unknown?page=3',
      failOnStatusCode: false,  
    }).then((response) => {
      expect(response.status).to.eq(200);  // Ensure the status is 200
      expect(response.body.data).to.have.length(0);  // The data array should be empty
    });
  });

  // Test Case 9: Verify total matches the sum of color records across all pages
  it('should verify that total matches the sum of color records across all pages', () => {
    cy.request('GET', 'https://reqres.in/api/unknown?page=1')
      .then((response) => {
        const totalColors = response.body.total;
        const totalPages = response.body.total_pages;

        // Check that the sum of color records on pages 1 and 2 equals the total number of colors
        cy.request('GET', 'https://reqres.in/api/unknown?page=2')
          .then((page2Response) => {
            const page2Colors = page2Response.body.data.length;
            expect(page2Colors).to.eq(page2Response.body.per_page);
            expect(response.body.data.length + page2Colors).to.eq(totalColors);
          });
      });
  });

  // Test Case 10: Validate first and last color details
  it('should validate the first and last color details', () => {
    cy.request(url).then((response) => {
      const firstColor = response.body.data[0];
      expect(firstColor.id).to.eq(1);
      expect(firstColor.name).to.eq('cerulean');
      expect(firstColor.year).to.eq(2000);

      const lastColor = response.body.data[response.body.data.length - 1];
      expect(lastColor.id).to.eq(6);
      expect(lastColor.name).to.eq('blue turquoise');
      expect(lastColor.year).to.eq(2005);
    });
  });

  // Test Case 11: Validate the color hex codes are valid
  it('should ensure all color hex codes are valid', () => {
    cy.request(url).then((response) => {
      response.body.data.forEach((color) => {
        expect(color.color).to.match(/^#[0-9A-Fa-f]{6}$/);  // Validate color hex codes (6-digit format)
      });
    });
  });

  // Test Case 12: Check that the support URL is accessible
  it('should check that the support URL is valid and accessible', () => {
    cy.request(url).then((response) => {
      const supportUrl = response.body.support.url;
      cy.request(supportUrl).its('status').should('eq', 200);  // Verify that the support URL is accessible
    });
  });

  // Test Case 13: Verify response time is under 500ms
  it('should respond in under 500ms', () => {
    cy.verifyResponseTime(url);  // Custom command to check response time is under 500ms
  });

  // Test Case 14: Verify total_pages is calculated correctly
  it('should verify that total_pages is correctly calculated', () => {
    cy.request(url).then((response) => {
      const total = response.body.total;
      const perPage = response.body.per_page;
      const expectedTotalPages = Math.ceil(total / perPage);

      expect(response.body.total_pages).to.eq(expectedTotalPages);  // Validate that total_pages is correctly calculated
    });
  });

  // Test Case 15: Verify that the support object text is not empty
  it('should verify that the support object text is not empty', () => {
    cy.request(url).then((response) => {
      expect(response.body.support.text).to.not.be.empty;  // Ensure the support text is not empty
    });
  });

  // Test Case 16: Verify consistency across different pages
  it('should verify consistency across different pages', () => {
    cy.request('GET', 'https://reqres.in/api/unknown?page=1')
      .then((page1Response) => {
        const page1Data = page1Response.body.data;

        cy.request('GET', 'https://reqres.in/api/unknown?page=2')
          .then((page2Response) => {
            const page2Data = page2Response.body.data;

            page1Data.forEach((color) => {
              expect(page2Data).to.not.deep.include(color);  // Verify colors from page 1 don't appear on page 2
            });
          });
      });
  });
});
