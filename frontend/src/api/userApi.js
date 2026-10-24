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

export async function loginUser(credentials) {
  const response = await axiosClient.post("/api/users/login", credentials);

  return response.data.user;
}

export async function registerUser(userDetails) {
  const response = await axiosClient.post("/api/users/register", userDetails);

  return response.data.user;
}

export async function logoutUser() {
  await axiosClient.post("/api/users/logout");
}

export async function updateUserProfile(profileUpdates) {
  const response = await axiosClient.put("/api/users/profile", profileUpdates);

  return response.data.user;
}
