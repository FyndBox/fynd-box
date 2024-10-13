import apiClient from './apiClient';
import { handleApiCall } from '../utils/handleApiCall';
import { ApiResponse } from '@fyndbox/shared/types/api-response';
import { Box } from '../types/box';

// Get all boxes for a storage
export const getBoxes = async (storageId: string): Promise<Box[]> => {
  return handleApiCall(
    apiClient.get<ApiResponse<Box[]>>(`/boxes/${storageId}`),
  );
};

// Get a box by ID and storage ID
export const getBoxById = async (
  storageId: string,
  boxId: string,
): Promise<Box> => {
  return handleApiCall(
    apiClient.get<ApiResponse<Box>>(`/boxes/${storageId}/${boxId}`),
  );
};

// Create a new box
export const createBox = async (
  storageId: string,
  boxData: Partial<Box>,
): Promise<Box> => {
  return handleApiCall(
    apiClient.post<ApiResponse<Box>>(`/boxes/${storageId}`, boxData),
  );
};

// Update a box by ID and storage ID
export const updateBox = async (
  boxId: string,
  storageId: string,
  boxData: Partial<Box>,
): Promise<Box> => {
  return handleApiCall(
    apiClient.put<ApiResponse<Box>>(`/boxes/${storageId}/${boxId}`, boxData),
  );
};

// Delete a box by storage ID and ID
export const deleteBox = async (
  boxId: string,
  storageId: string,
): Promise<void> => {
  return handleApiCall(
    apiClient.delete<ApiResponse<void>>(`/boxes/${storageId}/${boxId}`),
  );
};
