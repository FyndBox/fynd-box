import { handleApiCall } from '../utils/handleApiCall';
import apiClient from './apiClient';
import { ApiResponse } from '@fyndbox/shared/types/api-response';

export interface AuthResponse {
  access_token: string;
}

export const login = async (
  email: string,
  password: string,
): Promise<AuthResponse> => {
  return handleApiCall(
    apiClient.post<ApiResponse<AuthResponse>>('/auth/login', {
      email,
      password,
    }),
  );
};

export const signup = async (
  name: string,
  email: string,
  password: string,
): Promise<AuthResponse> => {
  return handleApiCall(
    apiClient.post<ApiResponse<AuthResponse>>('/auth/signup', {
      name,
      email,
      password,
    }),
  );
};

export const updatePassword = async (
  currentPassword: string,
  newPassword: string,
): Promise<void> => {
  return handleApiCall(
    apiClient.patch<ApiResponse<void>>('/auth/password', {
      currentPassword,
      newPassword,
    }),
  );
};