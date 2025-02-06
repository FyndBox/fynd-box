import { Injectable, NotFoundException, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cron } from '@nestjs/schedule';
import { Repository } from 'typeorm';
import { TranslationService } from 'src/translation/translation.service';
import { CustomNotification } from './custom-notification.entity';
import { BaseService } from 'src/common/base.service';
import { BoxService } from 'src/box/box.service';

@Injectable({ scope: Scope.REQUEST })
export class NotificationService extends BaseService {
  constructor(
    @InjectRepository(CustomNotification)
    private notificationRepository: Repository<CustomNotification>,
    private boxService: BoxService,
    private translationService: TranslationService,
  ) {
    super();
  }

  async findAll(userId: string): Promise<CustomNotification[]> {
    return this.notificationRepository.find({
      where: { userId },
      order: { createdAt: 'DESC' },
    });
  }

  async markAsRead(notificationId: string, userId: string): Promise<void> {
    const notification = await this.notificationRepository.findOne({
      where: { id: notificationId, userId },
    });

    if (!notification) {
      throw new NotFoundException(
        this.translationService.getTranslation(
          'api.notifications.notFoundById',
          this.getLang(),
          {
            id: notificationId.toString(),
          },
        ),
      );
    }

    notification.isRead = true;
    await this.notificationRepository.save(notification);
  }

  async create(message: string, userId: string): Promise<CustomNotification> {
    const notification = new CustomNotification();
    notification.message = message;
    notification.userId = userId;

    return this.notificationRepository.save(notification);
  }

  async remove(notificationId: string, userId: string): Promise<void> {
    const notification = await this.notificationRepository.findOne({
      where: { id: notificationId, userId },
    });

    if (!notification) {
      throw new NotFoundException(
        this.translationService.getTranslation(
          'api.notifications.notFoundById',
          this.getLang(),
          {
            id: notificationId,
          },
        ),
      );
    }

    await this.notificationRepository.delete(notificationId);
  }

  @Cron('0 0 * * 1') // Runs every Monday at 00:00 (Midnight)
  async sendWeeklyReminders(): Promise<void> {
    const outdatedBoxes = await this.boxService.findOutdatedBoxes();

    for (const box of outdatedBoxes) {
      if (box.storage && box.storage.user) {
        const message = `Reminder: The box '${box.name}' (ID: ${box.id}) in storage '${box.storage.name}' has not been modified for more than 7 days.`;
        await this.create(message, box.storage.user.id);
      }
    }
  }
}
