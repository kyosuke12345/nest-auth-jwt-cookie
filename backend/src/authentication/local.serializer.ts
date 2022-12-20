import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import User from 'src/database/entities/user.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class LocalSerializer extends PassportSerializer {
  constructor(private readonly usersService: UsersService) {
    super();
  }

  serializeUser(user: User, done: CallableFunction) {
    console.log('localSerializer seralizeUser:', user);
    done(null, user.id);
  }

  async deserializeUser(userId: string, done: CallableFunction) {
    console.log('localSerializer deserializeUser:', userId);
    const user = this.usersService.getById(Number(userId));
    done(null, user);
  }
}
