# Login Flow Example

This example demonstrates a complete login flow test with best practices.

## Flow File: login-test.yaml

```yaml
appId: com.example.myapp
name: "User can login with valid credentials"
tags:
  - smoke
  - auth
  - critical
env:
  TEST_EMAIL: testuser@example.com
  TEST_PASSWORD: SecurePass123!
---
# Start fresh
- launchApp:
    clearState: true

# Wait for app to load
- assertVisible:
    id: "splash_screen"
    optional: true
- extendedWaitUntil:
    visible:
      id: "login_screen"
    timeout: 10000

# Enter email
- tapOn:
    id: "email_input"
- inputText: "${TEST_EMAIL}"

# Enter password
- tapOn:
    id: "password_input"
- inputText: "${TEST_PASSWORD}"

# Hide keyboard if needed
- hideKeyboard

# Submit login
- tapOn:
    id: "login_button"
    enabled: true

# Wait for login to complete
- extendedWaitUntil:
    visible:
      id: "home_screen"
    timeout: 15000

# Verify successful login
- assertVisible: "Welcome back"
- assertVisible:
    id: "user_profile_icon"

# Take screenshot for report
- takeScreenshot: "login_success"
```

## Subflow: login-steps.yaml

Reusable login component for other tests:

```yaml
# subflows/login-steps.yaml
# Requires EMAIL and PASSWORD env variables from parent flow

- tapOn:
    id: "email_input"
- inputText: "${EMAIL}"

- tapOn:
    id: "password_input"  
- inputText: "${PASSWORD}"

- hideKeyboard

- tapOn:
    id: "login_button"

- extendedWaitUntil:
    visible:
      id: "home_screen"
    timeout: 15000
```

## Using the Subflow

```yaml
appId: com.example.myapp
name: "User can access settings after login"
env:
  EMAIL: testuser@example.com
  PASSWORD: SecurePass123!
---
- launchApp:
    clearState: true

# Reuse login subflow
- runFlow: ../subflows/login-steps.yaml

# Continue with test-specific steps
- tapOn:
    id: "menu_button"
- tapOn: "Settings"
- assertVisible: "Account Settings"
```

## Handling Login Errors

```yaml
appId: com.example.myapp
name: "Invalid login shows error message"
tags:
  - auth
  - negative
env:
  INVALID_EMAIL: wrong@example.com
  INVALID_PASSWORD: wrongpassword
---
- launchApp:
    clearState: true

- tapOn:
    id: "email_input"
- inputText: "${INVALID_EMAIL}"

- tapOn:
    id: "password_input"
- inputText: "${INVALID_PASSWORD}"

- tapOn:
    id: "login_button"

# Verify error is shown
- assertVisible:
    text: "Invalid email or password"
- assertVisible:
    id: "error_banner"

# Verify still on login screen
- assertVisible:
    id: "login_screen"

# Verify login button still available (not navigated away)
- assertVisible:
    id: "login_button"
    enabled: true
```

## Best Practices Applied

1. **Clear state** - Start fresh with `clearState: true`
2. **Use IDs** - `id: "login_button"` instead of text
3. **Environment variables** - Credentials in `env` section
4. **Explicit waits** - `extendedWaitUntil` for async operations
5. **Screenshots** - Capture proof of success
6. **Subflows** - Reusable login component
7. **Meaningful tags** - `smoke`, `auth`, `critical`
8. **Descriptive names** - Clear test intent
