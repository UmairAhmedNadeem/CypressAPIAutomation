describe('GET /api/users/23 - Non-existent User', () => {
  const apiUrl = 'https://reqres.in/api/users/23';

  it('should return status code 404 and an empty response body', () => {
    // Use the custom command for non-existent resources
    cy.apiGetNonExistent(apiUrl);
  });
});