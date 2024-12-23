describe('DELETE /api/users/2 API Tests', () => {
  const url = 'https://reqres.in/api/users/2';  // The API endpoint URL to delete user with ID 2
const url2 = 'https://reqres.in/api/users/23';
  // Test Case 1: Validate DELETE request to remove an existing user
  it('should delete the user and return status 204 with no content', () => {
    cy.request({
      method: 'DELETE',
      url: url,  // API URL to delete user
    }).then((response) => {
      // Assert that the response status code is 204 (No Content)
      expect(response.status).to.eq(204);

      // The response body should be empty for a 204 status code
      expect(response.body).to.be.empty;
    });
  });

  // Test Case 2: Verify that the user no longer exists (GET request should return 404)
  it('should return 404 when trying to get the deleted user', () => {
    cy.request({
      method: 'GET',
      url: url2,  // API URL to fetch the deleted user
      failOnStatusCode: false,  // Don't fail the test on 404
    }).then((response) => {
      // Assert that the response status code is 404 (Not Found)
       expect(response.status).to.eq(404);
      
      // The response body should be empty for a 404 status code
      expect(response.body).to.deep.equal({});
     
    });
  });
});