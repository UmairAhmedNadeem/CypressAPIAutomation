describe('GET /api/users?delay=3 API Tests', () => {
  const url = 'https://reqres.in/api/users?delay=3'; // API URL with delay

  // Test Case 1: Validate the GET request to fetch users with delay
  it('should return a list of users with correct pagination and data', () => {
    cy.request({
      method: 'GET',
      url: url,  // API URL with delay parameter
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((response) => {
      // Assert that the response status code is 200 (OK)
      expect(response.status).to.eq(200);

      // Assert that the response body contains pagination details
      expect(response.body).to.have.property('page').and.to.eq(1);         // Current page should be 1
      expect(response.body).to.have.property('per_page').and.to.eq(6);     // Per page should be 6
      expect(response.body).to.have.property('total').and.to.eq(12);      // Total records should be 12
      expect(response.body).to.have.property('total_pages').and.to.eq(2); // Total pages should be 2

      // Assert that the 'data' array contains 6 users
      expect(response.body.data).to.have.length(6); // Should return 6 users

      // Assert that each user has the necessary fields
      response.body.data.forEach((user) => {
        expect(user).to.have.property('id').and.to.be.a('number');
        expect(user).to.have.property('email').and.to.be.a('string');
        expect(user).to.have.property('first_name').and.to.be.a('string');
        expect(user).to.have.property('last_name').and.to.be.a('string');
        expect(user).to.have.property('avatar').and.to.be.a('string');
      });

      // Assert that the support information is present and valid
      expect(response.body).to.have.property('support');
      expect(response.body.support).to.have.property('url').and.to.be.a('string');
      expect(response.body.support).to.have.property('text').and.to.be.a('string');
    });
  });

  // Test Case 2: Check for proper delay before the response
  it('should observe a delay before the response is received', () => {
    const startTime = new Date().getTime();

    cy.request({
      method: 'GET',
      url: url,
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(() => {
      const endTime = new Date().getTime();
      const elapsedTime = endTime - startTime;

      // Assert that the response delay is approximately 3 seconds (with a small tolerance)
      expect(elapsedTime).to.be.greaterThan(2900);  // Should be at least 2.9 seconds
      expect(elapsedTime).to.be.lessThan(4000);     // Should be less than 4 seconds
    });
  });
});