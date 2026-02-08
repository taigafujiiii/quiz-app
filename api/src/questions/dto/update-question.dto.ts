import { IsBoolean, IsIn, IsInt, IsOptional, IsString } from 'class-validator';

export class UpdateQuestionDto {
  @IsOptional()
  @IsInt()
  categoryId?: number;

  @IsOptional()
  @IsString()
  text?: string;

  @IsOptional()
  @IsString()
  choiceA?: string;

  @IsOptional()
  @IsString()
  choiceB?: string;

  @IsOptional()
  @IsString()
  choiceC?: string;

  @IsOptional()
  @IsString()
  choiceD?: string;

  @IsOptional()
  @IsIn(['A', 'B', 'C', 'D'])
  answer?: 'A' | 'B' | 'C' | 'D';

  @IsOptional()
  @IsString()
  explanation?: string;

  @IsOptional()
  @IsBoolean()
  isPublic?: boolean;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
