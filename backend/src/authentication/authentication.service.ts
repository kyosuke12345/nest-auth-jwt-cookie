import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import User from 'src/database/entities/user.entity';
import { RegisterDto } from './class/authentication.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthenticationService {
  constructor(private readonly usersService: UsersService, private jwtService: JwtService) {}

  public async register(body: RegisterDto): Promise<User> {
    const hashPassword = await bcrypt.hash(body.password, 10);
    try {
      return this.usersService.create({
        ...body,
        password: hashPassword,
      });
    } catch (err) {
      throw new BadRequestException();
    }
  }

  public async getAuthenticatedUser(
    email: string,
    planPassword: string,
  ): Promise<User> {
    const user = await this.usersService.getByEmail(email);
    const isPasswordMatching = await bcrypt.compare(
      planPassword,
      user.password,
    );
    if (!isPasswordMatching) {
      throw new BadRequestException('Wrong Password');
    }
    return user;
  }

  public async login(user: User) {
    const payload = { email: user.email, username: user.name };
    return {
      accsess_token: this.jwtService.sign(payload)
    }
  }
}
