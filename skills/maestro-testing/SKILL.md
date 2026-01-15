---
name: maestro-testing
description: Write robust E2E tests for mobile apps and web using Maestro. Use when creating UI automation tests, flow-based testing, or setting up test suites with optimal selectors and best practices.
---

# Maestro Testing Skill

Write robust End-to-End tests for mobile apps (iOS/Android) and web applications using Maestro - a simple, powerful, and reliable UI testing framework.

## When to Use This Skill

- Writing E2E tests for mobile apps (iOS, Android, React Native, Flutter)
- Testing web applications in desktop browsers
- Creating reusable test flows and page objects
- Setting up CI/CD test automation with Maestro
- Migrating from other testing frameworks to Maestro

## Examples & Resources

### Examples
- [Login Flow](examples/login-flow.md) - Complete login test with subflows and best practices
- [Checkout Flow](examples/checkout-flow.md) - E-commerce checkout with scrolling and forms
- [Project Structure](examples/project-structure.md) - Recommended test suite organization

### Resources
- [Commands Reference](resources/commands-reference.md) - Quick reference cheat sheet for all commands


## Prerequisites

- Maestro CLI installed (`curl -fsSL "https://get.maestro.mobile.dev" | bash`)
- For mobile: Android emulator or iOS simulator running
- For web: Chrome browser installed
- App installed on device/emulator (for mobile testing)

## Flow File Structure

Every Maestro flow is a YAML file with optional configuration header and commands:

```yaml
# Flow configuration (optional header above ---)
appId: com.example.myapp  # Required: package name (Android) or bundle ID (iOS)
name: Login Flow Test     # Optional: custom name for reports
tags:
  - smoke
  - login
env:
  USERNAME: testuser@example.com
  PASSWORD: secret123
---
# Commands start after ---
- launchApp
- tapOn: "Login"
- inputText: "${USERNAME}"
```

## Selector Priority (Most to Least Preferred)

> [!IMPORTANT]
> Always prefer stable selectors. The order of preference:

| Priority | Selector | When to Use | Example |
|----------|----------|-------------|---------|
| 1 | `id` | Best for dynamic content, i18n apps | `id: "login_button"` |
| 2 | `text` | Stable static text, readable tests | `text: "Submit"` |
| 3 | `id` + `text` | Unique identification | `id: "btn", text: "OK"` |
| 4 | Relative selectors | Complex layouts | `below: "Email", id: "input"` |
| 5 | `index` | Last resort for duplicates | `text: "Item", index: 2` |
| ❌ | `point` coordinates | Avoid - device dependent | `point: "50%, 50%"` |

### Selector Syntax Reference

```yaml
# Basic selectors
- tapOn: "Button Text"              # Shorthand for text
- tapOn:
    id: "submit_btn"                # By accessibility ID
- tapOn:
    text: "Login"                   # By visible text
    enabled: true                   # Must be enabled

# Relative position selectors
- tapOn:
    below: "Email Label"            # Element below another
    id: "input_field"
- tapOn:
    above:
      id: "footer"                  # Element above footer
- tapOn:
    leftOf: "Price"
    text: "Quantity"
- tapOn:
    containsChild: "Icon"           # Parent contains child with text
- tapOn:
    childOf:
      id: "toolbar"                 # Child of element with ID

# Multiple matches - use index (0-based)
- tapOn:
    text: "Add to Cart"
    index: 0                        # First matching element

# Element state selectors
- assertVisible:
    text: "Submit"
    enabled: true                   # Must be enabled
    checked: false                  # Checkbox unchecked
    focused: true                   # Has keyboard focus
    selected: true                  # Is selected

# Size-based selectors
- tapOn:
    width: 100
    height: 50
    tolerance: 10                   # ±10 pixels

# Element traits
- tapOn:
    traits: text                    # Contains text
- tapOn:
    traits: long-text               # 200+ characters
- tapOn:
    traits: square                  # Width ≈ Height

# Regular expressions (all text/id fields support regex)
- assertVisible: "Total: \\$[0-9]+\\.[0-9]{2}"
- tapOn:
    id: ".*_submit_button"
- assertVisible: ".*brown fox.*"    # Partial match with .*
```

