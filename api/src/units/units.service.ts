import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUnitDto } from './dto/create-unit.dto';
import { UpdateUnitDto } from './dto/update-unit.dto';

@Injectable()
export class UnitsService {
  constructor(private readonly prisma: PrismaService) {}

  async listAll() {
    return this.prisma.unit.findMany({
      where: { deletedAt: null },
      orderBy: { id: 'asc' },
    });
  }

  async listByAllowedUser(userId: bigint) {
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

  async create(dto: CreateUnitDto) {
    return this.prisma.unit.create({ data: { name: dto.name } });
  }

  async update(id: bigint, dto: UpdateUnitDto) {
    const exists = await this.prisma.unit.findUnique({ where: { id } });
    if (!exists || exists.deletedAt) throw new NotFoundException();
    return this.prisma.unit.update({
      where: { id },
      data: {
        name: dto.name,
        isActive: dto.isActive,
      },
    });
  }

  async remove(id: bigint) {
    const exists = await this.prisma.unit.findUnique({ where: { id } });
    if (!exists || exists.deletedAt) throw new NotFoundException();
    return this.prisma.unit.update({
      where: { id },
      data: { deletedAt: new Date(), isActive: false },
    });
  }
}
