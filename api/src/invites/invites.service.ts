import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { randomUUID } from 'crypto';
import { addDays } from '../utils/date';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { CreateInviteDto } from './dto/create-invite.dto';
import { AcceptInviteDto } from './dto/accept-invite.dto';
import { hash } from 'bcryptjs';
import { serializeBigInt } from '../common/serializers/bigint.serializer';

@Injectable()
export class InvitesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateInviteDto) {
    const token = randomUUID();
    const expiresAt = addDays(new Date(), 7);
    const invite = await this.prisma.invite.create({
      data: {
        email: dto.email,
        role: dto.role,
        token,
        allowedUnitIds: dto.allowedUnitIds ?? Prisma.JsonNull,
        expiresAt,
      },
    });
    return serializeBigInt({ inviteId: invite.id, token });
  }

  async verify(token: string) {
    const invite = await this.prisma.invite.findUnique({ where: { token } });
    if (!invite) throw new NotFoundException('Invite not found');
    if (invite.usedAt) throw new BadRequestException('Invite already used');
    if (invite.expiresAt < new Date())
      throw new BadRequestException('Invite expired');
    return serializeBigInt({
      email: invite.email,
      role: invite.role,
      allowedUnitIds: invite.allowedUnitIds ?? [],
    });
  }

  async accept(dto: AcceptInviteDto) {
    if (dto.password !== dto.passwordConfirm) {
      throw new BadRequestException('Password mismatch');
    }

    const invite = await this.prisma.invite.findUnique({
      where: { token: dto.token },
    });
    if (!invite) throw new NotFoundException('Invite not found');
    if (invite.usedAt) throw new BadRequestException('Invite already used');
    if (invite.expiresAt < new Date())
      throw new BadRequestException('Invite expired');

    const passwordHash = await hash(dto.password, 10);
    const allowedUnitIds = (invite.allowedUnitIds ?? []) as number[];

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

        if (validUnitIds.length === 0) return created;
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

    return serializeBigInt({ userId: user.id });
  }
}
