import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcryptjs';
import { PrismaService } from '../prisma/prisma.service';
import { serializeBigInt } from '../common/serializers/bigint.serializer';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.prisma.user.findFirst({
      where: { email, isActive: true },
    });
    if (!user) return null;
    const ok = await compare(password, user.passwordHash);
    if (!ok) return null;
    return user;
  }

  async login(email: string, password: string) {
    const user = await this.validateUser(email, password);
    if (!user) throw new UnauthorizedException('Invalid credentials');
    const payload = { sub: user.id.toString(), role: user.role };
    const token = await this.jwt.signAsync(payload);
    const safeUser = serializeBigInt({
      id: user.id,
      email: user.email,
      username: user.username,
      role: user.role,
    });
    return { token, user: safeUser };
  }
}
