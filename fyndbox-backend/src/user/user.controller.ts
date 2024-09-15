import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Request,
  Body,
  Param,
  HttpException,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { instanceToPlain } from 'class-transformer';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { ApiResponse } from '@fyndbox/shared/types/api-response';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async findAll(): Promise<ApiResponse<UserResponseDto[]>> {
    try {
      const users = await this.userService.findAll();
      return {
        statusCode: HttpStatus.OK,
        success: true,
        message: 'Users retrieved successfully',
        data: instanceToPlain(users) as UserResponseDto[],
      };
    } catch (error) {
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          success: false,
          message: 'Error retrieving users',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('me')
  @UseGuards(AuthGuard('jwt'))
  async findOne(@Request() req: any): Promise<ApiResponse<UserResponseDto>> {
    try {
      const userId = req.user.userId;
      const user = await this.userService.findOne(userId);
      if (!user) {
        return {
          statusCode: HttpStatus.NOT_FOUND,
          success: false,
          message: 'User not found',
        };
      }
      return {
        statusCode: HttpStatus.OK,
        success: true,
        message: 'User retrieved successfully',
        data: instanceToPlain(user) as UserResponseDto,
      };
    } catch (error) {
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          success: false,
          message: 'Error retrieving user',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post()
  async create(
    @Body() createUserDto: CreateUserDto,
  ): Promise<ApiResponse<UserResponseDto>> {
    try {
      const newUser = await this.userService.create(createUserDto);
      return {
        statusCode: HttpStatus.CREATED,
        success: true,
        message: 'User created successfully',
        data: instanceToPlain(newUser) as UserResponseDto,
      };
    } catch (error) {
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          success: false,
          message: 'Error creating user',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Put()
  @UseGuards(AuthGuard('jwt'))
  async update(
    @Request() req: any,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<ApiResponse<UserResponseDto>> {
    try {
      const userId = req.user.userId;
      const updatedUser = await this.userService.update(userId, updateUserDto);
      return {
        statusCode: HttpStatus.OK,
        success: true,
        message: 'User updated successfully',
        data: instanceToPlain(updatedUser) as UserResponseDto,
      };
    } catch (error) {
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          success: false,
          message: 'Error updating user',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete()
  @UseGuards(AuthGuard('jwt'))
  async remove(@Request() req: any): Promise<ApiResponse<void>> {
    try {
      const userId = req.user.userId;
      await this.userService.remove(userId);
      return {
        statusCode: HttpStatus.OK,
        success: true,
        message: 'User deleted successfully',
      };
    } catch (error) {
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          success: false,
          message: 'Error deleting user',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
