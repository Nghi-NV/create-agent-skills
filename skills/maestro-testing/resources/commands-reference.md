# Maestro Commands Quick Reference

## Selectors

| Selector | Syntax | Use Case |
|----------|--------|----------|
| Text | `- tapOn: "Button"` | Static text |
| ID | `id: "btn_submit"` | Accessibility ID |
| Text + ID | `text: "OK", id: "dialog_btn"` | Unique match |
| Below | `below: "Label"` | Element below another |
| Above | `above: { id: "footer" }` | Element above another |
| Left/Right | `leftOf: "Price"` | Horizontal position |
| Contains Child | `containsChild: "Icon"` | Parent of element |
| Child Of | `childOf: { id: "container" }` | Child of element |
| Index | `text: "Item", index: 2` | 3rd matching element |
| Enabled | `enabled: true` | Must be enabled |
| Checked | `checked: true` | Checkbox is checked |
| Focused | `focused: true` | Has focus |
| Traits | `traits: text` | Element contains text |

## Core Commands

| Command | Example | Description |
|---------|---------|-------------|
| `launchApp` | `- launchApp` | Launch default app |
| `launchApp` | `- launchApp: { clearState: true }` | Launch with clean state |
| `stopApp` | `- stopApp` | Stop the app |
| `killApp` | `- killApp` | Force kill app |
| `tapOn` | `- tapOn: "Button"` | Tap element |
| `doubleTapOn` | `- doubleTapOn: "Zoom"` | Double tap |
| `longPressOn` | `- longPressOn: "Delete"` | Long press |
| `inputText` | `- inputText: "Hello"` | Type text |
| `eraseText` | `- eraseText: 5` | Delete 5 chars |
| `hideKeyboard` | `- hideKeyboard` | Dismiss keyboard |
| `scroll` | `- scroll` | Scroll down |
| `scrollUntilVisible` | `- scrollUntilVisible: { element: "Item" }` | Scroll to element |
| `swipe` | `- swipe: { direction: LEFT }` | Swipe gesture |
| `back` | `- back` | Press back button |
| `openLink` | `- openLink: "myapp://page"` | Open deep link |

## Assertions

| Command | Example | Description |
|---------|---------|-------------|
| `assertVisible` | `- assertVisible: "Welcome"` | Element is visible |
| `assertNotVisible` | `- assertNotVisible: "Error"` | Element is not visible |
| `assertTrue` | `- assertTrue: { condition: ${x > 0} }` | Boolean check |
| `assertWithAI` | `- assertWithAI: "Login form visible"` | AI assertion |

## Wait Commands

| Command | Example | Description |
|---------|---------|-------------|
| `extendedWaitUntil` | `visible: "X", timeout: 30000` | Wait with timeout |
| `waitForAnimationToEnd` | `- waitForAnimationToEnd` | Wait for animations |

## Flow Control

| Command | Example | Description |
|---------|---------|-------------|
| `runFlow` | `- runFlow: path/to/flow.yaml` | Run subflow |
| `runFlow` (conditional) | `when: { visible: "X" }, file: y.yaml` | Conditional subflow |
| `repeat` | `times: 3, commands: [...]` | Repeat commands |
| `retry` | `maxRetries: 3, commands: [...]` | Retry on failure |
| `evalScript` | `- evalScript: ${output.x = 1}` | Run inline JS |
| `runScript` | `- runScript: script.js` | Run JS file |

## Device Commands

| Command | Example | Description |
|---------|---------|-------------|
| `setLocation` | `latitude: 37.7, longitude: -122.4` | Set GPS location |
| `setOrientation` | `- setOrientation: LANDSCAPE` | Change orientation |
| `setAirplaneMode` | `enabled: true` | Toggle airplane mode |
| `setClipboard` | `- setClipboard: "text"` | Set clipboard |
| `setPermissions` | `notifications: deny` | Set permissions |

## Screenshots & Recording

| Command | Example | Description |
|---------|---------|-------------|
| `takeScreenshot` | `- takeScreenshot: "name"` | Capture screen |
| `startRecording` | `- startRecording: "flow"` | Start video recording |
| `stopRecording` | `- stopRecording` | Stop recording |

## Random Input

| Command | Description |
|---------|-------------|
| `inputRandomEmail` | Random email address |
| `inputRandomPersonName` | Random person name |
| `inputRandomNumber` | Random number |
| `inputRandomText` | Random text |
| `inputRandomCityName` | Random city |
| `inputRandomCountryName` | Random country |

## Flow Configuration

```yaml
appId: com.example.app       # Required
name: "Test name"            # Optional
tags: [smoke, auth]          # Optional
env:
  KEY: value                 # Environment variables
onFlowStart:
  - runFlow: setup.yaml      # Before test
onFlowComplete:
  - runFlow: teardown.yaml   # After test
---
# Commands start here
```

## Workspace Configuration

```yaml
# .maestro/config.yaml
flows:
  - 'flows/**/*.yaml'
  - '!flows/**/*-wip.yaml'
includeTags: [smoke]
excludeTags: [flaky]
executionOrder:
  continueOnFailure: false
  flowsOrder:
    - flows/login.yaml
testOutputDir: test-results
platform:
  ios:
    disableAnimations: true
  android:
    disableAnimations: true
```

## Common Regex Patterns

| Pattern | Matches |
|---------|---------|
| `.*` | Any text (partial match) |
| `[0-9]+` | One or more digits |
| `\\$[0-9]+\\.[0-9]{2}` | Price like $19.99 |
| `Order #[A-Z0-9]+` | Order ID |
| `.*@.*\\..*` | Email pattern |
