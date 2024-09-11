import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:3000", // Replace with your backend URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Define routes that don't require authentication
const publicRoutes = ["/auth/login", "/auth/signup"];

// Add a request interceptor to include the token for protected routes
apiClient.interceptors.request.use(
  (config) => {
    // Check if the request URL matches any public routes
    const isPublicRoute = publicRoutes.some((route) =>
      config.url?.includes(route)
    );

    // If it's not a public route, include the token in the Authorization header
    if (!isPublicRoute) {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    // Return the request configuration (whether modified or not)
    return config;
  },
  (error) => {
    // Handle any request error
    return Promise.reject(error);
  }
);

// Handle errors globally (optional)
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // You can handle global errors here
    return Promise.reject(
      error.response?.data?.message || "Something went wrong"
    );
  }
);

export default apiClient;
