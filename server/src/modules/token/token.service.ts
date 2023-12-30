import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TokenService {
  constructor(private readonly jwtService: JwtService) {}

  createToken(userId: number, name: string): string {
    return this.jwtService.sign(
      { sub: userId, name: Buffer.from(name).toString('base64') },
      { expiresIn: '2h' },
    );
  }

  verifyToken(token: string): { sub: number } {
    return this.jwtService.verify(token);
  }
}
