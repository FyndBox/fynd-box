import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TranslationModule } from 'src/translation/translation.module';
import { Box } from './box.entity';
import { BoxService } from './box.service';
import { BoxController } from './box.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Box]), TranslationModule],
  providers: [BoxService],
  controllers: [BoxController],
  exports: [BoxService],
})
export class BoxModule {}
