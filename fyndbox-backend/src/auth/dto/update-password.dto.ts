import { IsNotEmpty, Length } from 'class-validator';

export class UpdatePasswordDto {
  @IsNotEmpty()
  readonly currentPassword: string;

  @IsNotEmpty()
  @Length(8, 20)
  readonly newPassword: string;
}
