// auth/auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { AccountsService } from 'src/modules/accounts/accounts.service';

@Injectable()
export class AuthService {
  constructor(
    private accountsService: AccountsService,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.accountsService.findByEmail(email);
    if (user && await bcrypt.compare(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    // if (user && user.password === password) {
    //   const { password, ...result } = user;
    //   return result;
    // }
    throw new UnauthorizedException("Email hoặc mật khẩu không đúng");
  }

  async login(user: any) {
    const payload = { sub: user.accountId, email: user.email };
    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }
}
