import { IsInt } from 'class-validator';

export class CreateAssignmentDto {
  @IsInt()
  categoryId!: number;

  @IsInt()
  questionId!: number;
}
