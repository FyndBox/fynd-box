import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Box } from '../types/box';
import {
  getBoxes,
  getBoxById,
  createBox,
  updateBox,
  deleteBox,
} from '../api/boxServices';

// Fetch all boxes for a given storage
export const useBoxes = (storageId: string) => {
  return useQuery<Box[], Error>({
    queryKey: ['boxes', storageId],
    queryFn: () => getBoxes(storageId),
  });
};

// Fetch a specific box by storage ID and box ID
export const useBox = (storageId: string, boxId: string) => {
  return useQuery<Box, Error>({
    queryKey: ['box', storageId, boxId],
    queryFn: () => getBoxById(storageId, boxId),
  });
};

// Create a new box
export const useCreateBox = () => {
  const queryClient = useQueryClient();

  return useMutation<Box, Error, { storageId: string; boxData: Partial<Box> }>({
    mutationFn: ({ storageId, boxData }) => createBox(storageId, boxData),
    onSuccess: (_data, { storageId }) => {
      queryClient.invalidateQueries({ queryKey: ['boxes', storageId] });
      queryClient.invalidateQueries({ queryKey: ['storages'] });
    },
    onError: (error: Error) => {
      console.error('Error creating box', error);
    },
  });
};

// Update a box by ID and storage ID
export const useUpdateBox = () => {
  const queryClient = useQueryClient();

  return useMutation<
    Box,
    Error,
    { boxId: string; storageId: string; boxData: Partial<Box> }
  >({
    mutationFn: ({ boxId, storageId, boxData }) =>
      updateBox(boxId, storageId, boxData),
    onSuccess: (_data, { storageId, boxId }) => {
      queryClient.invalidateQueries({ queryKey: ['box', storageId, boxId] });
      queryClient.invalidateQueries({ queryKey: ['boxes', storageId] });
      queryClient.invalidateQueries({ queryKey: ['storages'] });
    },
    onError: (error: Error) => {
      console.error('Error updating box', error);
    },
  });
};

// Delete a box by storage ID and box ID
export const useDeleteBox = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, { storageId: string; boxId: string }>({
    mutationFn: ({ storageId, boxId }) => deleteBox(boxId, storageId),
    onSuccess: (_data, { storageId }) => {
      queryClient.invalidateQueries({ queryKey: ['boxes', storageId] });
      queryClient.invalidateQueries({ queryKey: ['storages'] });
    },
    onError: (error: Error) => {
      console.error('Error deleting box', error);
    },
  });
};
