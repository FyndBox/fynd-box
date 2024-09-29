import { AxiosResponse } from 'axios';
import { ApiResponse } from '../../../shared/types/api-response';

export const handleApiCall = async <T>(
  apiCall: Promise<AxiosResponse<ApiResponse<T>>>,
): Promise<T> => {
  try {
    const axiosResponse = await apiCall;
    const response = axiosResponse.data;

    if (response.success) {
      return response.data as T;
    } else {
      throw new Error(response.message || 'Something went wrong');
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message || 'API request failed');
    } else {
      throw new Error('An unexpected error occurred');
    }
  }
};
