import { PrismaService } from '../prisma/prisma.service';
import { CreateAssignmentDto } from './dto/create-assignment.dto';
export declare class AssignmentsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    list(categoryId?: number): Promise<{
        id: bigint;
        categoryId: bigint;
        questionId: bigint;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    create(dto: CreateAssignmentDto): Promise<{
        id: bigint;
        categoryId: bigint;
        questionId: bigint;
        createdAt: Date;
        updatedAt: Date;
    }>;
    remove(id: bigint): Promise<{
        id: bigint;
        categoryId: bigint;
        questionId: bigint;
        createdAt: Date;
        updatedAt: Date;
    }>;
    availableCategories(unitId: number): Promise<{
        id: bigint;
        name: string;
    }[]>;
}
