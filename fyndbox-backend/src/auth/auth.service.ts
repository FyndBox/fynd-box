import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
  Inject,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';
import { LoginDto } from './dto/login.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { TranslationService } from 'src/translation/translation.service';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private translationService: TranslationService,
    @Inject(REQUEST) private request: Request,
  ) {}

  private getLang(): string {
    return this.request.language || 'en'; // Default to 'en' if language is undefined
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

    const payload = { email: newUser.email, sub: newUser.id };
    const access_token = this.jwtService.sign(payload);

    return { access_token };
  }

  async updatePassword(
    userId: number,
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
}
