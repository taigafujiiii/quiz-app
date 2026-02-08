import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { PrismaService } from '../prisma/prisma.service';
import { FreeQuizDto } from './dto/free-quiz.dto';
import { AssignmentQuizDto } from './dto/assignment-quiz.dto';
import { shuffle } from '../utils/shuffle';

type CurrentUser = { id: string; role: string };

@Injectable()
export class QuizService {
  constructor(private readonly prisma: PrismaService) {}

  private async assertUnitAccess(user: CurrentUser, unitId: number) {
    if (user.role === 'admin') return;
    const allowed = await this.prisma.userAllowedUnit.findFirst({
      where: {
        userId: BigInt(user.id),
        unitId: BigInt(unitId),
      },
    });
    if (!allowed) throw new BadRequestException('Unit not allowed');
  }

  async freeQuiz(user: CurrentUser, dto: FreeQuizDto) {
    await this.assertUnitAccess(user, dto.unitId);

    const categories = await this.prisma.category.findMany({
      where: {
        id: { in: dto.categoryIds.map((id) => BigInt(id)) },
        unitId: BigInt(dto.unitId),
        deletedAt: null,
        isActive: true,
      },
      select: { id: true },
    });
    if (categories.length === 0) throw new NotFoundException('Categories not found');

    const questions = await this.prisma.question.findMany({
      where: {
        categoryId: { in: categories.map((c) => c.id) },
        isActive: true,
        deletedAt: null,
      },
      select: {
        id: true,
        text: true,
        choiceA: true,
        choiceB: true,
        choiceC: true,
        choiceD: true,
      },
    });

    const picked = shuffle(questions).slice(0, dto.count);
    return {
      quizId: randomUUID(),
      questions: picked.map((q) => ({
        id: q.id,
        text: q.text,
        choices: {
          A: q.choiceA,
          B: q.choiceB,
          C: q.choiceC,
          D: q.choiceD,
        },
      })),
    };
  }

  async assignmentQuiz(user: CurrentUser, dto: AssignmentQuizDto) {
    await this.assertUnitAccess(user, dto.unitId);

    const category = await this.prisma.category.findFirst({
      where: {
        id: BigInt(dto.categoryId),
        unitId: BigInt(dto.unitId),
        deletedAt: null,
        isActive: true,
      },
      select: { id: true },
    });
    if (!category) throw new NotFoundException('Category not found');

    const assignments = await this.prisma.assignment.findMany({
      where: {
        categoryId: category.id,
        question: { isActive: true, deletedAt: null },
      },
      select: {
        question: {
          select: {
            id: true,
            text: true,
            choiceA: true,
            choiceB: true,
            choiceC: true,
            choiceD: true,
          },
        },
      },
      orderBy: { id: 'asc' },
    });

    const questions = assignments.map((a) => a.question);
    return {
      quizId: randomUUID(),
      questions: questions.map((q) => ({
        id: q.id,
        text: q.text,
        choices: {
          A: q.choiceA,
          B: q.choiceB,
          C: q.choiceC,
          D: q.choiceD,
        },
      })),
    };
  }
}
