import { Box } from './box';

export interface Storage {
  boxes: Box[];
  id: number;
  name: string;
  description?: string;
  image?: string;
}
