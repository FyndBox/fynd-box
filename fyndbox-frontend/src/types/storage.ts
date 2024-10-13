import { Box } from './box';

export interface Storage {
  boxes: Box[];
  id: string;
  name: string;
  description?: string;
  image?: string;
}
