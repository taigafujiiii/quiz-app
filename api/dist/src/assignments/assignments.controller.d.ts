import { AssignmentsService } from './assignments.service';
import { CreateAssignmentDto } from './dto/create-assignment.dto';
export declare class AssignmentsController {
    private readonly assignments;
    constructor(assignments: AssignmentsService);
    categories(unitId?: string): Promise<{
        id: bigint;
        name: string;
    }[]>;
    list(categoryId?: string): Promise<{
        id: bigint;
        createdAt: Date;
        updatedAt: Date;
        categoryId: bigint;
        questionId: bigint;
    }[]>;
    create(dto: CreateAssignmentDto): Promise<{
        id: bigint;
        createdAt: Date;
        updatedAt: Date;
        categoryId: bigint;
        questionId: bigint;
    }>;
    remove(id: number): Promise<{
        id: bigint;
        createdAt: Date;
        updatedAt: Date;
        categoryId: bigint;
        questionId: bigint;
    }>;
}
