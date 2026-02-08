import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(private readonly prisma: PrismaService) {}

  async list(unitId?: number) {
    return this.prisma.category.findMany({
      where: {
        deletedAt: null,
        ...(unitId ? { unitId: BigInt(unitId) } : {}),
      },
      orderBy: { id: 'asc' },
    });
  }

  async create(dto: CreateCategoryDto) {
    return this.prisma.category.create({
      data: {
        unitId: BigInt(dto.unitId),
        name: dto.name,
      },
    });
  }

  async update(id: bigint, dto: UpdateCategoryDto) {
    const exists = await this.prisma.category.findUnique({ where: { id } });
    if (!exists || exists.deletedAt) throw new NotFoundException();
    return this.prisma.category.update({
      where: { id },
      data: {
        name: dto.name,
        unitId: dto.unitId ? BigInt(dto.unitId) : undefined,
        isActive: dto.isActive,
      },
    });
  }

  async remove(id: bigint) {
    const exists = await this.prisma.category.findUnique({ where: { id } });
    if (!exists || exists.deletedAt) throw new NotFoundException();
    return this.prisma.category.update({
      where: { id },
      data: { deletedAt: new Date(), isActive: false },
    });
  }
}
