import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Item } from '../types/item';
import {
  createItem,
  deleteItem,
  getItemById,
  getItems,
  updateItem,
} from '../api/itemService';

// Fetch all items for a given box
export const useItems = (boxId: string) => {
  return useQuery<Item[], Error>({
    queryKey: ['items', boxId],
    queryFn: () => getItems(boxId),
  });
};

// Fetch a specific item by box Id and item Id
export const useItem = (boxId: string, itemId: string) => {
  return useQuery<Item, Error>({
    queryKey: ['item', boxId, itemId],
    queryFn: () => getItemById(boxId, itemId),
  });
};

// Create a new item
export const useCreateItem = () => {
  const queryClient = useQueryClient();

  return useMutation<
    Item,
    Error,
    { storageId: string; boxId: string; itemData: Partial<Item> }
  >({
    mutationFn: ({ storageId, boxId, itemData }) =>
      createItem(storageId, boxId, itemData),
    onSuccess: (_data, { storageId, boxId }) => {
      queryClient.invalidateQueries({ queryKey: ['boxes', storageId] });
      queryClient.invalidateQueries({ queryKey: ['items', boxId] });
      queryClient.invalidateQueries({ queryKey: ['box', storageId, boxId] });
    },
    onError: (error: Error) => {
      console.error('Error creating item', error);
    },
  });
};

// Update a item by ID and box ID
export const useUpdateItem = () => {
  const queryClient = useQueryClient();

  return useMutation<
    Item,
    Error,
    {
      itemId: string;
      boxId: string;
      storageId: string;
      itemData: Partial<Item>;
    }
  >({
    mutationFn: ({ itemId, boxId, itemData }) =>
      updateItem(boxId, itemId, itemData),
    onSuccess: (_data, { boxId, itemId, storageId }) => {
      queryClient.invalidateQueries({ queryKey: ['item', boxId, itemId] });
      queryClient.invalidateQueries({ queryKey: ['items', boxId] });
      queryClient.invalidateQueries({ queryKey: ['boxes', storageId] });
    },
    onError: (error: Error) => {
      console.error('Error updating box', error);
    },
  });
};

// Delete a item by box ID and item ID
export const useDeleteItem = () => {
  const queryClient = useQueryClient();

  return useMutation<
    void,
    Error,
    { boxId: string; itemId: string; storageId: string }
  >({
    mutationFn: ({ boxId, itemId }) => deleteItem(boxId, itemId),
    onSuccess: (_data, { boxId, storageId }) => {
      queryClient.invalidateQueries({ queryKey: ['boxes', storageId] });
      queryClient.invalidateQueries({ queryKey: ['items', boxId] });
    },
    onError: (error: Error) => {
      console.error('Error deleting item', error);
    },
  });
};