## Essential Commands

### App Lifecycle

```yaml
# Launch app (uses appId from config)
- launchApp

# Launch with clean state
- launchApp:
    clearState: true
    clearKeychain: true             # iOS only

# Launch specific app
- launchApp:
    appId: "com.other.app"

# Launch with specific permissions
- launchApp:
    permissions:
      notifications: deny
      camera: allow
      location: deny

# Stop and kill app
- stopApp
- killApp
```

### Tap Interactions

```yaml
# Simple tap
- tapOn: "Button"
- tapOn:
    id: "submit_btn"

# Double tap
- doubleTapOn: "Zoom In"

# Long press
- longPressOn: "Item to Delete"

# Tap with retry (for async loading)
- tapOn:
    text: "Load More"
    retryTapIfNoChange: true        # Retry if screen doesn't change

# Repeated taps
- tapOn:
    text: "+"
    repeat: 5
    delay: 200                      # 200ms between taps

# Tap relative point within element
- tapOn:
    text: "A text with a hyperlink"
    point: "90%, 50%"               # Tap right side of element
```

### Text Input

```yaml
# Type text (into focused field)
- inputText: "Hello World"

# Tap field first, then type
- tapOn:
    id: "email_input"
- inputText: "user@example.com"

# Random data generation
- inputRandomEmail                  # Random email
- inputRandomPersonName             # Random name
- inputRandomNumber:
    length: 6                       # 6-digit number
- inputRandomText:
    length: 10                      # 10 random characters

# Erase text
- eraseText: 10                     # Delete 10 characters
- eraseText                         # Delete all (focused field)

# Copy and paste
- copyTextFrom:
    id: "generated_code"
- pasteText
```

### Assertions

```yaml
# Assert element is visible
- assertVisible: "Welcome"
- assertVisible:
    id: "success_message"
    enabled: true

# Assert element is NOT visible
- assertNotVisible: "Error"
- assertNotVisible:
    id: "loading_spinner"

# Assert with custom message (for debugging)
- assertTrue:
    condition: ${value > 0}
    label: "Value should be positive"

# AI-powered assertions (requires API key)
- assertWithAI: "The login form is displayed correctly"
- assertNoDefectsWithAI             # Check for visual defects
```

### Scrolling

```yaml
# Simple scroll down
- scroll

# Scroll until element visible
- scrollUntilVisible:
    element: "Terms and Conditions"
    direction: DOWN                 # DOWN|UP|LEFT|RIGHT
    timeout: 30000                  # Max 30 seconds
    speed: 40                       # 0-100 (higher = faster)

# Scroll with centering
- scrollUntilVisible:
    element:
      id: "target_item"
    centerElement: true             # Center element on screen

# Horizontal scroll
- scrollUntilVisible:
    element: "Category 5"
    direction: RIGHT
```

### Swipe Gestures

```yaml
# Swipe in direction
- swipe:
    direction: LEFT                 # Swipe left (e.g., dismiss)
    
# Swipe on specific element
- swipe:
    from:
      id: "swipeable_item"
    direction: LEFT

# Swipe between points (relative %)
- swipe:
    start: "90%, 50%"
    end: "10%, 50%"

# Swipe between absolute coordinates
- swipe:
    start: "300, 500"
    end: "100, 500"
```

### Navigation

```yaml
# Press back button (Android/iOS)
- back

# Open deep link
- openLink: "myapp://profile/123"

# Press hardware keys (Android)
- pressKey: Home
- pressKey: Enter
- pressKey: Volume Up
```

### Wait Commands

```yaml
# Wait for element (default behavior)
# Most commands automatically wait for elements

# Extended wait with timeout
- extendedWaitUntil:
    visible: "Success"
    timeout: 30000                  # Wait up to 30 seconds

# Wait for animation to complete
- waitForAnimationToEnd

# Control settle time for dynamic content
- tapOn:
    text: "Submit"
    waitToSettleTimeoutMs: 1000     # Max wait for screen to settle
```

