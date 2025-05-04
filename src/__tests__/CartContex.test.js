"use client"
import { render, screen, fireEvent } from "@testing-library/react"
import { CartProvider, useCart } from "../context/CartContext"

// Mock component to test the cart context
const TestComponent = () => {
  const { cart, addToCart, removeFromCart, updateQuantity, clearCart, getCartTotal, getCartItemsCount } = useCart()

  const testProduct = {
    id: 1,
    name: "Test Product",
    price: 10000,
    image: "/test-image.jpg",
  }

  return (
    <div>
      <p data-testid="cart-count">Items: {getCartItemsCount()}</p>
      <p data-testid="cart-total">Total: {getCartTotal()}</p>

      <button onClick={() => addToCart(testProduct)} data-testid="add-button">
        Add to Cart
      </button>

      <button onClick={() => updateQuantity(1, 5)} data-testid="update-button">
        Update Quantity
      </button>

      <button onClick={() => removeFromCart(1)} data-testid="remove-button">
        Remove from Cart
      </button>

      <button onClick={clearCart} data-testid="clear-button">
        Clear Cart
      </button>

      <ul data-testid="cart-items">
        {cart.map((item) => (
          <li key={item.id}>
            {item.name} - Quantity: {item.quantity}
          </li>
        ))}
      </ul>
    </div>
  )
}

// Mock localStorage
const localStorageMock = (() => {
  let store = {}
  return {
    getItem: jest.fn((key) => store[key]),
    setItem: jest.fn((key, value) => {
      store[key] = value.toString()
    }),
    removeItem: jest.fn((key) => {
      delete store[key]
    }),
    clear: jest.fn(() => {
      store = {}
    }),
  }
})()

Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
})

describe("CartContext", () => {
  beforeEach(() => {
    localStorageMock.clear()
    jest.clearAllMocks()
  })

  test("provides initial empty cart", () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>,
    )

    expect(screen.getByTestId("cart-count")).toHaveTextContent("Items: 0")
    expect(screen.getByTestId("cart-total")).toHaveTextContent("Total: 0")
    expect(screen.getByTestId("cart-items").children.length).toBe(0)
  })

  test("adds item to cart correctly", () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>,
    )

    fireEvent.click(screen.getByTestId("add-button"))

    expect(screen.getByTestId("cart-count")).toHaveTextContent("Items: 1")
    expect(screen.getByTestId("cart-total")).toHaveTextContent("Total: 10000")
    expect(screen.getByTestId("cart-items").children.length).toBe(1)
  })

  test("updates item quantity correctly", () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>,
    )

    // First add an item
    fireEvent.click(screen.getByTestId("add-button"))

    // Then update its quantity
    fireEvent.click(screen.getByTestId("update-button"))

    expect(screen.getByTestId("cart-count")).toHaveTextContent("Items: 5")
    expect(screen.getByTestId("cart-total")).toHaveTextContent("Total: 50000")
  })

  test("removes item from cart correctly", () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>,
    )

    // First add an item
    fireEvent.click(screen.getByTestId("add-button"))

    // Then remove it
    fireEvent.click(screen.getByTestId("remove-button"))

    expect(screen.getByTestId("cart-count")).toHaveTextContent("Items: 0")
    expect(screen.getByTestId("cart-total")).toHaveTextContent("Total: 0")
    expect(screen.getByTestId("cart-items").children.length).toBe(0)
  })

  test("clears cart correctly", () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>,
    )

    // Add an item
    fireEvent.click(screen.getByTestId("add-button"))

    // Clear the cart
    fireEvent.click(screen.getByTestId("clear-button"))

    expect(screen.getByTestId("cart-count")).toHaveTextContent("Items: 0")
    expect(screen.getByTestId("cart-total")).toHaveTextContent("Total: 0")
    expect(screen.getByTestId("cart-items").children.length).toBe(0)
  })
})

