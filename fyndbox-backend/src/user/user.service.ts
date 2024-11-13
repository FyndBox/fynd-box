import * as bcrypt from 'bcrypt';
import { Injectable, NotFoundException, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { TranslationService } from 'src/translation/translation.service';
import { BaseService } from 'src/common/base.service';

@Injectable({ scope: Scope.REQUEST })
export class UserService extends BaseService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private translationService: TranslationService,
  ) {
    super();
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find({
      relations: ['storages'],
    });
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['storages'],
    });
    if (!user) {
      throw new NotFoundException(
        this.translationService.getTranslation(
          'api.users.notFoundById',
          this.getLang(),
          { id: id.toString() },
        ),
      );
    }
    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { email: email.toLowerCase() },
      relations: ['storages'],
    });
    if (!user) {
      throw new NotFoundException(
        this.translationService.getTranslation(
          'api.users.notFoundByEmail',
          this.getLang(),
          { email },
        ),
      );
    }
    return user;
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = new User();
    user.name = createUserDto.name;
    user.email = createUserDto.email;

    // Hash the password before storing it
    const saltOrRounds = 10;
    user.password = await bcrypt.hash(createUserDto.password, saltOrRounds);

    const newUser = this.userRepository.create(user);
    return this.userRepository.save(newUser);
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    await this.userRepository.update(id, updateUserDto);
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException(
        this.translationService.getTranslation(
          'api.users.notFoundById',
          this.getLang(),
          {
            id: id.toString(),
          },
        ),
      );
    }
    await this.userRepository.delete(id);
  }
}
