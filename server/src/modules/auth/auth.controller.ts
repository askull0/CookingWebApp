import { Controller, Post, Res, UseGuards } from '@nestjs/common';
import { BasicGuard } from './guards/basic.guard';
import { UserID, UserName } from './decorators/userdId.decorator';
import { TokenService } from '../token/token.service';
import { Response } from 'express';

@Controller('api/v1/auth')
export class AuthController {
  constructor(private readonly tokenService: TokenService) {}
  @Post('login')
  @UseGuards(BasicGuard)
  //generowanie tokenu - zwraca void, ale ustawia cookies
  login(
    @UserID() id: number,
    @UserName() firstName: string,
    @Res({ passthrough: true }) resp: Response,
  ) {
    const token = this.tokenService.createToken(id, firstName);
    // ciastko nie dostepne dla JS - zawiera token dostepowy
    // bez expires bedzie trwalo dopoki nie zamnknie sie okna przegladarki
    resp.cookie('access-token', token, {
      httpOnly: true,
      expires: new Date(Date.now() + 2 * 60 * 60 * 1000),
    });
    // nowe ciasteczko przechowujace jedynie inf o tym ze uzytkownik jest zalogowany - dostepny dla JS
    resp.cookie('is-logged', true, {
      expires: new Date(Date.now() + 2 * 60 * 60 * 1000),
    });
  }

  @Post('logout')
  logout(@Res({ passthrough: true }) resp: Response) {
    resp.clearCookie('access-token');
    resp.clearCookie('is-logged');
  }
}
