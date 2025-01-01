# CypressAPIAutomation

#Introduction
In this project, we have created a comprehensive set of automated tests using Cypress to validate the functionality of various APIs provided by Reqres.in. 
The test cases are designed to verify the behavior of the API endpoints, including the creation, retrieval, update, and deletion of users and resources, as well as handling scenarios with delays, invalid requests, and other edge cases.

#Test Cases Breakdown
1. List Users
Endpoint: /api/users
Test Purpose: To retrieve a list of users and validate the response, pagination, and user data.

2. Single User
Endpoint: /api/users/{id}
Test Purpose: To retrieve a specific user by ID and verify that the user exists and the correct data is returned.

3. Single User Not Found
Endpoint: /api/users/{id}
Test Purpose: To verify that the API returns a 404 status when a non-existent user ID is requested.

4. List <Resource>
Endpoint: /api/unknown
Test Purpose: To retrieve a list of resources and validate the data and pagination.

5. Single <Resource>
Endpoint: /api/unknown/{id}
Test Purpose: To retrieve a specific resource and validate that the data is returned correctly.

6. Single <Resource> Not Found
Endpoint: /api/unknown/{id}
Test Purpose: To verify that the API returns a 404 when a non-existent resource ID is requested.

7. Create User
Endpoint: /api/users
Test Purpose: To create a new user and verify the response for status code 201, ensuring the correct user data is returned.

8. Update User
Endpoint: /api/users/{id}
Test Purpose: To update an existing user's information and verify the updated data in the response.

9. Patch User
Endpoint: /api/users/{id}
Test Purpose: To partially update an existing user and ensure the correct data is updated and returned.

10. Delete User
Endpoint: /api/users/{id}
Test Purpose: To delete a user by ID and verify that the user no longer exists.

11. Register - Successful/Unsuccessful
Endpoint: /api/register
Test Purpose: To test user registration with valid credentials and verify the response contains the correct id and token.

12. Login - Successful/Unsuccessful
Endpoint: /api/login
Test Purpose: To test user login with valid credentials and verify the response contains the correct token.

13. Delayed Response
Endpoint: /api/users?delay=3
Test Purpose: To test an endpoint with a delay parameter and verify that the response is delayed as expected (around 3 seconds).

#Custom Commands
To streamline the testing process and avoid code repetition, we created a set of Cypress custom commands. These commands are reusable and can be invoked across multiple tests to perform common checks.

List of Custom Commands
- verifyResponseStatus
- verifyResponseTime
- CheckAvatarUrlStatus
- checkSupportUrlStatus
- verifyEmailValidity
- verifyAvatarUrls
- verifySupportObject
- verifyNoEmptyUserObjects
- verifyNoEmptySingleresourceObject
- verifyValidEmails
- apiGetNonExistent
- verifyUserExists


#Conclusion
In this project, we have meticulously created individual test cases for each API endpoint to ensure comprehensive validation of their behavior. 
Additionally, we have implemented a set of custom Cypress commands that reduce code duplication, enhance readability, and streamline the testing process.

With these test cases and custom commands, we can confidently verify that the APIs are functioning as expected and handle various edge cases like non-existent users, invalid requests, and delayed responses.

Feel free to extend or modify the tests and custom commands as necessary to suit your needs!

