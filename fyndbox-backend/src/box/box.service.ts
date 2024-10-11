import { Injectable, NotFoundException, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Box } from './box.entity';
import { Storage } from '../storage/storage.entity';
import { CreateBoxDto } from './dto/create-box.dto';
import { UpdateBoxDto } from './dto/update-box.dto';
import { TranslationService } from 'src/translation/translation.service';
import { BaseService } from 'src/common/base.service';

@Injectable({ scope: Scope.REQUEST })
export class BoxService extends BaseService {
  constructor(
    @InjectRepository(Box)
    private readonly boxRepository: Repository<Box>,
    @InjectRepository(Storage)
    private readonly storageRepository: Repository<Storage>,
    private readonly translationService: TranslationService,
  ) {
    super();
  }

  async findAll(storageId: string): Promise<Box[]> {
    return this.boxRepository.find({
      where: { storageId },
    });
  }

  async findOne(id: string, storageId: string): Promise<Box> {
    const box = await this.boxRepository.findOne({
      where: { id, storageId },
    });
    if (!box) {
      throw new NotFoundException(
        this.translationService.getTranslation(
          'api.boxes.notFoundById',
          this.getLang(),
          { id: id.toString() },
        ),
      );
    }
    return box;
  }

  async create(createBoxDto: CreateBoxDto, storageId: string): Promise<Box> {
    const storage = await this.storageRepository.findOne({
      where: { id: storageId },
    });
    if (!storage) {
      throw new NotFoundException(
        this.translationService.getTranslation(
          'api.storages.notFoundById',
          this.getLang(),
          { id: storageId.toString() },
        ),
      );
    }

    const box = this.boxRepository.create({
      ...createBoxDto,
      storage: storage,
    });

    return this.boxRepository.save(box);
  }

  async update(
    id: string,
    updateBoxDto: UpdateBoxDto,
    storageId: string,
  ): Promise<Box> {
    const box = await this.findOne(id, storageId);
    Object.assign(box, updateBoxDto);
    return this.boxRepository.save(box);
  }

  async remove(id: string, storageId: string): Promise<void> {
    const box = await this.findOne(id, storageId);
    if (!box) {
      throw new NotFoundException(
        this.translationService.getTranslation(
          'api.boxes.notFoundById',
          this.getLang(),
          { id: id.toString() },
        ),
      );
    }
    await this.boxRepository.remove(box);
  }
}
