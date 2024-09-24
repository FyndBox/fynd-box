import {
  Controller,
  Post,
  Patch,
  Body,
  Request,
  UseGuards,
  HttpException,
  HttpStatus,
  Headers,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { ApiResponse } from '@fyndbox/shared/types/api-response';
import { TranslationService } from 'src/translation/translation.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly translationService: TranslationService,
  ) {}

  @Post('login')
  async login(
    @Body() loginDto: LoginDto,
    @Headers('accept-language') lang: string = 'en',
  ): Promise<ApiResponse<{ access_token: string }>> {
    try {
      const token = await this.authService.login(loginDto);
      return {
        statusCode: HttpStatus.OK,
        success: true,
        message: this.translationService.getTranslation(
          'api.auth.login.success',
          lang,
        ),
        data: token,
      };
    } catch (error) {
      throw new HttpException(
        {
          statusCode: HttpStatus.UNAUTHORIZED,
          success: false,
          message: this.translationService.getTranslation(
            'api.auth.login.error.invalidCredentials',
            lang,
          ),
          error: error.message,
        },
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  @Post('signup')
  async signup(
    @Body() createUserDto: CreateUserDto,
  ): Promise<ApiResponse<{ access_token: string }>> {
    try {
      const token = await this.authService.signup(createUserDto);
      return {
        statusCode: HttpStatus.CREATED,
        success: true,
        message: 'User registered successfully',
        data: token,
      };
    } catch (error) {
      throw new HttpException(
        {
          statusCode: HttpStatus.BAD_REQUEST,
          success: false,
          message: error.message || 'Error registering user',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Patch('password')
  @UseGuards(AuthGuard('jwt'))
  async updatePassword(
    @Request() req: any,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ): Promise<ApiResponse<void>> {
    const userId = req.user.userId;
    try {
      await this.authService.updatePassword(userId, updatePasswordDto);
      return {
        statusCode: HttpStatus.OK,
        success: true,
        message: 'Password updated successfully',
      };
    } catch (error) {
      throw new HttpException(
        {
          statusCode: HttpStatus.BAD_REQUEST,
          success: false,
          message: 'Error updating password',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
