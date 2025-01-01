**Cypress API Automation**

**Introduction**

In this project, we have developed a comprehensive suite of automated tests using Cypress to validate the functionality of various APIs provided by Reqres.in.
The test cases aim to verify the behavior of API endpoints, including the creation, retrieval, update, and deletion of users and resources. Additionally, they cover edge cases such as delayed responses, invalid requests, and non-existent resources.

**API URL : https://reqres.in/**

**Test Cases Breakdown**
1. List Users
Endpoint: /api/users
Test Purpose: Validate the retrieval of a user list, including response data, pagination, and individual user details.
2. Single User
Endpoint: /api/users/{id}
Test Purpose: Verify the retrieval of a specific user by ID, ensuring correct user data is returned.
3. Single User Not Found
Endpoint: /api/users/{id}
Test Purpose: Confirm that the API returns a 404 status for non-existent user IDs.
4. List Resources
Endpoint: /api/unknown
Test Purpose: Validate the retrieval of resource data and pagination.
5. Single Resource
Endpoint: /api/unknown/{id}
Test Purpose: Verify the retrieval of a specific resource with correct data.
6. Single Resource Not Found
Endpoint: /api/unknown/{id}
Test Purpose: Confirm a 404 status is returned for non-existent resource IDs.
7. Create User
Endpoint: /api/users
Test Purpose: Test user creation and validate the response for status code 201 with accurate user data.
8. Update User
Endpoint: /api/users/{id}
Test Purpose: Verify updating user details and the accuracy of the returned data.
9. Patch User
Endpoint: /api/users/{id}
Test Purpose: Test partial updates to a user and validate the updated response.
10. Delete User
Endpoint: /api/users/{id}
Test Purpose: Verify user deletion and confirm the user no longer exists.
11. Register - Successful/Unsuccessful
Endpoint: /api/register
Test Purpose: Test user registration with valid/invalid credentials and verify response for ID and token.
12. Login - Successful/Unsuccessful
Endpoint: /api/login
Test Purpose: Test login functionality with valid/invalid credentials and ensure token validation.
13. Delayed Response
Endpoint: /api/users?delay=3

Test Purpose: Verify endpoint behavior with a delay parameter, ensuring the response is delayed as expected (~3 seconds).

**Custom Commands**

To enhance the efficiency of the testing process and eliminate code duplication, we have implemented reusable Cypress custom commands. These commands simplify validation and are invoked across multiple tests.

**List of Custom Commands**

verifyResponseStatus

verifyResponseTime

checkAvatarUrlStatus

checkSupportUrlStatus

verifyEmailValidity

verifyAvatarUrls

verifySupportObject

verifyNoEmptyUserObjects

verifyNoEmptySingleResourceObject

verifyValidEmails

apiGetNonExistent

verifyUserExists

**Conclusion**

This project provides a robust framework for testing Reqres.in APIs. Each test case ensures thorough validation of API behavior, while the custom commands enhance code readability and reusability.

By covering a wide range of scenarios, including edge cases like non-existent resources, invalid requests, and delayed responses, this framework ensures the reliability of the APIs.

Feel free to extend or customize the tests and commands to meet your specific requirements!
