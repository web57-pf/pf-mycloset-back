import {
  Controller,
  Get,
  Post,
  Body,
  Res,
  UseGuards,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDTO } from './dto/signup.dto';
import { SigninDTO } from './dto/signin.dto';
import { Request, Response } from 'express';
import { AuthenticationGuard } from './guards/auth.guard';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation } from '@nestjs/swagger';
import { EmailService } from 'src/email/email.service';
import { CreateEmailDto } from 'src/email/dto/create-email.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly emailService: EmailService,
  ) {}

  @ApiOperation({
    summary: 'Registrar usuario',
    description: 'Registrar un nuevo usuario',
  })
  @Post('signup')
  async signup(@Body() data: SignupDTO) {
    return await this.authService.signupServices(data);
    // const emailDto: CreateEmailDto = {
    //   email: data.email,
    //   subject: 'Bienvenido a nuestra plataforma',
    //   html: `<p>Hola ${data.name}, gracias por registrarte. Confirma tu correo electrónico.</p>`,
    //   type: 'confirmation',
    // };

    // await this.emailService.sendEmailWelcome(emailDto); // Pasamos un CreateEmailDto válido
  }

  @ApiOperation({ summary: 'Inciar session', description: 'Iniciar session' })
  @Post('signin')
  async signin(
    @Body() data: SigninDTO,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { token, userWhitOutPassword } =
      await this.authService.signinServices(data);

    res.cookie('token', token, {
      httpOnly: true,
      secure: true,
      // sameSite: 'lax',
      sameSite: 'none',
      maxAge: 1000 * 60 * 60 * 24 * 1,
    });

    res.json({
      message: 'ok',
      user: userWhitOutPassword,
      // token
    });
  }

  @ApiOperation({ summary: 'Validacion de session', description: '...' })
  @Post('session')
  @UseGuards(AuthenticationGuard)
  UserInfo(@Req() req) {
    return req.user;
  }

  @ApiOperation({
    summary: 'autorizacion de google',
    description: 'Proceso de autorizacion de google',
  })
  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {
    console.log('Inicia el proceso de autenticación con Google.');
  }

  @ApiOperation({
    summary: 'Session google',
    description: 'Inicio de session una vez autorizado por google',
  })
  @Get('google/redirect')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(
    @Req() req,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { user, token } = await this.authService.valideteGoogleUser(req.user);

    res.cookie('token', token, {
      httpOnly: true,
      secure: true,
      // sameSite: 'lax',
      sameSite: 'none',
      maxAge: 1000 * 60 * 60 * 24 * 1,
    });

    // res.json({
    //   msg: 'Aqui se debe redireccionar al dashboard o pagina del user autenticado'
    // })
    res.redirect(`${process.env.API_FRONT}/mycloset`);
  }

  @Get('logout')
  @UseGuards(AuthenticationGuard)
  async logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('token', {
      httpOnly: true,
      secure: true,
      // sameSite: 'lax',
      sameSite: 'none',
      path: '/',
    });

    return res.json({ message: 'Sesión cerrada correctamente' });
  }
}
