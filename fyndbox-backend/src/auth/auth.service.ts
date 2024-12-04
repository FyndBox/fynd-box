import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
  Scope,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';
import { BaseService } from '../common/base.service';
import { LoginDto } from './dto/login.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { TranslationService } from 'src/translation/translation.service';
import { StorageService } from 'src/storage/storage.service';
import { BoxService } from 'src/box/box.service';
import * as postmark from 'postmark';

@Injectable({ scope: Scope.REQUEST })
export class AuthService extends BaseService {
  private postmarkClient;

  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private translationService: TranslationService,
    private storageService: StorageService,
    private boxService: BoxService,
  ) {
    super();
    this.postmarkClient = new postmark.ServerClient(
      process.env.POSTMARK_API_KEY,
    );
  }

  async login(loginDto: LoginDto): Promise<{ access_token: string }> {
    const user = await this.userService.findByEmail(loginDto.email);

    if (!user) {
      throw new UnauthorizedException(
        this.translationService.getTranslation(
          'api.auth.login.error.invalidCredentials',
          this.getLang(),
        ),
      );
    }

    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException(
        this.translationService.getTranslation(
          'api.auth.login.error.invalidCredentials',
          this.getLang(),
        ),
      );
    }

    const payload = { email: user.email, sub: user.id }; // JWT payload
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async signup(
    createUserDto: CreateUserDto,
  ): Promise<{ access_token: string }> {
    const existingUser = await this.userService
      .findByEmail(createUserDto.email)
      .catch(() => null);

    if (existingUser) {
      throw new BadRequestException(
        this.translationService.getTranslation(
          'api.auth.signup.error.emailAlreadyRegistered',
          this.getLang(),
        ),
      );
    }

    const newUser = await this.userService.create(createUserDto);

    // Automatically create a storage for the new user
    const defaultStorage = await this.storageService.create(
      {
        name: 'Garage',
        description: 'My Garage',
      },
      newUser.id,
    );

    // Automatically create a box within the created storage
    await this.boxService.create(
      {
        name: 'Låda 1',
        description: 'This is default box',
      },
      defaultStorage.id,
      newUser.id,
    );

    const payload = { email: newUser.email, sub: newUser.id };
    const access_token = this.jwtService.sign(payload);

    return { access_token };
  }

  async updatePassword(
    userId: string,
    updatePasswordDto: UpdatePasswordDto,
  ): Promise<void> {
    const user = await this.userService.findOne(userId);

    const isPasswordValid = await bcrypt.compare(
      updatePasswordDto.currentPassword,
      user.password,
    );
    if (!isPasswordValid) {
      throw new BadRequestException(
        this.translationService.getTranslation(
          'api.auth.password.error.incorrectPassword',
          this.getLang(),
        ),
      );
    }

    const hashedPassword = await bcrypt.hash(updatePasswordDto.newPassword, 10);
    await this.userService.update(userId, { password: hashedPassword });
  }

  async forgotPassword(email: string): Promise<void> {
    const user = await this.userService.findByEmail(email);

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    user.resetToken = resetToken;
    user.resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hour expiry
    await this.userRepository.save(user);

    // Generate reset URL
    const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;

    // Send email using Postmark template
    await this.postmarkClient.sendEmailWithTemplate({
      From: process.env.POSTMARK_FROM_EMAIL,
      To: email,
      TemplateId: parseInt(process.env.POSTMARK_TEMPLATE_ID, 10),
      TemplateModel: {
        name: user.name, // User's name
        reset_url: resetUrl, // Reset URL
        email: email,
      },
    });
  }
}
