import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class ResetPasswordDto {
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsNotEmpty()
  readonly resetToken: string;

  @IsNotEmpty()
  @Length(8, 20)
  readonly newPassword: string;
}
