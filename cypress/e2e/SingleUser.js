describe('GET /api/users/2 API Tests', () => {
  const url = 'https://reqres.in/api/users/2'; // Correct URL

  // Test Case 1: Validate the status code
  it('should return status code 200', () => {
    cy.verifyResponseStatus(url); // Using the custom command to verify the status
  });

  // Test Case 2: Validate the response structure and required fields
  it('should have correct response structure', () => {
    cy.request(url).then((response) => {
      const user = response.body.data; // Corrected variable name
      expect(user).to.have.property('id').and.be.a('number');
      expect(user).to.have.property('email').and.be.a('string');
      expect(user).to.have.property('first_name').and.be.a('string');
      expect(user).to.have.property('last_name').and.be.a('string');
      expect(user).to.have.property('avatar').and.be.a('string');
    });
  });

  // Test Case 3: Validate avatar URL status
  it('should check that avatar URL is valid', () => {
    cy.request(url).then((response) => {
      cy.checkAvatarUrlStatus(response.body.data.avatar); // Using the custom command to verify avatar URL status
    });
  });

  // Test Case 4: Validate email format
  it('should ensure the email address is valid', () => {
    cy.request(url).then((response) => {
      cy.verifyEmailValidity(response.body.data.email); // Using the custom command to verify email validity
    });
  });

  // Test Case 5: Verify that the user ID is correct
  it('should verify that the user ID is 2', () => {
    cy.request(url).then((response) => {
      expect(response.body.data.id).to.eq(2); // Verify that the user ID is 2
    });
  });

  // Test Case 6: Check if user has an avatar
  it('should verify that the user has an avatar', () => {
    cy.request(url).then((response) => {
      expect(response.body.data.avatar).to.not.be.empty; // Ensure the avatar is not empty
    });
  });

  // Test Case 7: Check if user information is not empty
  it('should verify that user data is not empty', () => {
    cy.request(url).then((response) => {
      const user = response.body.data;
      expect(user).to.not.be.empty; // Ensure the user object is not empty
    });
  });

  // Test Case 8: Check for invalid user ID (negative test case)
  it('should return 404 for an invalid user ID', () => {
    cy.request({
      method: 'GET',
      url: 'https://reqres.in/api/users/9999', // Invalid user ID
      failOnStatusCode: false, // Don't fail on status code other than 2xx
    }).then((response) => {
      expect(response.status).to.eq(404); // Verify the status code is 404
    });
  });
});
