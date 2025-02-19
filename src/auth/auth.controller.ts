import { Controller, Get, Post, Body, Res, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDTO } from './dto/signup.dto';
import { SigninDTO } from './dto/signin.dto';
import { Request, Response } from 'express';
import { AuthGuard } from './guards/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(@Body() data: SignupDTO){
    return await this.authService.signupServices(data)
  }

  @Post('signin')
  async signin(@Body() data: SigninDTO, @Res({ passthrough: true }) res: Response){
    const {token, userWhitOutPassword} = await this.authService.signinServices(data);

    res.cookie('token', token, {
      httpOnly: true, 
      secure: false, 
      sameSite: 'lax',
      maxAge: 1000 * 60 * 60 * 24 * 1, 
    });

    res.json({
      message: 'ok',
      user: userWhitOutPassword
    })
  }
  
  @Get('session')
  @UseGuards(AuthGuard)
  getInfo(@Req() req){
    return req.user
  }

  

}
