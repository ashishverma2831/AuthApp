import axios from "axios";

const apiBaseUrl = import.meta.env.VITE_CLIENT_API_URL;

/**
 * Fetches the authenticated user's profile.
 *
 * Authentication cookies are included so the protected profile endpoint can
 * identify the current user.
 */
export async function fetchUserData() {
  const response = await axios.get(`${apiBaseUrl}/api/users/profile`, {
    withCredentials: true,
  });

  return response.data.user;
}
