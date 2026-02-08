export declare class CreateInviteDto {
    email: string;
    role: 'admin' | 'user';
    allowedUnitIds?: number[];
}
