# E-commerce Checkout Flow Example

Complete checkout flow with scrolling, form filling, and payment.

## Flow File: checkout-test.yaml

```yaml
appId: com.example.shop
name: "User can complete checkout with credit card"
tags:
  - checkout
  - payment
  - e2e
  - critical
env:
  CARD_NUMBER: "4111111111111111"
  CARD_EXPIRY: "12/28"
  CARD_CVV: "123"
  SHIPPING_ADDRESS: "123 Main Street"
  SHIPPING_CITY: "San Francisco"
  SHIPPING_ZIP: "94102"
---
# Prerequisite: User is logged in and has items in cart
- launchApp

# Navigate to cart
- tapOn:
    id: "cart_icon"

# Verify cart has items
- assertVisible:
    id: "cart_items_list"

# Verify total is displayed
- assertVisible: "Total: \\$[0-9]+\\.[0-9]{2}"

# Proceed to checkout
- tapOn:
    id: "checkout_button"
    enabled: true

# === SHIPPING SECTION ===
- assertVisible: "Shipping Address"

# Fill shipping form
- tapOn:
    id: "address_input"
- inputText: "${SHIPPING_ADDRESS}"

- tapOn:
    id: "city_input"
- inputText: "${SHIPPING_CITY}"

- tapOn:
    id: "zip_input"
- inputText: "${SHIPPING_ZIP}"

- hideKeyboard

# Scroll to continue button if needed
- scrollUntilVisible:
    element:
      id: "continue_to_payment"
    direction: DOWN

- tapOn:
    id: "continue_to_payment"

# === PAYMENT SECTION ===
- assertVisible: "Payment Method"

# Select credit card
- tapOn:
    below: "Payment Method"
    text: "Credit Card"

# Fill card details
- tapOn:
    id: "card_number_input"
- inputText: "${CARD_NUMBER}"

- tapOn:
    id: "card_expiry_input"
- inputText: "${CARD_EXPIRY}"

- tapOn:
    id: "card_cvv_input"
- inputText: "${CARD_CVV}"

- hideKeyboard

# === ORDER REVIEW ===
- scrollUntilVisible:
    element:
      id: "place_order_button"
    direction: DOWN

# Verify order summary
- assertVisible: "Order Summary"
- assertVisible:
    id: "order_total"

# Take screenshot before placing order
- takeScreenshot: "order_review"

# Place order
- tapOn:
    id: "place_order_button"
    enabled: true

# Wait for order processing
- extendedWaitUntil:
    visible: "Order Confirmed"
    timeout: 30000

# Verify confirmation
- assertVisible: "Order #[0-9]+"
- assertVisible: "Thank you for your order"

# Capture confirmation
- takeScreenshot: "order_confirmation"
```

## Subflow: add-product-to-cart.yaml

```yaml
# subflows/add-product-to-cart.yaml
# Requires PRODUCT_NAME and optional QUANTITY

- scrollUntilVisible:
    element: "${PRODUCT_NAME}"
    direction: DOWN
    timeout: 15000

- tapOn: "${PRODUCT_NAME}"

# Wait for product detail page
- assertVisible:
    id: "product_detail_screen"

# Increase quantity if specified
- runFlow:
    when:
      true: ${QUANTITY && QUANTITY > 1}
    commands:
      - repeat:
          times: ${QUANTITY - 1}
          commands:
            - tapOn:
                id: "quantity_increase"

# Add to cart
- tapOn:
    id: "add_to_cart_button"

# Verify added
- assertVisible: "Added to cart"

# Go back to continue shopping or proceed
- back
```

## Using with Login Subflow

```yaml
appId: com.example.shop
name: "Complete purchase flow from login to confirmation"
tags:
  - e2e
  - purchase
env:
  EMAIL: customer@example.com
  PASSWORD: CustomerPass123!
  PRODUCT_NAME: "Blue Wireless Headphones"
  QUANTITY: 1
  CARD_NUMBER: "4111111111111111"
  CARD_EXPIRY: "12/28"
  CARD_CVV: "123"
---
- launchApp:
    clearState: true

# Login
- runFlow:
    file: ../subflows/login-steps.yaml
    env:
      EMAIL: ${EMAIL}
      PASSWORD: ${PASSWORD}

# Add product to cart
- runFlow:
    file: ../subflows/add-product-to-cart.yaml
    env:
      PRODUCT_NAME: ${PRODUCT_NAME}
      QUANTITY: ${QUANTITY}

# Go to cart and checkout
- tapOn:
    id: "cart_icon"

- runFlow: ../subflows/checkout-steps.yaml
```

## Handling Cart Edge Cases

```yaml
appId: com.example.shop
name: "Empty cart shows appropriate message"
tags:
  - cart
  - edge-case
---
- launchApp:
    clearState: true

# Skip login for guest browsing
- runFlow:
    when:
      visible: "Continue as Guest"
    commands:
      - tapOn: "Continue as Guest"

# Navigate to cart
- tapOn:
    id: "cart_icon"

# Verify empty cart state
- assertVisible: "Your cart is empty"
- assertVisible:
    id: "start_shopping_button"

# Checkout button should be disabled or hidden
- assertNotVisible:
    id: "checkout_button"
    enabled: true
```

## Key Patterns Used

1. **Scroll before interact** - `scrollUntilVisible` before tapping buttons at bottom
2. **Form filling pattern** - Tap field → Input text → Next field
3. **Regex assertions** - `"Order #[0-9]+"` for dynamic content
4. **Conditional flows** - Handle optional UI elements
5. **Screenshots at key points** - Before and after critical actions
6. **Extended waits** - For payment processing (30s timeout)
7. **Relative selectors** - `below: "Payment Method"` for context
