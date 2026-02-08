import { InvitesService } from './invites.service';
import { CreateInviteDto } from './dto/create-invite.dto';
import { AcceptInviteDto } from './dto/accept-invite.dto';
export declare class InvitesController {
    private readonly invites;
    constructor(invites: InvitesService);
    create(dto: CreateInviteDto): Promise<{
        inviteId: bigint;
        token: `${string}-${string}-${string}-${string}-${string}`;
    }>;
    verify(token: string): Promise<{
        email: string;
        role: import("@prisma/client").$Enums.UserRole;
        allowedUnitIds: string | number | boolean | import("@prisma/client/runtime/library").JsonObject | import("@prisma/client/runtime/library").JsonArray;
    }>;
    accept(dto: AcceptInviteDto): Promise<{
        userId: bigint;
    }>;
}
