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
exports.AssignmentsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let AssignmentsService = class AssignmentsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async list(categoryId) {
        return this.prisma.assignment.findMany({
            where: categoryId ? { categoryId: BigInt(categoryId) } : {},
            orderBy: { id: 'asc' },
        });
    }
    async create(dto) {
        const question = await this.prisma.question.findUnique({
            where: { id: BigInt(dto.questionId) },
        });
        if (!question)
            throw new common_1.BadRequestException('Question not found');
        if (question.categoryId !== BigInt(dto.categoryId)) {
            throw new common_1.BadRequestException('Question category mismatch');
        }
        return this.prisma.assignment.create({
            data: {
                categoryId: BigInt(dto.categoryId),
                questionId: BigInt(dto.questionId),
            },
        });
    }
    async remove(id) {
        return this.prisma.assignment.delete({ where: { id } });
    }
    async availableCategories(unitId) {
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
};
exports.AssignmentsService = AssignmentsService;
exports.AssignmentsService = AssignmentsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AssignmentsService);
//# sourceMappingURL=assignments.service.js.map