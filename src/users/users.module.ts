import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { JwtModule } from '@nestjs/jwt';
import { contanst } from 'src/auth/jwt.contanst';

@Module({
  imports:[
    JwtModule.register({
        secret: contanst.secret,
        signOptions:{ expiresIn: '1h'}
    })
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
