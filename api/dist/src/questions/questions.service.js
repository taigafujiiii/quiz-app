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
exports.QuestionsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let QuestionsService = class QuestionsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async list(filters) {
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
    async create(dto) {
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
    async update(id, dto) {
        const exists = await this.prisma.question.findUnique({ where: { id } });
        if (!exists || exists.deletedAt)
            throw new common_1.NotFoundException();
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
    async remove(id) {
        const exists = await this.prisma.question.findUnique({ where: { id } });
        if (!exists || exists.deletedAt)
            throw new common_1.NotFoundException();
        return this.prisma.question.update({
            where: { id },
            data: { deletedAt: new Date(), isActive: false },
        });
    }
};
exports.QuestionsService = QuestionsService;
exports.QuestionsService = QuestionsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], QuestionsService);
//# sourceMappingURL=questions.service.js.map