import { IsArray, IsEmail, IsIn, IsOptional } from 'class-validator';

export class CreateInviteDto {
  @IsEmail()
  email!: string;

  @IsIn(['admin', 'user'])
  role!: 'admin' | 'user';

  @IsOptional()
  @IsArray()
  allowedUnitIds?: number[];
}
