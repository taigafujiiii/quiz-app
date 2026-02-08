import { IsBoolean, IsIn, IsInt, IsString } from 'class-validator';

export class CreateQuestionDto {
  @IsInt()
  categoryId!: number;

  @IsString()
  text!: string;

  @IsString()
  choiceA!: string;

  @IsString()
  choiceB!: string;

  @IsString()
  choiceC!: string;

  @IsString()
  choiceD!: string;

  @IsIn(['A', 'B', 'C', 'D'])
  answer!: 'A' | 'B' | 'C' | 'D';

  @IsString()
  explanation!: string;

  @IsBoolean()
  isPublic!: boolean;

  @IsBoolean()
  isActive!: boolean;
}
