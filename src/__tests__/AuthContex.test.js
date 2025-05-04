"use client"
import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import { AuthProvider, useAuth } from "../context/AuthContext"

// Mock component to test the auth context
const TestComponent = () => {
  const { currentUser, login, logout, loading } = useAuth()

  const handleLogin = async () => {
    await login("test@example.com", "password", "buyer")
  }

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <p data-testid="user-status">{currentUser ? `Logged in as ${currentUser.userType}` : "Not logged in"}</p>
          <button onClick={handleLogin} data-testid="login-button">
            Login
          </button>
          <button onClick={logout} data-testid="logout-button">
            Logout
          </button>
        </>
      )}
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

describe("AuthContext", () => {
  beforeEach(() => {
    localStorageMock.clear()
    jest.clearAllMocks()
  })

  test("provides initial authentication state", () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>,
    )

    expect(screen.getByTestId("user-status")).toHaveTextContent("Not logged in")
  })

  test("handles login correctly", async () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>,
    )

    fireEvent.click(screen.getByTestId("login-button"))

    // Wait for the login process to complete
    await waitFor(() => {
      expect(screen.getByTestId("user-status")).toHaveTextContent("Logged in as buyer")
    })

    // Check if localStorage was updated
    expect(localStorageMock.setItem).toHaveBeenCalledWith("isLoggedIn", "true")
    expect(localStorageMock.setItem).toHaveBeenCalledWith("userType", "buyer")
  })

  test("handles logout correctly", async () => {
    // Set initial logged in state
    localStorageMock.setItem("isLoggedIn", "true")
    localStorageMock.setItem("userType", "buyer")

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>,
    )

    // Wait for the auth state to be loaded from localStorage
    await waitFor(() => {
      expect(screen.getByTestId("user-status")).toHaveTextContent("Logged in as buyer")
    })

    // Trigger logout
    fireEvent.click(screen.getByTestId("logout-button"))

    // Check if user is logged out
    expect(screen.getByTestId("user-status")).toHaveTextContent("Not logged in")

    // Check if localStorage was updated
    expect(localStorageMock.removeItem).toHaveBeenCalledWith("isLoggedIn")
    expect(localStorageMock.removeItem).toHaveBeenCalledWith("userType")
  })
})

