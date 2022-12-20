import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Redirect,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBody, ApiCookieAuth, ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import User from 'src/database/entities/user.entity';
import { AuthenticationService } from './authentication.service';
import { RegisterDto } from './class/authentication.dto';
import RequestWithUser from './class/authentication.interface';
import { CookieAuthenticationGuard } from './cookieAuthentication.guard';
import { JwtAuthGuard } from './jwtAuthGuard';
import { LoginWithCredentialsGuard } from './logInWithCredentialsGuard';

class LoginDto {
  @ApiProperty()
  email: string;
  @ApiProperty()
  password: string;
}

@ApiTags('認証')
@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authenticatoinService: AuthenticationService) {}

  @HttpCode(200)
  @UseGuards(CookieAuthenticationGuard)
  @Post('log-out')
  async logOut(@Req() request: RequestWithUser) {
    request.logOut();
    request.session.cookie.maxAge = 0;
  }

  @ApiOperation({
    description: 'Userの登録処理',
  })
  @Post('register')
  async register(@Body() body: RegisterDto) {
    return this.authenticatoinService.register(body);
  }

  @ApiOperation({
    description: 'Userのログイン処理',
  })
  @ApiBody({
    type: LoginDto,
  })
  @HttpCode(200)
  @UseGuards(LoginWithCredentialsGuard)
  @Post('login')
  async login(@Req() request: RequestWithUser, @Res({passthrough: true}) res: Response) {
    const token = await this.authenticatoinService.login(request.user);
    const secretData = {
      token
    }
    res.cookie('auth-cookie', secretData, { httpOnly: true });
    return {statusCode: 200};
  }

  @ApiCookieAuth('auth-cookie')
  @ApiOperation({ description: 'ユーザ情報取得' })
  @UseGuards(JwtAuthGuard)
  @Get()
  async authenticate(@Req() request: RequestWithUser) {
    return request.user;
  }

  @ApiOperation({
    description: 'googleのログイン処理',
  })
  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req: Request) {
    console.log('aaa')
  }

  @Get('google/redirect')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req: Request, @Res({passthrough: true}) res: Response) {
    // この時点でreq.userに上のほうで定義したvalidateで抜き出した認証情報が入っている(名前、メールアドレス、画像など)
    // 具体的な処理はserviceにやらせる
    const user = req?.user as any;
    console.log(user)
    const token = await this.authenticatoinService.login(req?.user as User);
    const secretData = {
      token
    }
    res.cookie('auth-cookie', secretData, { httpOnly: true });
    res.redirect('/swagger');
  }  
}
