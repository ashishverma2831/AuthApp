import axios from "axios";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_CLIENT_API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

let refreshPromise;

function refreshSession() {
  if (!refreshPromise) {
    refreshPromise = axiosClient
      .post("/api/users/refresh")
      .finally(() => {
        refreshPromise = undefined;
      });
  }

  return refreshPromise;
}

axiosClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const request = error.config;
    const isAuthenticationRequest = request?.url?.includes("/login") || request?.url?.includes("/refresh");

    if (!request || error.response?.status !== 401 || request._retry || isAuthenticationRequest) {
      return Promise.reject(error);
    }

    request._retry = true;

    try {
      await refreshSession();
      return axiosClient(request);
    } catch (refreshError) {
      return Promise.reject(refreshError);
    }
  },
);

export default axiosClient;
