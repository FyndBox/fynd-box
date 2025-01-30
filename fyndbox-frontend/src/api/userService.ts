import apiClient from './apiClient';
import { handleApiCall } from '../utils/handleApiCall';
import { ApiResponse } from '@fyndbox/shared/types/api-response';
import { User } from '../types/user';

export const getUsers = async (): Promise<User[]> => {
  return handleApiCall(apiClient.get<ApiResponse<User[]>>('/users'));
};

export const getUserById = async (): Promise<User> => {
  return handleApiCall(apiClient.get<ApiResponse<User>>(`/users/me`));
};

export const updateUser = async (userData: Partial<User>): Promise<User> => {
  return handleApiCall(apiClient.put<ApiResponse<User>>(`/users`, userData));
};

export const deactivateUser = async (): Promise<void> => {
  return handleApiCall(apiClient.put<ApiResponse<void>>(`/users/deactivate`));
};

export const deleteUser = async (): Promise<void> => {
  return handleApiCall(apiClient.delete<ApiResponse<void>>(`/users`));
};
