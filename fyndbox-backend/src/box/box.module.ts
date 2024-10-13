import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TranslationModule } from 'src/translation/translation.module';
import { Box } from './box.entity';
import { BoxService } from './box.service';
import { BoxController } from './box.controller';
import { StorageModule } from 'src/storage/storage.module';

@Module({
  imports: [TypeOrmModule.forFeature([Box]), TranslationModule, StorageModule],
  providers: [BoxService],
  controllers: [BoxController],
  exports: [BoxService],
})
export class BoxModule {}
