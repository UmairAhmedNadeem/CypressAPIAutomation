// Custom command to verify response status code
Cypress.Commands.add('verifyResponseStatus', (url, expectedStatus = 200) => {
  cy.request(url).then((response) => {
    expect(response.status).to.eq(expectedStatus);
  });
});

// Custom command to check response time is under a certain threshold
Cypress.Commands.add('verifyResponseTime', (url, maxTime = 500) => {
  cy.request(url).its('duration').should('be.lessThan', maxTime);
});

// Custom command to check the avatar URL status
Cypress.Commands.add('checkAvatarUrlStatus', (url) => {
  cy.request(url).its('status').should('eq', 200);
});

Cypress.Commands.add('checkSupportUrlStatus', (url) => {
  cy.request(url).its('status').should('eq', 200);
});

// Custom command to verify if the email is valid
Cypress.Commands.add('verifyEmailValidity', (email) => {
  expect(email).to.match(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/);
});

// Custom command to verify that all avatar URLs return status code 200
Cypress.Commands.add('verifyAvatarUrls', (url) => {
  cy.request(url).then((response) => {
    response.body.data.forEach((user) => {
      cy.request(user.avatar).its('status').should('eq', 200);
    });
  });
});

// Custom command to validate the support object
Cypress.Commands.add('verifySupportObject', (url) => {
  cy.request(url).then((response) => {
    expect(response.body.support).to.have.property('url').and.be.a('string');
    expect(response.body.support).to.have.property('text').and.be.a('string');
  });
});

// Custom command to verify that no user object is empty
Cypress.Commands.add('verifyNoEmptyUserObjects', (url) => {
  cy.request(url).then((response) => {
    response.body.data.forEach((user) => {
      expect(user).to.not.be.empty;
    });
  });
});

// Custom command to verify that a single resource object is not empty
Cypress.Commands.add('verifyNoEmptySingleresourceObject', (url) => {
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

// Custom command to verify email addresses are valid
Cypress.Commands.add('verifyValidEmails', (url) => {
  cy.request(url).then((response) => {
    response.body.data.forEach((user) => {
      expect(user.email).to.match(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/);
    });
  });
});

// Custom command to verify if the non-existent user or user is empty
Cypress.Commands.add('apiGetNonExistent', (url) => {
  cy.request({
    method: 'GET',
    url: url,
    failOnStatusCode: false, // Prevent Cypress from failing the test on 404
  }).then((response) => {
    // Assert that the status code is 404
    expect(response.status).to.eq(404);

    // Assert that the response body is an empty object
    expect(response.body).to.deep.equal({});
  });
});

// Custom command to verify if the user exists
Cypress.Commands.add('verifyUserExists', (userId) => {
  cy.request(`https://reqres.in/api/users/${userId}`).then((response) => {
    expect(response.status).to.eq(200);  // Assert that the status code is 200 (OK)
    expect(response.body.data).to.have.property('id').and.to.eq(Number(userId));  // Check if the user ID matches
  });
});

// Custom command to create a user
Cypress.Commands.add('createUser', (name, job) => {
  cy.request({
    method: 'POST',
    url: 'https://reqres.in/api/users',
    body: { name, job },
  }).then((response) => {
    expect(response.status).to.eq(201);  // Assert that the status code is 201 (Created)
    expect(response.body).to.have.property('name').and.to.eq(name);  // Ensure name is returned correctly
    expect(response.body).to.have.property('job').and.to.eq(job);  // Ensure job is returned correctly
    expect(response.body).to.have.property('id').and.to.be.a('string');  // Ensure user has an ID
  });
});

// Custom command to verify that no fields are empty in a user object
Cypress.Commands.add('verifyNoEmptyFields', (url) => {
  cy.request(url).then((response) => {
    const user = response.body.data;

    // Check that important fields are not empty
    expect(user).to.have.property('name').and.to.not.be.null.and.to.not.be.empty;
    expect(user).to.have.property('job').and.to.not.be.null.and.to.not.be.empty;
    expect(user).to.have.property('id').and.to.not.be.null.and.to.not.be.empty;
    expect(user).to.have.property('createdAt').and.to.not.be.null.and.to.not.be.empty;
  });
});

// Custom command to verify the response structure
Cypress.Commands.add('verifyResponseStructure', (response) => {
  // Validate that the response body contains 'data' and 'support'
  expect(response.body).to.have.property('name').and.to.be.a('string');
  expect(response.body).to.have.property('job').and.to.be.a('string');
  expect(response.body).to.have.property('id').and.to.be.a('string');
  expect(response.body).to.have.property('createdAt').and.to.be.a('string');
});

// Custom command to verify that color objects are not empty
Cypress.Commands.add('verifyNoEmptyColorObjects', (url) => {
  cy.request(url).then((response) => {
    // Check if 'data' exists and is an array
    expect(response.body).to.have.property('data').and.to.be.an('array');
    
    // Loop through each object in the 'data' array and verify that none of the required fields are empty
    response.body.data.forEach((item) => {
      // Verify that no field is empty or undefined
      expect(item).to.have.property('id').and.to.not.be.null.and.to.not.be.undefined;
      expect(item).to.have.property('name').and.to.not.be.null.and.to.not.be.undefined.and.to.not.be.empty;
      expect(item).to.have.property('year').and.to.not.be.null.and.to.not.be.undefined;
      expect(item).to.have.property('color').and.to.not.be.null.and.to.not.be.undefined.and.to.not.be.empty;
      expect(item).to.have.property('pantone_value').and.to.not.be.null.and.to.not.be.undefined.and.to.not.be.empty;
    });
  });
});
