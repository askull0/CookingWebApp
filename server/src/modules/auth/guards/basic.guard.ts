import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthDto } from '../dto/auth.dto';
import { AuthService } from '../auth.service';

@Injectable()
export class BasicGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const auth = request.headers['authorization'];
    if (!auth) return false;
    const authDto: AuthDto = this.decodeHeader(auth);
    if (!authDto.login || !authDto.password) return false;

    const user = await this.authService.verifyUser(authDto);
    if (!user) return false;
    request.userId = user.id;
    request.firstName = user.firstName;
    return true;
  }

  private decodeHeader(header: string): AuthDto {
    const b64 = header.split(' ')[1];
    if (!b64) return undefined;
    const decoded = Buffer.from(b64, 'base64').toString().split(':');
    if (decoded.length != 2) return undefined;
    return {
      login: decoded[0],
      password: decoded[1],
    };
  }
}
