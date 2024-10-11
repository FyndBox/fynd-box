import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Request,
  Body,
  HttpException,
  HttpStatus,
  UseGuards,
  Param,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { instanceToPlain } from 'class-transformer';
import { AuthGuard } from '@nestjs/passport';
import { BoxService } from './box.service';
import { CreateBoxDto } from './dto/create-box.dto';
import { UpdateBoxDto } from './dto/update-box.dto';
import { BoxResponseDto } from './dto/box-response.dto';
import { ApiResponse } from '@fyndbox/shared/types/api-response';
import { TranslationService } from 'src/translation/translation.service';

@Controller('boxes')
@UseGuards(AuthGuard('jwt'))
export class BoxController {
  constructor(
    private readonly boxService: BoxService,
    private readonly translationService: TranslationService,
  ) {}

  @Get(':storageId')
  async findAll(
    @Param('storageId') storageId: string,
    @Request() req: any,
  ): Promise<ApiResponse<BoxResponseDto[]>> {
    const lang = req.language;
    try {
      const boxes = await this.boxService.findAll(storageId);
      return {
        statusCode: HttpStatus.OK,
        success: true,
        message: this.translationService.getTranslation(
          'api.boxes.getAll.success',
          lang,
        ),
        data: instanceToPlain(boxes) as BoxResponseDto[],
      };
    } catch (error) {
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          success: false,
          message: this.translationService.getTranslation(
            'api.boxes.getAll.error',
            lang,
          ),
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':storageId/:id')
  async findOne(
    @Param('storageId') storageId: string,
    @Param('id') id: string,
    @Request() req: any,
  ): Promise<ApiResponse<BoxResponseDto>> {
    const lang = req.language;
    try {
      // Passing both id and storageId to the service
      const box = await this.boxService.findOne(id, storageId);
      return {
        statusCode: HttpStatus.OK,
        success: true,
        message: this.translationService.getTranslation(
          'api.boxes.get.success',
          lang,
        ),
        data: instanceToPlain(box) as BoxResponseDto,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        return {
          statusCode: HttpStatus.NOT_FOUND,
          success: false,
          message: this.translationService.getTranslation(
            'api.boxes.get.notFound',
            lang,
          ),
          error: error.message,
        };
      }
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          success: false,
          message: this.translationService.getTranslation(
            'api.boxes.get.error',
            lang,
          ),
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post()
  async create(
    @Body() createBoxDto: CreateBoxDto,
    @Request() req: any,
  ): Promise<ApiResponse<BoxResponseDto>> {
    const lang = req.language;
    try {
      const newBox = await this.boxService.create(
        createBoxDto,
        createBoxDto.storageId,
        req.user.userId,
      );
      return {
        statusCode: HttpStatus.CREATED,
        success: true,
        message: this.translationService.getTranslation(
          'api.boxes.create.success',
          lang,
        ),
        data: instanceToPlain(newBox) as BoxResponseDto,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        return {
          statusCode: HttpStatus.NOT_FOUND,
          success: false,
          message: this.translationService.getTranslation(
            'api.storages.get.notFound',
            lang,
          ),
          error: error.message,
        };
      }
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          success: false,
          message: this.translationService.getTranslation(
            'api.boxes.create.error',
            lang,
          ),
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateBoxDto: UpdateBoxDto,
    @Request() req: any,
  ): Promise<ApiResponse<BoxResponseDto>> {
    const lang = req.language;
    try {
      if (!updateBoxDto.storageId) {
        throw new BadRequestException(
          this.translationService.getTranslation(
            'api.boxes.storageIDRequired',
            lang,
          ),
        );
      }
      const updatedBox = await this.boxService.update(
        id,
        updateBoxDto,
        updateBoxDto.storageId ?? '',
      );
      return {
        statusCode: HttpStatus.OK,
        success: true,
        message: this.translationService.getTranslation(
          'api.boxes.update.success',
          lang,
        ),
        data: instanceToPlain(updatedBox) as BoxResponseDto,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        return {
          statusCode: HttpStatus.NOT_FOUND,
          success: false,
          message: this.translationService.getTranslation(
            'api.boxes.get.notFound',
            lang,
          ),
          error: error.message,
        };
      }
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          success: false,
          message: this.translationService.getTranslation(
            'api.boxes.update.error',
            lang,
          ),
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete(':id/:storageId')
  async remove(
    @Param('id') id: string,
    @Param('storageId') storageId: string,
    @Request() req: any,
  ): Promise<ApiResponse<void>> {
    const lang = req.language;
    try {
      await this.boxService.remove(id, storageId);
      return {
        statusCode: HttpStatus.OK,
        success: true,
        message: this.translationService.getTranslation(
          'api.boxes.delete.success',
          lang,
        ),
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        return {
          statusCode: HttpStatus.NOT_FOUND,
          success: false,
          message: this.translationService.getTranslation(
            'api.boxes.get.notFound',
            lang,
          ),
          error: error.message,
        };
      }
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          success: false,
          message: this.translationService.getTranslation(
            'api.boxes.delete.error',
            lang,
          ),
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