### Screenshots and Recording

```yaml
# Take screenshot
- takeScreenshot: "login_screen"    # Saved to output directory

# Video recording
- startRecording: "test_flow"
- launchApp
- tapOn: "Login"
- stopRecording
```

## Reusable Flows (Page Object Pattern)

### Directory Structure

```
.maestro/
├── config.yaml              # Workspace configuration
├── flows/
│   ├── login.yaml           # Test: Login flow
│   ├── checkout.yaml        # Test: Checkout flow
│   └── ...
├── subflows/                # Reusable components
│   ├── login-steps.yaml     # Login actions
│   ├── logout-steps.yaml    # Logout actions
│   └── navigate-to-*.yaml   # Navigation helpers
└── scripts/
    └── helpers.js           # JavaScript helpers
```

### Subflow Example (login-steps.yaml)

```yaml
# subflows/login-steps.yaml
# No appId needed - inherits from parent flow

- tapOn:
    id: "email_input"
- inputText: "${EMAIL}"
- tapOn:
    id: "password_input"
- inputText: "${PASSWORD}"
- tapOn:
    id: "login_button"
- assertVisible:
    id: "home_screen"
```

### Main Flow Using Subflow

```yaml
# flows/login.yaml
appId: com.example.app
env:
  EMAIL: test@example.com
  PASSWORD: password123
---
- launchApp:
    clearState: true

- runFlow: ../subflows/login-steps.yaml

- assertVisible: "Welcome back"
```

### Conditional Flow Execution

```yaml
# Run subflow only if element visible
- runFlow:
    when:
      visible: "Cookie Banner"
    file: ../subflows/dismiss-cookies.yaml

# Run inline commands conditionally
- runFlow:
    when:
      visible: "Update Available"
    commands:
      - tapOn: "Later"

# Platform-specific flows
- runFlow:
    when:
      platform: iOS
    file: ../subflows/ios-specific.yaml
```

### Passing Parameters to Subflows

```yaml
# Main flow
- runFlow:
    file: ../subflows/add-to-cart.yaml
    env:
      PRODUCT_NAME: "Blue T-Shirt"
      QUANTITY: "2"

# subflows/add-to-cart.yaml
- scrollUntilVisible:
    element: "${PRODUCT_NAME}"
- tapOn: "${PRODUCT_NAME}"
- tapOn:
    text: "+"
    repeat: ${QUANTITY - 1}
- tapOn: "Add to Cart"
```

## Workspace Configuration

Create `.maestro/config.yaml`:

```yaml
# Flows to include (glob patterns)
flows:
  - 'flows/*'
  - '!flows/wip-*'              # Exclude work-in-progress

# Tags configuration
includeTags:
  - smoke
excludeTags:
  - flaky

# Execution order
executionOrder:
  continueOnFailure: false
  flowsOrder:
    - flows/login.yaml          # Run first
    - flows/onboarding.yaml     # Run second

# Test output directory
testOutputDir: test-results

# Platform-specific settings
platform:
  ios:
    disableAnimations: true     # Reduce flakiness
  android:
    disableAnimations: true
```

## Loops and Repeat

```yaml
# Repeat commands N times
- repeat:
    times: 3
    commands:
      - tapOn: "Next"
      - scroll

# Repeat while condition true
- repeat:
    while:
      visible: "Load More"
    commands:
      - tapOn: "Load More"
      - scroll

# Repeat with index variable
- repeat:
    times: ${ITEM_COUNT}
    commands:
      - tapOn: "Item ${maestro.repeatIndex}"
```

## JavaScript Integration

```yaml
# Inline JavaScript
- evalScript: ${output.total = quantity * price}

# Run external script
- runScript: scripts/calculate-total.js

# Use script output
- assertVisible: "Total: $${output.total}"
```

### JavaScript File Example (scripts/helpers.js)

```javascript
// scripts/helpers.js
function generateTestEmail() {
    const timestamp = Date.now();
    return `test_${timestamp}@example.com`;
}

// Set output variables
output.testEmail = generateTestEmail();
output.currentDate = new Date().toISOString().split('T')[0];
```

