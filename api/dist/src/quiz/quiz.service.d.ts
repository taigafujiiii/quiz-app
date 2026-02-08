import { PrismaService } from '../prisma/prisma.service';
import { FreeQuizDto } from './dto/free-quiz.dto';
import { AssignmentQuizDto } from './dto/assignment-quiz.dto';
type CurrentUser = {
    id: string;
    role: string;
};
export declare class QuizService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    private assertUnitAccess;
    freeQuiz(user: CurrentUser, dto: FreeQuizDto): Promise<{
        quizId: `${string}-${string}-${string}-${string}-${string}`;
        questions: {
            id: bigint;
            text: string;
            choices: {
                A: string;
                B: string;
                C: string;
                D: string;
            };
        }[];
    }>;
    assignmentQuiz(user: CurrentUser, dto: AssignmentQuizDto): Promise<{
        quizId: `${string}-${string}-${string}-${string}-${string}`;
        questions: {
            id: bigint;
            text: string;
            choices: {
                A: string;
                B: string;
                C: string;
                D: string;
            };
        }[];
    }>;
}
export {};
