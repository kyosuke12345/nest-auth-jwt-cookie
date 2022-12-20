import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class CookieAuthenticationGuard implements CanActivate {
  async canActivate(context: ExecutionContext) {
    console.log('CookieAuthenticationGuard');
    const request = context.switchToHttp().getRequest();
    const isAuthenticated = request.isAuthenticated() as boolean;
    console.log('CookieAuthenticationGuard Authenticated: ', isAuthenticated);
    return isAuthenticated;
  }
}
