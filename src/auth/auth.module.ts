import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { JwtModule,JwtService } from '@nestjs/jwt';
import { contanst } from './jwt.contanst';
import { GoogleStrategy } from './strategies/google.strategy';

@Module({
  imports:[
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: contanst.secret,
      signOptions:{ expiresIn: '1h'}
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, GoogleStrategy],
  exports: [JwtModule]
})
export class AuthModule {}
