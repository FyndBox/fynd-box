import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TranslationModule } from 'src/translation/translation.module';
import { CustomNotification } from './custom-notification.entity';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';
import { BoxModule } from 'src/box/box.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([CustomNotification]),
    TranslationModule,
    BoxModule,
  ],
  providers: [NotificationService],
  controllers: [NotificationController],
  exports: [NotificationService],
})
export class NotificationModule {}
