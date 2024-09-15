import apiClient from './apiClient';
import { handleApiCall } from '../utils/handleApiCall';
import { ApiResponse } from '@fyndbox/shared/types/api-response';
import { User } from '../types/user';

export const getUsers = async (): Promise<User[]> => {
  return handleApiCall(apiClient.get<ApiResponse<User[]>>('/users'));
};

export const getUserById = async (id: number): Promise<User> => {
  return handleApiCall(apiClient.get<ApiResponse<User>>(`/users/${id}`));
};

export const updateUser = async (
  id: number,
  userData: Partial<User>,
): Promise<User> => {
  return handleApiCall(
    apiClient.put<ApiResponse<User>>(`/users/${id}`, userData),
  );
};

export const deleteUser = async (id: number): Promise<void> => {
  return handleApiCall(apiClient.delete<ApiResponse<void>>(`/users/${id}`));
};
