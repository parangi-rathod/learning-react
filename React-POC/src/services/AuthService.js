import { jwtDecode } from "jwt-decode";

class AuthService {
  constructor() {
    this.baseURL = import.meta.env.BACKEND_API_URL; // Change to your API URL
    this.token = localStorage.getItem("authToken");
  }

  // Register new user
  // async register(userData) {
  //   try {
  //     const response = await fetch(`${this.baseURL}/register`, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(userData),
  //     });

  //     const data = await response.json();

  //     if (!response.ok) {
  //       throw new Error(data.message || 'Registration failed');
  //     }

  //     // Store token if registration includes login
  //     if (data.token) {
  //       this.setToken(data.token);
  //       this.setCurrentUser(data.user);
  //     }

  //     return {
  //       success: true,
  //       data: data,
  //       message: data.message || 'Registration successful'
  //     };
  //   } catch (error) {
  //     return {
  //       success: false,
  //       message: error.message || 'Network error occurred'
  //     };
  //   }
  // }

  // Login user
  async login(credentials) {
    try {
      const response = await fetch(`${this.baseURL}Auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();
      console.log(data);
      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      // Store token and decode it
      this.setToken(data.data);

      // Decode token and save to localStorage
      const decodedToken = this.decodeToken(data.data);
      console.log(decodedToken);
      if (decodedToken) {
        localStorage.setItem("decodedToken", JSON.stringify(decodedToken));
      }

      this.setCurrentUser(data.user);

      return {
        success: true,
        data: data,
        message: data.message || "Login successful",
      };
    } catch (error) {
      return {
        success: false,
        message: error.message || "Network error occurred",
      };
    }
  }

  // Clear authentication data
  clearAuthData() {
    this.token = null;
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
  }

  decodeToken(token) {
    try {
      const cleanToken = token?.replace(/^Bearer\s+/, "") || token;
      const decoded = jwtDecode(cleanToken);
      console.log(decoded);
      return decoded;
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  }

  setToken(token) {
    this.token = token;
    localStorage.setItem("authToken", token.data);
  }

  // Get token
  getToken() {
    return this.token || localStorage.getItem("authToken");
  }

  // Check if user is authenticated
  isAuthenticated() {
    const token = this.getToken();
    if (!token) return false;

    try {
      // Check if token is expired (basic JWT check)
      const payload = JSON.parse(atob(token.split(".")[1]));
      const currentTime = Date.now() / 1000;

      if (payload.exp < currentTime) {
        this.clearAuthData();
        return false;
      }

      return true;
    } catch (error) {
      console.log(error);
      this.clearAuthData();
      return false;
    }
  }

  // Get current user info
  getCurrentUser() {
    try {
      const user = localStorage.getItem("user");
      return user ? JSON.parse(user) : null;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  // Store user info
  setCurrentUser(user) {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    }
  }

  // Get headers with auth token
  getAuthHeaders() {
    const token = this.getToken();
    return {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    };
  }

  // Get current user from server
  async fetchCurrentUser() {
    try {
      const response = await fetch(`${this.baseURL}/me`, {
        method: "GET",
        headers: this.getAuthHeaders(),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 401) {
          this.clearAuthData();
        }
        throw new Error(data.message || "Failed to fetch user data");
      }

      this.setCurrentUser(data.user);

      return {
        success: true,
        data: data.user,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  // Generic API call with auth
  async apiCall(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: this.getAuthHeaders(),
      ...options,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        // Handle 401 Unauthorized
        if (response.status === 401) {
          this.clearAuthData();
          throw new Error("Session expired. Please login again.");
        }
        throw new Error(data.message || "API call failed");
      }

      return { success: true, data };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }
}
// Create and export singleton instance
const authService = new AuthService();
export default authService;
