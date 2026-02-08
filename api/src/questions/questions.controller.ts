import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseBoolPipe,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { serializeBigInt } from '../common/serializers/bigint.serializer';

@Controller('questions')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('admin')
export class QuestionsController {
  constructor(private readonly questions: QuestionsService) {}

  @Get()
  async list(
    @Query('unitId') unitId?: string,
    @Query('categoryId') categoryId?: string,
    @Query('isActive') isActive?: string,
  ) {
    const data = await this.questions.list({
      unitId: unitId ? Number(unitId) : undefined,
      categoryId: categoryId ? Number(categoryId) : undefined,
      isActive:
        isActive !== undefined ? isActive.toLowerCase() === 'true' : undefined,
    });
    return serializeBigInt(data);
  }

  @Post()
  async create(@Body() dto: CreateQuestionDto) {
    return serializeBigInt(await this.questions.create(dto));
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateQuestionDto,
  ) {
    return serializeBigInt(await this.questions.update(BigInt(id), dto));
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return serializeBigInt(await this.questions.remove(BigInt(id)));
  }
}
