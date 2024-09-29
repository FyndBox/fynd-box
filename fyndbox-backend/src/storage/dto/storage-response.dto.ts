export class StorageResponseDto {
  readonly id: number;
  readonly name: string;
  readonly description?: string;
  readonly image?: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}
