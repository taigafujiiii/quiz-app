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
exports.UnitsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let UnitsService = class UnitsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async listAll() {
        return this.prisma.unit.findMany({
            where: { deletedAt: null },
            orderBy: { id: 'asc' },
        });
    }
    async listByAllowedUser(userId) {
        return this.prisma.unit.findMany({
            where: {
                deletedAt: null,
                allowedUsers: {
                    some: {
                        userId,
                    },
                },
            },
            orderBy: { id: 'asc' },
        });
    }
    async create(dto) {
        return this.prisma.unit.create({ data: { name: dto.name } });
    }
    async update(id, dto) {
        const exists = await this.prisma.unit.findUnique({ where: { id } });
        if (!exists || exists.deletedAt)
            throw new common_1.NotFoundException();
        return this.prisma.unit.update({
            where: { id },
            data: {
                name: dto.name,
                isActive: dto.isActive,
            },
        });
    }
    async remove(id) {
        const exists = await this.prisma.unit.findUnique({ where: { id } });
        if (!exists || exists.deletedAt)
            throw new common_1.NotFoundException();
        return this.prisma.unit.update({
            where: { id },
            data: { deletedAt: new Date(), isActive: false },
        });
    }
};
exports.UnitsService = UnitsService;
exports.UnitsService = UnitsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UnitsService);
//# sourceMappingURL=units.service.js.map