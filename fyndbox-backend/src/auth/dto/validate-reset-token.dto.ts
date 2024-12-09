import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class ValidateResetTokenDto {
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  resetToken: string;
}
