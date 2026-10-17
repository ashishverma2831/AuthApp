import axiosClient from "./axiosClient";

/**
 * Fetches the authenticated user's profile.
 *
 * Authentication cookies are included so the protected profile endpoint can
 * identify the current user.
 */
export async function fetchUserData() {
  const response = await axiosClient.get("/api/users/profile");

  return response.data.user;
}
