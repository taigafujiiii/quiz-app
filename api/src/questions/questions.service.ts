import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';

@Injectable()
export class QuestionsService {
  constructor(private readonly prisma: PrismaService) {}

  async list(filters: {
    unitId?: number;
    categoryId?: number;
    isActive?: boolean;
  }) {
    return this.prisma.question.findMany({
      where: {
        deletedAt: null,
        ...(filters.categoryId ? { categoryId: BigInt(filters.categoryId) } : {}),
        ...(filters.isActive !== undefined ? { isActive: filters.isActive } : {}),
        ...(filters.unitId
          ? { category: { unitId: BigInt(filters.unitId) } }
          : {}),
      },
      orderBy: { id: 'asc' },
    });
  }

  async create(dto: CreateQuestionDto) {
    return this.prisma.question.create({
      data: {
        categoryId: BigInt(dto.categoryId),
        text: dto.text,
        choiceA: dto.choiceA,
        choiceB: dto.choiceB,
        choiceC: dto.choiceC,
        choiceD: dto.choiceD,
        answer: dto.answer,
        explanation: dto.explanation,
        isPublic: dto.isPublic,
        isActive: dto.isActive,
      },
    });
  }

  async update(id: bigint, dto: UpdateQuestionDto) {
    const exists = await this.prisma.question.findUnique({ where: { id } });
    if (!exists || exists.deletedAt) throw new NotFoundException();
    return this.prisma.question.update({
      where: { id },
      data: {
        categoryId: dto.categoryId ? BigInt(dto.categoryId) : undefined,
        text: dto.text,
        choiceA: dto.choiceA,
        choiceB: dto.choiceB,
        choiceC: dto.choiceC,
        choiceD: dto.choiceD,
        answer: dto.answer,
        explanation: dto.explanation,
        isPublic: dto.isPublic,
        isActive: dto.isActive,
      },
    });
  }

  async remove(id: bigint) {
    const exists = await this.prisma.question.findUnique({ where: { id } });
    if (!exists || exists.deletedAt) throw new NotFoundException();
    return this.prisma.question.update({
      where: { id },
      data: { deletedAt: new Date(), isActive: false },
    });
  }
}
