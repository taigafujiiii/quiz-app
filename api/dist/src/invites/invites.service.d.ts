import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { CreateInviteDto } from './dto/create-invite.dto';
import { AcceptInviteDto } from './dto/accept-invite.dto';
export declare class InvitesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateInviteDto): Promise<{
        inviteId: bigint;
        token: `${string}-${string}-${string}-${string}-${string}`;
    }>;
    verify(token: string): Promise<{
        email: string;
        role: import("@prisma/client").$Enums.UserRole;
        allowedUnitIds: string | number | boolean | Prisma.JsonObject | Prisma.JsonArray;
    }>;
    accept(dto: AcceptInviteDto): Promise<{
        userId: bigint;
    }>;
}
