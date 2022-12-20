import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LoginWithCredentialsGuard extends AuthGuard('local') {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    console.log('LoginWithCredentialsGuard start');
    // check email password
    console.log('LoginWithCredentialsGuard 1');
    await super.canActivate(context);

    // initailize session
    console.log('LoginWithCredentialsGuard 2');
    const request = context.switchToHttp().getRequest();
    await super.logIn(request);

    // if no exceptions were thrown, allow the access to the route
    console.log('LoginWithCredentialsGuard end');
    return true;
  }
}