## Retry Mechanism

```yaml
# Retry a block of commands on failure
- retry:
    maxRetries: 3
    commands:
      - tapOn: "Retry Connection"
      - assertVisible: "Connected"
```

## Device Settings

```yaml
# Airplane mode
- setAirplaneMode:
    enabled: true
- toggleAirplaneMode

# Location (requires permissions)
- setLocation:
    latitude: 37.7749
    longitude: -122.4194

# Orientation
- setOrientation: LANDSCAPE
- setOrientation: PORTRAIT

# Clipboard
- setClipboard: "Pasted content"
- pasteText
```

## Best Practices

### 1. Use Stable Selectors

```yaml
# ✅ Good: Use accessibility IDs
- tapOn:
    id: "submit_button"

# ✅ Good: Use stable text
- tapOn: "Sign In"

# ⚠️ Avoid: Index unless necessary
- tapOn:
    text: "Button"
    index: 3

# ❌ Bad: Avoid coordinates
- tapOn:
    point: "150, 300"
```

### 2. Wait for Async Operations

```yaml
# ✅ Good: Use assertVisible before interaction
- assertVisible:
    id: "loaded_content"
- tapOn: "Continue"

# ✅ Good: Use extendedWaitUntil for long operations
- tapOn: "Submit Order"
- extendedWaitUntil:
    visible: "Order Confirmed"
    timeout: 60000
```

### 3. Clear State for Isolation

```yaml
# ✅ Good: Start fresh
- launchApp:
    clearState: true
```

### 4. Use Descriptive Flow Names

```yaml
# ✅ Good naming
appId: com.example.app
name: "User can complete checkout with credit card"
tags:
  - checkout
  - payment
  - smoke
```

### 5. Create Reusable Subflows

```yaml
# ✅ Good: Extract common sequences
- runFlow: ../subflows/login-as-user.yaml
- runFlow: ../subflows/navigate-to-settings.yaml
```

### 6. Handle Dynamic Content

```yaml
# ✅ Good: Use regex for dynamic text
- assertVisible: "Order #[0-9]+"
- assertVisible: "Welcome, .*"

# ✅ Good: Use relative selectors
- tapOn:
    below: "Shipping Address"
    id: "edit_button"
```

## Running Tests

```bash
# Run single flow
maestro test flows/login.yaml

# Run all flows in directory
maestro test .maestro/flows/

# Run with specific config
maestro test --config .maestro/config.yaml .maestro/flows/

# Run with tags
maestro test --include-tags=smoke --exclude-tags=flaky .maestro/

# Continuous mode (re-run on file changes)
maestro test --continuous flows/login.yaml

# Debug mode with hierarchy viewer
maestro hierarchy

# Interactive studio
maestro studio
```

## Common Mistakes to Avoid

| Mistake | Problem | Solution |
|---------|---------|----------|
| Using coordinates | Breaks on different devices | Use `id` or `text` selectors |
| Not clearing state | Tests depend on previous state | Use `clearState: true` |
| Hardcoding wait times | Flaky or slow tests | Use `assertVisible` or `extendedWaitUntil` |
| Duplicate selectors | Wrong element tapped | Use relative selectors or `index` |
| Long monolithic flows | Hard to maintain | Break into subflows |
| Not using tags | Can't run subsets | Tag flows by category |

## Web Testing (Chrome)

```yaml
appId: com.google.chrome
---
- launchApp
- openLink: "https://example.com"
- assertVisible: "Example Domain"
- tapOn: "More information..."
```

> [!NOTE]
> For web testing, Maestro uses Chrome and interacts with the DOM through accessibility APIs. Some complex SPAs may require `waitForAnimationToEnd` after navigation.

## References

- [Maestro Documentation](https://docs.maestro.dev/)
- [Commands Reference](https://docs.maestro.dev/api-reference/commands)
- [Selectors Reference](https://docs.maestro.dev/api-reference/selectors)
- [Workspace Configuration](https://docs.maestro.dev/api-reference/configuration/workspace-configuration)
