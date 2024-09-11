import apiClient from "./apiClient";

export interface LoginResponse {
  access_token: string;
}

export const login = async (
  email: string,
  password: string
): Promise<LoginResponse> => {
  const response = await apiClient.post<LoginResponse>("/auth/login", {
    email,
    password,
  });
  return response.data;
};

export const signup = async (
  name: string,
  email: string,
  password: string
): Promise<LoginResponse> => {
  const response = await apiClient.post<LoginResponse>("/auth/signup", {
    name,
    email,
    password,
  });
  return response.data;
};

// Example for updating password
export const updatePassword = async (
  currentPassword: string,
  newPassword: string
): Promise<void> => {
  await apiClient.patch("/auth/password", { currentPassword, newPassword });
};
