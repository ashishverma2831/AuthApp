import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  fetchUserData,
  loginUser,
  logoutUser,
  updateUserProfile,
} from "../api/userApi";

const CURRENT_USER_QUERY_KEY = ["auth", "currentUser"];

export function useAuth() {
  const queryClient = useQueryClient();
  const currentUserQuery = useQuery({
    queryKey: CURRENT_USER_QUERY_KEY,
    queryFn: fetchUserData,
    retry: false,
  });

  const loginMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (user) => {
      queryClient.setQueryData(CURRENT_USER_QUERY_KEY, user);
    },
  });

  const logoutMutation = useMutation({
    mutationFn: logoutUser,
    onSettled: () => {
      queryClient.setQueryData(CURRENT_USER_QUERY_KEY, null);
    },
  });

  const updateProfileMutation = useMutation({
    mutationFn: updateUserProfile,
    onSuccess: (user) => {
      queryClient.setQueryData(CURRENT_USER_QUERY_KEY, user);
    },
  });

  return {
    user: currentUserQuery.data ?? null,
    isLoading: currentUserQuery.isLoading,
    error: currentUserQuery.error,
    login: loginMutation.mutateAsync,
    logout: logoutMutation.mutateAsync,
    updateProfile: updateProfileMutation.mutateAsync,
  };
}
