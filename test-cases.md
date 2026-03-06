
🔐 TEST CASE 1: Registration Page

Test ID: TC-REG-001
Description: Verify registration page loads
Steps: Navigate to http://localhost:3000/register
Expected: Registration page loads successfully
Actual: Registration page loaded in 115ms
Status: PASS
Logs: GET /register 200 in 115ms
________________________________________________________________


🔐 TEST CASE 2: Login Page

Test ID: TC-LOGIN-001
Description: Verify login page loads
Steps: Navigate to http://localhost:3000/login
Expected: Login page loads successfully
Actual: Login page loaded in 88ms
Status: PASS
Logs: GET /login 200 in 88ms
________________________________________________________________


🔐 TEST CASE 3: Dashboard Page

Test ID: TC-DASH-001
Description: Verify dashboard loads
Steps: Navigate to http://localhost:3000/dashboard
Expected: Dashboard loads successfully
Actual: Dashboard loaded in 155ms
Status: PASS
Logs: GET /dashboard 200 in 155ms
________________________________________________________________


🔐 TEST CASE 4: Profile Page

Test ID: TC-PROF-001
Description: Verify profile page loads
Steps: Navigate to http://localhost:3000/profile
Expected: Profile page loads successfully
Actual: Profile page loaded in 81ms
Status: PASS
Logs: GET /profile 200 in 81ms
________________________________________________________________


🔐 TEST CASE 5: Admin Page

Test ID: TC-ADMIN-001
Description: Verify admin page loads
Steps: Navigate to http://localhost:3000/admin
Expected: Admin page loads successfully for admin users
Actual: Admin page loaded in 60ms
Status: PASS
Logs: GET /admin 200 in 60ms
________________________________________________________________




================================================================
📋 BACKEND TEST CASE EXECUTION LOGS 
================================================================

🔐 BACKEND TEST CASE 1: User Login - Invalid Credentials

Test ID: TC-BE-LOGIN-001
Description: Test login with invalid credentials
Steps: POST /api/auth/login with wrong password
Request: {"email": "officialtapitgame@gmail.com", "password": "wrongpass"}
Expected: 401 Unauthorized
Actual: 401 - Invalid credentials
Status: ✅ PASS
Response Time: 5.791 ms
Logs: POST /api/auth/login 401 5.791 ms - 49
________________________________________________________________


🔐 BACKEND TEST CASE 2: User Login - Valid Credentials

Test ID: TC-BE-LOGIN-002
Description: Test login with valid credentials
Steps: POST /api/auth/login with correct password
Request: {"email": "yausanadhikari@gmail.com", "password": "****"}
Expected: 200 OK with token
Actual: 200 - Login successful
Status: ✅ PASS
Response Time: 88.532 ms
Logs: POST /api/auth/login 200 88.532 ms - 474
________________________________________________________________


👤 BACKEND TEST CASE 3: Get User Profile

Test ID: TC-BE-USER-001
Description: Test fetching user profile after login
Steps: GET /api/users/profile with auth token
Expected: 200 OK with user data
Actual: 200 - User profile fetched
Status: ✅ PASS
Response Time: 3.063 ms
Logs: GET /api/users/profile 200 3.063 ms - 217
________________________________________________________________


👥 BACKEND TEST CASE 4: Get Discovery Profiles

Test ID: TC-BE-DISC-001
Description: Test fetching discovery profiles
Steps: GET /api/profile/discovery/all with auth token
Expected: 200 OK with profiles list
Actual: 200 - 3 users found (1033 bytes)
Status: ✅ PASS
Response Time: 2.814 ms
Logs: GET /api/profile/discovery/all 200 2.814 ms - 1033
________________________________________________________________


📊 BACKEND TEST CASE 5: Get User Stats

Test ID: TC-BE-STATS-001
Description: Test fetching user stats
Steps: GET /api/profile/stats/me with auth token
Expected: 200 OK with stats
Actual: 200 - Stats fetched
Status: ✅ PASS
Response Time: 1.543 ms
Logs: GET /api/profile/stats/me 200 1.543 ms - 94
________________________________________________________________


👑 BACKEND TEST CASE 6: Admin Users List

Test ID: TC-BE-ADMIN-001
Description: Test fetching all users for admin
Steps: GET /api/admin/users with admin auth token
Expected: 200 OK with users list
Actual: 304 - Not modified (cached)
Status: ✅ PASS
Response Time: 4.078 ms
Logs: GET /api/admin/users 304 4.078 ms - -
________________________________________________________________


================================================================
📊 TEST SUMMARY

Total Tests Executed: 11
Passed: 11
Failed: 0
Test Completion Date: Friday 6 march 2026
Tester Signature: karmadev
=================================================