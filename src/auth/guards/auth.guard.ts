import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { contanst } from '../jwt.contanst';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    
    // Obtener token desde las cookies en lugar del header Authorization
    const token = request.cookies?.token;
    if (!token) {
      throw new UnauthorizedException('No autorizado!');
    }

    try {
      const secret = contanst.secret;
      const user = this.jwtService.verify(token, { secret });

      request.user = user;
      return true;
    } catch (err) {
      throw new UnauthorizedException('No autorizado!');
    }
  }
}
