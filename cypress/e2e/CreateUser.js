describe('POST /api/users API Tests', () => {
  const url = 'https://reqres.in/api/users';  // The API endpoint URL
  const requestBody = {
    name: 'morpheus',
    job: 'leader',
  };

  let userId; // Store the ID of the created user

  // Test Case: Validate POST request to create a user
  it('should create a user and return status 201 with correct response body', () => {
    cy.request({
      method: 'POST',
      url: url,               // API URL
      body: requestBody,      // Request body
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((response) => {
      // Assert that the response status code is 201 (Created)
      expect(response.status).to.eq(201);

      // Assert that the response body contains the expected properties
      expect(response.body).to.have.property('name', 'morpheus');
      expect(response.body).to.have.property('job', 'leader');
      expect(response.body).to.have.property('id').and.be.a('string');  // ID should be a string
      expect(response.body).to.have.property('createdAt').and.be.a('string'); // createdAt should be a string (valid date format)

      // Store the user ID for future verification
      userId = response.body.id;

      // Optionally, you can check that the createdAt date is a valid ISO string
      const createdAt = new Date(response.body.createdAt);
      expect(createdAt.toISOString()).to.eq(response.body.createdAt); // Ensure createdAt is in ISO format
    });
  });

  
  // Test Case: Validate POST request with long job description
  it('should successfully create user with a long job description', () => {
    const longJobDescription = 'This is a very long job description that exceeds typical lengths and serves as a test case for extreme input';

    const longJobData = {
      name: 'morpheus',
      job: longJobDescription,
    };

    cy.request({
      method: 'POST',
      url: url,
      body: longJobData,
    }).then((response) => {
      // Assert that the response status code is 201 (Created)
      expect(response.status).to.eq(201);

      // Assert that the response body contains the correct job description
      expect(response.body).to.have.property('name', 'morpheus');
      expect(response.body).to.have.property('job', longJobDescription);
      expect(response.body).to.have.property('id').and.to.be.a('string');  // Ensure ID is a string
      expect(response.body).to.have.property('createdAt').and.to.be.a('string'); // Ensure createdAt is returned
    });
  });

});
