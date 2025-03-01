import { IsEmail, IsEnum, IsNotEmpty, MinLength, ValidateIf } from 'class-validator';

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}

export class CreateUserDto {
  @IsNotEmpty()
  username: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsEnum(UserRole, { message: 'Role must be either admin or user' })
  role: UserRole;

  @ValidateIf((o) => o.role === UserRole.ADMIN)
  @IsNotEmpty({ message: 'Admin code is required for admin registration' })
  adminCode?: string;
}
