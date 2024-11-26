import { useMutation } from '@tanstack/react-query';
import { deleteImage, uploadImage } from '../api/imageService';

export const useUploadImage = () => {
  return useMutation<{ imageUrl: string }, Error, File>({
    mutationFn: (file: File) => uploadImage(file),
    onSuccess: (data) => {
      console.log('Image uploaded successfully:', data.imageUrl);
    },
    onError: (error: Error) => {
      console.error('Error uploading image:', error);
    },
  });
};

export const useDeleteImage = () => {
  return useMutation<void, Error, string>({
    mutationFn: (key: string) => deleteImage(key),
    onSuccess: () => {
      console.log('Image deleted successfully.');
    },
    onError: (error: Error) => {
      console.error('Error deleting image:', error);
    },
  });
};
