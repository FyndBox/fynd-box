import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} from '../api/userService';
import { User } from '../types/user';

interface UpdateUserData {
  id: number;
  user: Partial<User>;
}

export const useUsers = () => {
  return useQuery<User[], Error>({
    queryKey: ['users'],
    queryFn: getUsers,
  });
};

export const useUser = (id: number) => {
  return useQuery<User, Error>({
    queryKey: ['user', id],
    queryFn: () => getUserById(id),
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation<User, Error, UpdateUserData>(
    // @ts-ignore
    (data: UpdateUserData) => updateUser(data.id, data.user),
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['users'] });
      },
      onError: (error: Error) => {
        console.error('Error updating user', error);
      },
    },
  );
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, number>(
    // @ts-ignore
    (id: number) => deleteUser(id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['users'] });
      },
      onError: (error: Error) => {
        console.error('Error deleting user', error);
      },
    },
  );
};
