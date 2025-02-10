import apiClient from './apiClient';
import { handleApiCall } from '../utils/handleApiCall';
import { ApiResponse } from '@fyndbox/shared/types/api-response';
import { CustomNotification } from '../types/custom-notification';

// Get all notifications for the logged-in user
export const getNotifications = async (): Promise<CustomNotification[]> => {
  return handleApiCall(
    apiClient.get<ApiResponse<CustomNotification[]>>('/notifications'),
  );
};

// Mark a notification as read
export const markNotificationAsRead = async (
  notificationId: string,
): Promise<void> => {
  return handleApiCall(
    apiClient.put<ApiResponse<void>>(
      `/notifications/${notificationId}/mark-read`,
    ),
  );
};

// Delete a notification
export const deleteNotification = async (
  notificationId: string,
): Promise<void> => {
  return handleApiCall(
    apiClient.delete<ApiResponse<void>>(`/notifications/${notificationId}`),
  );
};
