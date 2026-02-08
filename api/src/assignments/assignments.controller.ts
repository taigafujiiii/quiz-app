import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AssignmentsService } from './assignments.service';
import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { serializeBigInt } from '../common/serializers/bigint.serializer';

@Controller('assignments')
export class AssignmentsController {
  constructor(private readonly assignments: AssignmentsService) {}

  @Get('categories')
  @UseGuards(JwtAuthGuard)
  async categories(@Query('unitId') unitId?: string) {
    if (!unitId) return [];
    const data = await this.assignments.availableCategories(Number(unitId));
    return serializeBigInt(data);
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  async list(@Query('categoryId') categoryId?: string) {
    const data = await this.assignments.list(
      categoryId ? Number(categoryId) : undefined,
    );
    return serializeBigInt(data);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  async create(@Body() dto: CreateAssignmentDto) {
    return serializeBigInt(await this.assignments.create(dto));
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return serializeBigInt(await this.assignments.remove(BigInt(id)));
  }
}
