describe('GET /api/users?page=2 API Tests', () => {
  const url = 'https://reqres.in/api/users?page=2';

  // Test Case 1: Validate the status code
  it('should return status code 200', () => {
    cy.verifyResponseStatus(url);  // Custom command to verify status code
  });

  // Test Case 2: Validate the response structure and required fields
  it('should have correct response structure for ListUser', () => {
	
	cy.request(url).then((response) => {
    // Check for the root-level fields
    expect(response.body).to.have.property('page').and.be.a('number');
    expect(response.body).to.have.property('per_page').and.be.a('number');
    expect(response.body).to.have.property('total').and.be.a('number');
    expect(response.body).to.have.property('total_pages').and.be.a('number');
    expect(response.body).to.have.property('data').and.be.an('array');
    expect(response.body).to.have.property('support').and.be.an('object');

    // Validate the structure of the 'data' array
    response.body.data.forEach((user) => {
      expect(user).to.have.property('id').and.be.a('number');
      expect(user).to.have.property('email').and.be.a('string');
      expect(user).to.have.property('first_name').and.be.a('string');
      expect(user).to.have.property('last_name').and.be.a('string');
      expect(user).to.have.property('avatar').and.be.a('string').and.to.match(/^https?:\/\/.+\.(jpg|jpeg|png|gif)$/); // Validate avatar URL
    });

    // Validate the 'support' object
    expect(response.body.support).to.have.property('url').and.be.a('string').and.to.match(/^https?:\/\/.+/); // Validate support URL
    expect(response.body.support).to.have.property('text').and.be.a('string'); // Validate support text
  });
});


  // Test Case 3: Validate the correct number of users based on per_page
  it('should return the correct number of users based on per_page', () => {
    cy.request(url).then((response) => {
      expect(response.body.data.length).to.eq(response.body.per_page);  // Validate the length of users matches the per_page
    });
  });

  // Test Case 4: Validate the support object
  it('should validate the support object structure', () => {
    cy.verifySupportObject(url);  // Custom command to verify the support object structure
  });

  // Test Case 5: Validate total_pages and current page values
  it('should validate the total_pages and page values', () => {
    cy.request(url).then((response) => {
      const totalPages = response.body.total_pages;
      const currentPage = response.body.page;

      expect(currentPage).to.eq(2);  // Validate current page is 2 as per the request
      expect(totalPages).to.be.a('number');
      expect(totalPages).to.be.greaterThan(0);  // Ensure total_pages is a valid number
    });
  });

  // Test Case 6: Edge Case - Verify that no user object is empty
  it('should not have empty user objects', () => {
    cy.verifyNoEmptyUserObjects(url);  // Custom command to verify no empty user objects
  });

  // Test Case 7: Validate that the 'avatar' URLs are valid images
  it('should verify that all avatar URLs are valid images', () => {
    cy.verifyAvatarUrls(url);  // Custom command to verify avatar URLs are valid
  });

  // Test Case 8: Edge Case - Test for invalid page number (non-existent page)
  it('should return empty data for a non-existent page', () => {
    cy.request({
      method: 'GET',
      url: 'https://reqres.in/api/users?page=3',
      failOnStatusCode: false,  
    }).then((response) => {
      expect(response.status).to.eq(200);  // Ensure the status is 200
      expect(response.body.data).to.have.length(0);  // The data array should be empty
    });
  });

  // Test Case 9: Verify total matches the sum of users across all pages
  it('should verify that total matches the sum of users across all pages', () => {
    cy.request('GET', 'https://reqres.in/api/users?page=1')
      .then((response) => {
        const totalUsers = response.body.total;
        const totalPages = response.body.total_pages;

        // Check that the sum of users on pages 1 and 2 equals the total number of users
        cy.request('GET', 'https://reqres.in/api/users?page=2')
          .then((page2Response) => {
            const page2Users = page2Response.body.data.length;
            expect(page2Users).to.eq(page2Response.body.per_page);
            expect(response.body.data.length + page2Users).to.eq(totalUsers);
          });
      });
  });

  // Test Case 10: Validate first and last user details
  it('should validate the first and last user details', () => {
    cy.request(url).then((response) => {
      const firstUser = response.body.data[0];
      expect(firstUser.id).to.eq(7);
      expect(firstUser.first_name).to.eq('Michael');
      expect(firstUser.last_name).to.eq('Lawson');

      const lastUser = response.body.data[response.body.data.length - 1];
      expect(lastUser.id).to.eq(12);
      expect(lastUser.first_name).to.eq('Rachel');
      expect(lastUser.last_name).to.eq('Howell');
    });
  });

  // Test Case 11: Verify all email addresses are valid
  it('should ensure all email addresses are valid', () => {
    cy.verifyValidEmails(url);  // Custom command to verify all email addresses
  });

  // Test Case 12: Check that avatar URLs return status code 200
  it('should check that all avatar URLs return status code 200', () => {
    cy.verifyAvatarUrls(url);  // Custom command to check avatar URL status
  });

  // Test Case 13: Check for a non-existent page number (negative case)
  it('should return 404 for a non-existent page number', () => {
    cy.request({
      method: 'GET',
      url: 'https://reqres.in/api/users?page=9999',
      failOnStatusCode: false,  // Don't fail on 404 error
    }).then((response) => {
      expect(response.status).to.eq(200);  // Ensure the response is 200
      expect(response.body.data).to.have.length(0);  // No data should be returned
    });
  });

  // Test Case 14: Verify pagination links are provided
   it('should verify that pagination links are provided', () => {
    cy.request(url).then((response) => {
      expect(response.body).to.have.property('page');
      expect(response.body).to.have.property('total_pages');
    });
  });

  // Test Case 15: Check that support URL is accessible
  it('should check that the support URL is valid and accessible', () => {
    cy.request(url).then((response) => {
      const supportUrl = response.body.support.url;
      cy.request(supportUrl).its('status').should('eq', 200);  // Verify that the support URL is accessible
    });
  });

  // Test Case 16: Verify response time is under 500ms
  it('should respond in under 500ms', () => {
    cy.verifyResponseTime(url);  // Custom command to check response time is under 500ms
  });

  // Test Case 17: Verify that total_pages is calculated correctly
  it('should verify that total_pages is correctly calculated', () => {
    cy.request(url).then((response) => {
      const total = response.body.total;
      const perPage = response.body.per_page;
      const expectedTotalPages = Math.ceil(total / perPage);

      expect(response.body.total_pages).to.eq(expectedTotalPages);  // Validate that total_pages is correctly calculated
    });
  });

  // Test Case 18: Verify consistency across different pages
  it('should verify consistency across different pages', () => {
    cy.request('GET', 'https://reqres.in/api/users?page=1')
      .then((page1Response) => {
        const page1Data = page1Response.body.data;

        cy.request('GET', 'https://reqres.in/api/users?page=2')
          .then((page2Response) => {
            const page2Data = page2Response.body.data;

            page1Data.forEach((user) => {
              expect(page2Data).to.not.deep.include(user);  // Verify users from page 1 don't appear on page 2
            });
          });
      });
  });
});
