export declare class CreateQuestionDto {
    categoryId: number;
    text: string;
    choiceA: string;
    choiceB: string;
    choiceC: string;
    choiceD: string;
    answer: 'A' | 'B' | 'C' | 'D';
    explanation: string;
    isPublic: boolean;
    isActive: boolean;
}
