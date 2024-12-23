describe('POST /api/register API Tests', () => {
  const url = 'https://reqres.in/api/register'; // API URL for registration
  const requestBody = {
    email: 'eve.holt@reqres.in',
    password: 'pistol',
  };

  // Test Case: Validate the POST request for user registration
  it('should register a user and return status 200 with the correct response body', () => {
    cy.request({
      method: 'POST',
      url: url,               // API URL for registration
      body: requestBody,      // Request body with email and password
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((response) => {
      // Assert that the response status code is 200 (OK)
      expect(response.status).to.eq(200);

      // Assert that the response body contains 'id' and 'token'
      expect(response.body).to.have.property('id').and.to.eq(4);  // Ensure 'id' is 4
      expect(response.body).to.have.property('token').and.to.be.a('string'); // Ensure 'token' is a string
    });
  });

  // Test Case: Verify invalid request (missing password)
  it('should return error when password is missing', () => {
    const invalidRequestBody = {
      email: 'eve.holt@reqres.in',
    };

    cy.request({
      method: 'POST',
      url: url,
      body: invalidRequestBody,
      failOnStatusCode: false,  // Prevent Cypress from failing the test on 400
    }).then((response) => {
      // Assert that the response status code is 400 (Bad Request)
      expect(response.status).to.eq(400);

      // Assert that the response contains the expected error message
      expect(response.body).to.have.property('error').and.to.eq('Missing password');
    });
  });

  // Test Case: Verify invalid request (missing email)
  it('should return error when email is missing', () => {
    const invalidRequestBody = {
      password: 'pistol',
    };

    cy.request({
      method: 'POST',
      url: url,
      body: invalidRequestBody,
      failOnStatusCode: false,  // Prevent Cypress from failing the test on 400
    }).then((response) => {
      // Assert that the response status code is 400 (Bad Request)
      expect(response.status).to.eq(400);

      // Assert that the response contains the expected error message
      expect(response.body).to.have.property('error').and.to.eq('Missing email or username');
    });
  });
});
