import { ArrayMinSize, IsArray, IsIn, IsInt } from 'class-validator';

export class FreeQuizDto {
  @IsInt()
  unitId!: number;

  @IsArray()
  @ArrayMinSize(1)
  categoryIds!: number[];

  @IsIn([10, 20, 30, 40, 50])
  count!: number;
}
