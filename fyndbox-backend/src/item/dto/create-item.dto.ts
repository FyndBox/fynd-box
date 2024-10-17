import { IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

export class CreateItemDto {
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

  @IsOptional()
  readonly quantity?: number;
}
