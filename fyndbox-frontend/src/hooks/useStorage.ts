import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getStorages,
  getStorageById,
  createStorage,
  updateStorage,
  deleteStorage,
} from '../api/storageService';
import { Storage } from '../types/storage';

interface UpdateStorageData {
  id: number;
  storage: Partial<Storage>;
}

export const useStorages = () => {
  return useQuery<Storage[], Error>({
    queryKey: ['storages'],
    queryFn: getStorages,
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
