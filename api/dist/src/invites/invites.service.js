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
exports.InvitesService = void 0;
const common_1 = require("@nestjs/common");
const crypto_1 = require("crypto");
const date_1 = require("../utils/date");
const prisma_service_1 = require("../prisma/prisma.service");
const client_1 = require("@prisma/client");
const bcryptjs_1 = require("bcryptjs");
const bigint_serializer_1 = require("../common/serializers/bigint.serializer");
let InvitesService = class InvitesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto) {
        const token = (0, crypto_1.randomUUID)();
        const expiresAt = (0, date_1.addDays)(new Date(), 7);
        const invite = await this.prisma.invite.create({
            data: {
                email: dto.email,
                role: dto.role,
                token,
                allowedUnitIds: dto.allowedUnitIds ?? client_1.Prisma.JsonNull,
                expiresAt,
            },
        });
        return (0, bigint_serializer_1.serializeBigInt)({ inviteId: invite.id, token });
    }
    async verify(token) {
        const invite = await this.prisma.invite.findUnique({ where: { token } });
        if (!invite)
            throw new common_1.NotFoundException('Invite not found');
        if (invite.usedAt)
            throw new common_1.BadRequestException('Invite already used');
        if (invite.expiresAt < new Date())
            throw new common_1.BadRequestException('Invite expired');
        return (0, bigint_serializer_1.serializeBigInt)({
            email: invite.email,
            role: invite.role,
            allowedUnitIds: invite.allowedUnitIds ?? [],
        });
    }
    async accept(dto) {
        if (dto.password !== dto.passwordConfirm) {
            throw new common_1.BadRequestException('Password mismatch');
        }
        const invite = await this.prisma.invite.findUnique({
            where: { token: dto.token },
        });
        if (!invite)
            throw new common_1.NotFoundException('Invite not found');
        if (invite.usedAt)
            throw new common_1.BadRequestException('Invite already used');
        if (invite.expiresAt < new Date())
            throw new common_1.BadRequestException('Invite expired');
        const passwordHash = await (0, bcryptjs_1.hash)(dto.password, 10);
        const allowedUnitIds = (invite.allowedUnitIds ?? []);
        const user = await this.prisma.$transaction(async (tx) => {
            const created = await tx.user.create({
                data: {
                    email: invite.email,
                    username: dto.username,
                    passwordHash,
                    role: invite.role,
                },
            });
            if (invite.role === 'user' && allowedUnitIds.length > 0) {
                const existingUnits = await tx.unit.findMany({
                    where: {
                        id: { in: allowedUnitIds.map((id) => BigInt(id)) },
                    },
                    select: { id: true },
                });
                const validUnitIds = existingUnits.map((u) => u.id);
                if (validUnitIds.length === 0)
                    return created;
                await tx.userAllowedUnit.createMany({
                    data: validUnitIds.map((unitId) => ({
                        userId: created.id,
                        unitId,
                    })),
                    skipDuplicates: true,
                });
            }
            await tx.invite.update({
                where: { id: invite.id },
                data: { usedAt: new Date() },
            });
            return created;
        });
        return (0, bigint_serializer_1.serializeBigInt)({ userId: user.id });
    }
};
exports.InvitesService = InvitesService;
exports.InvitesService = InvitesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], InvitesService);
//# sourceMappingURL=invites.service.js.map