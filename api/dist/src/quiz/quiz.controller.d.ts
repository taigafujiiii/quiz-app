import { AssignmentQuizDto } from './dto/assignment-quiz.dto';
import { FreeQuizDto } from './dto/free-quiz.dto';
import { QuizService } from './quiz.service';
export declare class QuizController {
    private readonly quiz;
    constructor(quiz: QuizService);
    free(req: any, dto: FreeQuizDto): Promise<{
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
    assignment(req: any, dto: AssignmentQuizDto): Promise<{
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
