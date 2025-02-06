export class NotificationResponseDto {
  readonly id: string;
  readonly message: string;
  readonly isRead: boolean;
  readonly userId: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}
