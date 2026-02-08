import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAssignmentDto } from './dto/create-assignment.dto';

@Injectable()
export class AssignmentsService {
  constructor(private readonly prisma: PrismaService) {}

  async list(categoryId?: number) {
    return this.prisma.assignment.findMany({
      where: categoryId ? { categoryId: BigInt(categoryId) } : {},
      orderBy: { id: 'asc' },
    });
  }

  async create(dto: CreateAssignmentDto) {
    const question = await this.prisma.question.findUnique({
      where: { id: BigInt(dto.questionId) },
    });
    if (!question) throw new BadRequestException('Question not found');
    if (question.categoryId !== BigInt(dto.categoryId)) {
      throw new BadRequestException('Question category mismatch');
    }
    return this.prisma.assignment.create({
      data: {
        categoryId: BigInt(dto.categoryId),
        questionId: BigInt(dto.questionId),
      },
    });
  }

  async remove(id: bigint) {
    return this.prisma.assignment.delete({ where: { id } });
  }

  async availableCategories(unitId: number) {
    return this.prisma.category.findMany({
      where: {
        unitId: BigInt(unitId),
        deletedAt: null,
        isActive: true,
        assignments: {
          some: {
            question: {
              isActive: true,
              deletedAt: null,
            },
          },
        },
      },
      orderBy: { id: 'asc' },
      select: { id: true, name: true },
    });
  }
}
