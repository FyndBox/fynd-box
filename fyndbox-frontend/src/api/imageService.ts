import { ApiResponse } from '@fyndbox/shared';
import { handleApiCall } from '../utils/handleApiCall';
import apiClient from './apiClient';

export const uploadImage = async (
  file: File,
): Promise<{ imageUrl: string }> => {
  const formData = new FormData();
  formData.append('file', file);

  return handleApiCall(
    apiClient.post<ApiResponse<{ imageUrl: string }>>(
      '/images/upload',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data', // Important for file uploads
        },
      },
    ),
  );
};
