import { IsEmail, IsEnum, IsOptional, IsString, Length, MaxLength, MinLength } from 'class-validator';
import { Role } from 'src/users/enums/role.enum';

export class RegisterDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(256)
  password: string;

  @IsString()
  @Length(2, 50, { message: 'name must be between 2 and 50 characters long' })
  name: string;

  @IsOptional()
  @IsEnum(Role, { message: 'role must be a valid enum value (e.g., `user` or `restaurant_admin` or `super_admin`)' })
  role?: Role
}

export class LoginDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  password: string;
}
