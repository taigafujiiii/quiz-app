import { IsInt } from 'class-validator';

export class AssignmentQuizDto {
  @IsInt()
  unitId!: number;

  @IsInt()
  categoryId!: number;
}
