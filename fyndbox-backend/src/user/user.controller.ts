import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { instanceToPlain } from 'class-transformer';
import { UserService } from './user.service';
import { ApiResponse } from '../interfaces/api-response.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserResponseDto } from './dto/user-response.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
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

  @Get(':id')
  async findOne(
    @Param('id') id: number,
  ): Promise<ApiResponse<UserResponseDto>> {
    try {
      const user = await this.userService.findOne(id);
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

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<ApiResponse<UserResponseDto>> {
    try {
      const updatedUser = await this.userService.update(id, updateUserDto);
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

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<ApiResponse<void>> {
    try {
      await this.userService.remove(id);
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
