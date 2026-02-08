import { PrismaService } from '../prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
export declare class CategoriesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    list(unitId?: number): Promise<{
        id: bigint;
        unitId: bigint;
        name: string;
        isActive: boolean;
        deletedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    create(dto: CreateCategoryDto): Promise<{
        id: bigint;
        unitId: bigint;
        name: string;
        isActive: boolean;
        deletedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(id: bigint, dto: UpdateCategoryDto): Promise<{
        id: bigint;
        unitId: bigint;
        name: string;
        isActive: boolean;
        deletedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    remove(id: bigint): Promise<{
        id: bigint;
        unitId: bigint;
        name: string;
        isActive: boolean;
        deletedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
