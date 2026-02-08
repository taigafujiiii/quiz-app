import { IsInt, IsString, MaxLength } from 'class-validator';

export class CreateCategoryDto {
  @IsInt()
  unitId!: number;

  @IsString()
  @MaxLength(100)
  name!: string;
}
