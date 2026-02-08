import { IsString, MaxLength } from 'class-validator';

export class CreateUnitDto {
  @IsString()
  @MaxLength(100)
  name!: string;
}
