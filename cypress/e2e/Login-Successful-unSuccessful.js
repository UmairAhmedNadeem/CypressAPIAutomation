describe('POST /api/login API Tests', () => {
  const url = 'https://reqres.in/api/login'; // API URL for login
  const requestBody = {
    email: 'eve.holt@reqres.in',
    password: 'cityslicka',
  };

  // Test Case 1:(Login - successful) Validate the POST request for user login
  it('should login a user and return status 200 with a token', () => {
    cy.request({
      method: 'POST',
      url: url,               // API URL for login
      body: requestBody,      // Request body with email and password
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((response) => {
      // Assert that the response status code is 200 (OK)
      expect(response.status).to.eq(200);

      // Assert that the response body contains the 'token'
      expect(response.body).to.have.property('token').and.to.be.a('string'); // Ensure 'token' is a string
    });
  });

  // Test Case 2:(Login - unsuccessful) Verify login with missing email
  it('should return error when email is missing', () => {
    const invalidRequestBody = {
      password: 'cityslicka',
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

  // Test Case 3:(Login - unsuccessful) Verify login with missing password
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

});
