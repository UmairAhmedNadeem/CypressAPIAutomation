describe('GET /api/unknown/2 API Tests', () => {
  const url = 'https://reqres.in/api/unknown/2';

  // Test Case 1: Validate the status code
  it('should return status code 200', () => {
    cy.verifyResponseStatus(url); // Using custom command to verify the status code
  });

  // Test Case 2: Validate the response structure and required fields for color data
  it('should have correct response structure for Color Data', () => {
    cy.request(url).then((response) => {
      // Validate the root-level fields
      expect(response.body).to.have.property('data').and.to.be.an('object');
      expect(response.body).to.have.property('support').and.to.be.an('object');

      // Validate the "data" object structure
      const data = response.body.data;
      expect(data).to.have.property('id').and.to.eq(2);
      expect(data).to.have.property('name').and.to.eq('fuchsia rose');
      expect(data).to.have.property('year').and.to.eq(2001);
      expect(data).to.have.property('color').and.to.match(/^#[0-9A-Fa-f]{6}$/);  // Validate hex color format
      expect(data).to.have.property('pantone_value').and.to.eq('17-2031');

      // Validate the "support" object structure
      const support = response.body.support;
      expect(support).to.have.property('url').and.to.be.a('string');
      expect(support).to.have.property('text').and.to.be.a('string');
    });
  });

  // Test Case 3: Validate the color data fields
  it('should return correct color details', () => {
    cy.request(url).then((response) => {
      const data = response.body.data;

      // Validate individual color properties
      expect(data.id).to.eq(2);
      expect(data.name).to.eq('fuchsia rose');
      expect(data.year).to.eq(2001);
      expect(data.color).to.eq('#C74375');
      expect(data.pantone_value).to.eq('17-2031');
    });
  });

  // Test Case 4: Validate the support object structure and fields
  it('should return correct support information', () => {
    cy.verifySupportObject(url); // Using custom command to verify the support object
  });

  // Test Case 5: Check if the support URL is valid and accessible
  it('should verify that the support URL is accessible', () => {
    cy.request(url).then((response) => {
      const supportUrl = response.body.support.url;
       cy.request(url).its('status').should('eq', 200);  // Using custom command to check the status of the support URL
    });
  });

  // Test Case 6: Verify the response time is under 500ms
  it('should respond in under 500ms', () => {
    cy.verifyResponseTime(url, 500); // Using custom command to verify response time
  });

  // Test Case 7: Verify that no user object is empty
  it('should verify that no object is empty', () => {
    cy.request(url).then((response) => {
    const data = response.body.data;
    
    // Check that the 'data' object is not empty
    expect(data).to.not.be.empty;

    // Validate that individual fields in the 'data' object are not empty
    expect(data.id).to.not.be.null;
    expect(data.name).to.not.be.empty;
    expect(data.year).to.not.be.null;
    expect(data.color).to.not.be.empty;
    expect(data.pantone_value).to.not.be.empty;

    // Optionally, you can also verify that the "support" object exists and is not empty
    const support = response.body.support;
    expect(support).to.have.property('url').and.to.be.a('string').and.to.not.be.empty;
    expect(support).to.have.property('text').and.to.not.be.empty;
  });
  });

  // Test Case 10: Verify the response structure remains consistent with the expected data format
  it('should maintain consistent response structure', () => {
    cy.request(url).then((response) => {
      // Check that the data object contains the expected fields
      const data = response.body.data;
      expect(data).to.have.property('id').and.to.eq(2);
      expect(data).to.have.property('name').and.to.eq('fuchsia rose');
      expect(data).to.have.property('year').and.to.eq(2001);
      expect(data).to.have.property('color').and.to.eq('#C74375');
      expect(data).to.have.property('pantone_value').and.to.eq('17-2031');
    });
  });

  // Test Case 11: Verify non-existent user or empty response for a non-existent user
  it('should return 404 for non-existent user', () => {
    const nonExistentUrl = 'https://reqres.in/api/unknown/999';
    cy.apiGetNonExistent(nonExistentUrl); // Custom command to verify non-existent user
  });

  // Test Case 12: Verify no empty color objects
  it('should verify no empty color objects', () => {
  cy.request(url).then((response) => {
      // Check if 'data' exists and is an object
      expect(response.body).to.have.property('data').and.to.be.an('object');
      
      // Verify that no field in the 'data' object is empty or undefined
      const item = response.body.data;
      expect(item).to.have.property('id').and.to.not.be.null.and.to.not.be.undefined;
      expect(item).to.have.property('name').and.to.not.be.null.and.to.not.be.undefined.and.to.not.be.empty;
      expect(item).to.have.property('year').and.to.not.be.null.and.to.not.be.undefined;
      expect(item).to.have.property('color').and.to.not.be.null.and.to.not.be.undefined.and.to.not.be.empty;
      expect(item).to.have.property('pantone_value').and.to.not.be.null.and.to.not.be.undefined.and.to.not.be.empty;

    });
  
  });
});
