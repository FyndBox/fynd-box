import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsBoolean,
  Length,
  IsUUID,
} from 'class-validator';

export class CreateBoxDto {
  @IsNotEmpty()
  @Length(3, 100)
  @IsString()
  readonly name: string;

  @IsOptional()
  @Length(0, 255)
  @IsString()
  readonly description?: string;

  @IsOptional()
  @IsString()
  readonly image?: string;

  @IsBoolean()
  @IsOptional()
  readonly isFavorite?: boolean;

  @IsNotEmpty()
  @IsUUID()
  readonly storageId: string;
}
