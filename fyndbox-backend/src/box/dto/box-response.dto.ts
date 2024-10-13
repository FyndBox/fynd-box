export class BoxResponseDto {
  readonly id: string;
  readonly name: string;
  readonly description?: string;
  readonly image?: string;
  readonly isFavorite?: boolean;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}
