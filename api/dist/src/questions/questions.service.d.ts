import { PrismaService } from '../prisma/prisma.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
export declare class QuestionsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    list(filters: {
        unitId?: number;
        categoryId?: number;
        isActive?: boolean;
    }): Promise<{
        id: bigint;
        categoryId: bigint;
        text: string;
        choiceA: string;
        choiceB: string;
        choiceC: string;
        choiceD: string;
        answer: import("@prisma/client").$Enums.QuestionAnswer;
        explanation: string;
        isPublic: boolean;
        isActive: boolean;
        deletedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    create(dto: CreateQuestionDto): Promise<{
        id: bigint;
        categoryId: bigint;
        text: string;
        choiceA: string;
        choiceB: string;
        choiceC: string;
        choiceD: string;
        answer: import("@prisma/client").$Enums.QuestionAnswer;
        explanation: string;
        isPublic: boolean;
        isActive: boolean;
        deletedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(id: bigint, dto: UpdateQuestionDto): Promise<{
        id: bigint;
        categoryId: bigint;
        text: string;
        choiceA: string;
        choiceB: string;
        choiceC: string;
        choiceD: string;
        answer: import("@prisma/client").$Enums.QuestionAnswer;
        explanation: string;
        isPublic: boolean;
        isActive: boolean;
        deletedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    remove(id: bigint): Promise<{
        id: bigint;
        categoryId: bigint;
        text: string;
        choiceA: string;
        choiceB: string;
        choiceC: string;
        choiceD: string;
        answer: import("@prisma/client").$Enums.QuestionAnswer;
        explanation: string;
        isPublic: boolean;
        isActive: boolean;
        deletedAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
