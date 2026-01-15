# Project Structure Template

Recommended Maestro test project structure for maintainable test suites.

## Directory Structure

```
project-root/
├── .maestro/
│   ├── config.yaml              # Workspace configuration
│   ├── flows/                   # Test flows (runnable tests)
│   │   ├── auth/
│   │   │   ├── login.yaml
│   │   │   ├── logout.yaml
│   │   │   ├── forgot-password.yaml
│   │   │   └── register.yaml
│   │   ├── onboarding/
│   │   │   ├── first-time-user.yaml
│   │   │   └── skip-onboarding.yaml
│   │   ├── checkout/
│   │   │   ├── guest-checkout.yaml
│   │   │   ├── member-checkout.yaml
│   │   │   └── failed-payment.yaml
│   │   └── profile/
│   │       ├── edit-profile.yaml
│   │       └── change-password.yaml
│   ├── subflows/                # Reusable components (not run directly)
│   │   ├── auth/
│   │   │   ├── login-steps.yaml
│   │   │   ├── logout-steps.yaml
│   │   │   └── fill-registration-form.yaml
│   │   ├── navigation/
│   │   │   ├── go-to-home.yaml
│   │   │   ├── go-to-cart.yaml
│   │   │   ├── go-to-profile.yaml
│   │   │   └── go-to-settings.yaml
│   │   ├── common/
│   │   │   ├── dismiss-popups.yaml
│   │   │   ├── accept-cookies.yaml
│   │   │   └── handle-permissions.yaml
│   │   └── cart/
│   │       ├── add-to-cart.yaml
│   │       ├── remove-from-cart.yaml
│   │       └── update-quantity.yaml
│   └── scripts/                 # JavaScript helpers
│       ├── data-generators.js
│       ├── date-helpers.js
│       └── api-helpers.js
├── test-results/                # Output directory (gitignored)
│   ├── screenshots/
│   ├── recordings/
│   └── reports/
└── .gitignore
```

## config.yaml

```yaml
# .maestro/config.yaml

# Include all flows, exclude work-in-progress
flows:
  - 'flows/**/*.yaml'
  - '!flows/**/*-wip.yaml'
  - '!flows/**/*.draft.yaml'

# Default tags to include/exclude
includeTags: []                  # Empty = include all
excludeTags:
  - flaky
  - manual

# Execution order for dependent tests
executionOrder:
  continueOnFailure: false       # Stop on first failure for CI
  flowsOrder:
    - flows/auth/login.yaml      # Login first
    - flows/onboarding/*.yaml    # Then onboarding

# Output directory
testOutputDir: ../test-results

# Platform settings
platform:
  ios:
    disableAnimations: true
    snapshotKeyHonorModalViews: false
  android:
    disableAnimations: true
```

## PR-specific config: pr-config.yaml

```yaml
# .maestro/pr-config.yaml
# Faster subset for pull request checks

flows:
  - 'flows/**/*.yaml'

includeTags:
  - smoke
  - critical

excludeTags:
  - slow
  - flaky

executionOrder:
  continueOnFailure: true        # Run all tests, report failures
```

## Subflow Template

```yaml
# .maestro/subflows/auth/login-steps.yaml
#
# Reusable login component
# Required env: EMAIL, PASSWORD
# Assumes: App is launched and on login screen

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

## Flow Template

```yaml
# .maestro/flows/auth/login.yaml

appId: com.example.myapp
name: "User can login with valid credentials"
tags:
  - auth
  - smoke
  - critical
env:
  EMAIL: testuser@example.com
  PASSWORD: TestPass123!
---
# Setup
- launchApp:
    clearState: true

# Handle any initial popups
- runFlow:
    when:
      visible: "Allow Notifications"
    file: ../../subflows/common/handle-permissions.yaml

# Execute login
- runFlow:
    file: ../../subflows/auth/login-steps.yaml

# Verify success
- assertVisible: "Welcome"
- assertVisible:
    id: "home_screen"

# Capture result
- takeScreenshot: "login_success"
```

## .gitignore

```gitignore
# Maestro test outputs
test-results/
*.mp4
*.png

# Local environment overrides
.maestro/config.local.yaml

# IDE
.idea/
.vscode/
```

## Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| Flows | `action-subject.yaml` | `login.yaml`, `add-to-cart.yaml` |
| Subflows | `action-steps.yaml` | `login-steps.yaml`, `checkout-steps.yaml` |
| Directories | lowercase, plural | `flows/`, `subflows/`, `scripts/` |
| Tags | lowercase, hyphenated | `smoke`, `e2e`, `auth`, `critical` |

## Tag Strategy

```yaml
# Execution tags
- smoke          # Quick sanity tests (~5 min)
- e2e           # Full end-to-end flows
- critical      # Must pass for release

# Feature tags
- auth          # Authentication flows
- checkout      # Purchase flows
- profile       # User profile tests

# Filter tags
- flaky         # Known flaky tests
- slow          # Long-running tests
- manual        # Require manual intervention
- wip           # Work in progress
```

## Running Tests

```bash
# All tests
maestro test .maestro/flows/

# With workspace config
maestro test --config .maestro/config.yaml .maestro/flows/

# PR config (smoke tests only)
maestro test --config .maestro/pr-config.yaml .maestro/flows/

# Specific feature
maestro test .maestro/flows/auth/

# By tags
maestro test --include-tags=smoke,critical .maestro/flows/
maestro test --exclude-tags=flaky,slow .maestro/flows/

# Continuous mode for development
maestro test --continuous .maestro/flows/auth/login.yaml
```
