import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common';
import { subsType } from '../../users/enum/suscriptionType';

@Injectable()
export class SubscriptionGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (user.subscription === subsType.free) {
      throw new ForbiddenException('Free users cannot create combinations.');
    }

    return true; // Allow access for Premium or Pro users
  }
}
