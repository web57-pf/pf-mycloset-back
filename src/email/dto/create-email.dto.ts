import {
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateEmailDto {
  @IsEmail({}, { each: true })
  to: string[];

  @IsNotEmpty()
  @IsString()
  subject: string;

  @IsNotEmpty()
  @IsString()
  template: string;

  @IsOptional()
  @IsString()
  html?: string;

  @IsNotEmpty()
  @IsString()
  @IsIn([
    'confirmation',
    'welcome',
    'reset-password',
    'notification',
    'activation',
    'subscription',
    'cancel-subscription',
  ])
  type: string;
}
