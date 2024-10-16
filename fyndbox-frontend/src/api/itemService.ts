import apiClient from './apiClient';
import { handleApiCall } from '../utils/handleApiCall';
import { ApiResponse } from '@fyndbox/shared/types/api-response';
import { Item } from '../types/item';

// Get all items for a box
export const getItems = async (boxId: string): Promise<Item[]> => {
  return handleApiCall(apiClient.get<ApiResponse<Item[]>>(`/items/${boxId}`));
};

// Get a item by ID and box ID
export const getItemById = async (
  boxId: string,
  itemId: string,
): Promise<Item> => {
  return handleApiCall(
    apiClient.get<ApiResponse<Item>>(`/items/${boxId}/${itemId}`),
  );
};

// Create a new item
export const createItem = async (
  storageId: string,
  boxId: string,
  itemData: Partial<Item>,
): Promise<Item> => {
  return handleApiCall(
    apiClient.post<ApiResponse<Item>>(`/items/${boxId}/${storageId}`, itemData),
  );
};

// Update a item by ID and box ID
export const updateItem = async (
  boxId: string,
  itemId: string,
  itemData: Partial<Item>,
): Promise<Item> => {
  return handleApiCall(
    apiClient.put<ApiResponse<Item>>(`/items/${boxId}/${itemId}`, itemData),
  );
};

// Delete a item by box ID and ID
export const deleteItem = async (
  boxId: string,
  itemId: string,
): Promise<void> => {
  return handleApiCall(
    apiClient.delete<ApiResponse<void>>(`/items/${boxId}/${itemId}`),
  );
};
