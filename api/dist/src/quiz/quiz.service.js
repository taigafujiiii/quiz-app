"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuizService = void 0;
const common_1 = require("@nestjs/common");
const crypto_1 = require("crypto");
const prisma_service_1 = require("../prisma/prisma.service");
const shuffle_1 = require("../utils/shuffle");
let QuizService = class QuizService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async assertUnitAccess(user, unitId) {
        if (user.role === 'admin')
            return;
        const allowed = await this.prisma.userAllowedUnit.findFirst({
            where: {
                userId: BigInt(user.id),
                unitId: BigInt(unitId),
            },
        });
        if (!allowed)
            throw new common_1.BadRequestException('Unit not allowed');
    }
    async freeQuiz(user, dto) {
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
        if (categories.length === 0)
            throw new common_1.NotFoundException('Categories not found');
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
        const picked = (0, shuffle_1.shuffle)(questions).slice(0, dto.count);
        return {
            quizId: (0, crypto_1.randomUUID)(),
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
    async assignmentQuiz(user, dto) {
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
        if (!category)
            throw new common_1.NotFoundException('Category not found');
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
            quizId: (0, crypto_1.randomUUID)(),
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
};
exports.QuizService = QuizService;
exports.QuizService = QuizService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], QuizService);
//# sourceMappingURL=quiz.service.js.map