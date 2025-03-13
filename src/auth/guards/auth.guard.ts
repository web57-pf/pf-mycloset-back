// import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
// import { Observable } from 'rxjs';
// import { JwtService } from '@nestjs/jwt';
// import { contanst } from '../jwt.contanst';
// import { Role } from '../roles.enum';

// @Injectable()
// export class AuthenticationGuard implements CanActivate {
//   constructor(private readonly jwtService: JwtService) {}

//   canActivate(
//     context: ExecutionContext,
//   ): boolean | Promise<boolean> | Observable<boolean> {
//     const request = context.switchToHttp().getRequest();
    
//     // Obtener token desde las cookies en lugar del header Authorization
//     const token = request.cookies?.token;
//     if (!token) {
//       throw new UnauthorizedException('No autorizado!');
//     }

//     try {
//       const secret = contanst.secret;
//       const user = this.jwtService.verify(token, { secret });
//       if(user.isAdmin){
//         user.roles = [Role.ADMIN]
//       }else{
//         user.roles = [Role.USER]
//       }
//       request.user = user;
//       return true;
//     } catch (err) {
//       throw new UnauthorizedException('No autorizado!');
//     }
//   }
// }
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { contanst } from '../jwt.contanst';
import { Role } from '../roles.enum';

@Injectable()
export class AuthenticationGuard implements CanActivate {
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
      // Intentamos verificar el token como un JWT normal
      const user = this.jwtService.verify(token, { secret });
      
      // Lógica para roles (puedes adaptarla si tienes más lógica aquí)
      if (user.isAdmin) {
        user.roles = [Role.ADMIN];
      } else {
        user.roles = [Role.USER];
      }
      
      request.user = user;
      return true;
    } catch (err) {
      // Si el token no es válido, puedes incluir más detalles del error
      throw new UnauthorizedException('No autorizado! El token es inválido o ha expirado.');
    }
  }
}
