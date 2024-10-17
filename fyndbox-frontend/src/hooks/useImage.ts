import { useMutation } from '@tanstack/react-query';
import { uploadImage } from '../api/imageService';

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
