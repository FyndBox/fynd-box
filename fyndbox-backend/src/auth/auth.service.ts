import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';
import { LoginDto } from './dto/login.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { CreateUserDto } from '../user/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto): Promise<{ access_token: string }> {
    const user = await this.userService.findByEmail(loginDto.email);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
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
      throw new BadRequestException('Email is already registered');
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
      throw new BadRequestException('Current password is incorrect');
    }

    const hashedPassword = await bcrypt.hash(updatePasswordDto.newPassword, 10);
    await this.userService.update(userId, { password: hashedPassword });
  }
}
