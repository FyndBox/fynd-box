import { Injectable, NotFoundException, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Storage } from './storage.entity';
import { User } from '../user/user.entity';
import { CreateStorageDto } from './dto/create-storage.dto';
import { UpdateStorageDto } from './dto/update-storage.dto';
import { TranslationService } from 'src/translation/translation.service';
import { BaseService } from 'src/common/base.service';

@Injectable({ scope: Scope.REQUEST })
export class StorageService extends BaseService {
  constructor(
    @InjectRepository(Storage)
    private readonly storageRepository: Repository<Storage>,
    private readonly translationService: TranslationService,
  ) {
    super();
  }

  async findAll(userId: number): Promise<Storage[]> {
    return this.storageRepository.find({ where: { userId } });
  }

  async findOne(id: number, userId: number): Promise<Storage> {
    const storage = await this.storageRepository.findOne({
      where: { id, userId },
    });
    if (!storage) {
      throw new NotFoundException(
        this.translationService.getTranslation(
          'api.storages.notFoundById',
          this.getLang(),
          { id: id.toString() },
        ),
      );
    }
    return storage;
  }

  async create(
    createStorageDto: CreateStorageDto,
    userId: number,
  ): Promise<Storage> {
    const storage = this.storageRepository.create({
      ...createStorageDto,
      user: { id: userId } as User,
    });
    return this.storageRepository.save(storage);
  }

  async update(
    id: number,
    updateStorageDto: UpdateStorageDto,
    userId: number,
  ): Promise<Storage> {
    const storage = await this.findOne(id, userId);
    Object.assign(storage, updateStorageDto);
    return this.storageRepository.save(storage);
  }

  async remove(id: number, userId: number): Promise<void> {
    const storage = await this.findOne(id, userId);
    if (!storage) {
      throw new NotFoundException(
        this.translationService.getTranslation(
          'api.storages.notFoundById',
          this.getLang(),
          { id: id.toString() },
        ),
      );
    }
    await this.storageRepository.remove(storage);
  }
}
