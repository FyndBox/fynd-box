import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getStorages,
  getStorageById,
  createStorage,
  updateStorage,
  deleteStorage,
  searchStorages,
} from '../api/storageService';
import { Storage } from '../types/storage';

interface UpdateStorageData {
  id: number;
  storage: Partial<Storage>;
}

export const useStorages = (keyword?: string) => {
  return useQuery<Storage[], Error>({
    queryKey: keyword ? ['storages', 'search', keyword] : ['storages'],
    queryFn: keyword ? () => searchStorages(keyword) : getStorages,
    enabled: keyword !== undefined, // Only enable the query when needed
  });
};

export const useStorage = (id: string) => {
  return useQuery<Storage, Error>({
    queryKey: ['storage', id],
    queryFn: () => getStorageById(id),
  });
};

export const useCreateStorage = () => {
  const queryClient = useQueryClient();

  return useMutation<Storage, Error, Partial<Storage>>({
    mutationFn: (newStorage: Partial<Storage>) => createStorage(newStorage),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['storages'] });
    },
    onError: (error: Error) => {
      console.error('Error creating storage', error);
    },
  });
};

export const useUpdateStorage = () => {
  const queryClient = useQueryClient();

  return useMutation<Storage, Error, UpdateStorageData>({
    mutationFn: ({ id, storage }: UpdateStorageData) =>
      updateStorage(id, storage),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['storages'] });
    },
    onError: (error: Error) => {
      console.error('Error updating storage', error);
    },
  });
};

export const useDeleteStorage = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, number>({
    mutationFn: (id: number) => deleteStorage(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['storages'] });
    },
    onError: (error: Error) => {
      console.error('Error deleting storage', error);
    },
  });
};
