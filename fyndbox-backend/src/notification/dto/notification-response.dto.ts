export class NotificationResponseDto {
  readonly id: string;
  readonly title: string;
  readonly message: string;
  readonly avatar: string;
  readonly isRead: boolean;
  readonly userId: string;
  readonly boxId: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}
