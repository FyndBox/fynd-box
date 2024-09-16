import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} from '../api/userService';
import { User } from '../types/user';

interface UpdateUserData {
  user: Partial<User>;
}

export const useUsers = () => {
  return useQuery<User[], Error>({
    queryKey: ['users'],
    queryFn: getUsers,
  });
};

export const useUser = () => {
  return useQuery<User, Error>({
    queryKey: ['user'],
    queryFn: () => getUserById(),
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation<User, Error, UpdateUserData>(
    // @ts-ignore
    (data: UpdateUserData) => updateUser(data.user),
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

  return useMutation<void, Error>(
    // @ts-ignore
    () => deleteUser(),
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
