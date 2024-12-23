describe('PUT /api/users/{id} API Tests', () => {
  const url = 'https://reqres.in/api/users/2';  // The API endpoint URL for updating user with ID 2
  const requestBody = {
    name: 'morpheus',
    job: 'zion resident',
  };

  // Test Case 1: Validate PUT request to update an existing user
  it('should update the user and return status 200 with correct response body', () => {
    cy.request({
      method: 'PATCH',
      url: url,                  // API URL to update user
      body: requestBody,         // Request body with updated data
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((response) => {
      // Assert that the response status code is 200 (OK)
      expect(response.status).to.eq(200);

      // Assert that the response body contains the updated properties
      expect(response.body).to.have.property('name', 'morpheus');
      expect(response.body).to.have.property('job', 'zion resident');

      // Assert that the response includes an 'updatedAt' field
      expect(response.body).to.have.property('updatedAt').and.be.a('string'); // Ensure updatedAt is returned
    });
  });

  
});