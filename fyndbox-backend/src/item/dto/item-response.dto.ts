export class ItemResponseDto {
  readonly id: string;
  readonly name: string;
  readonly description?: string;
  readonly image?: string;
  readonly quantity?: number;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}
