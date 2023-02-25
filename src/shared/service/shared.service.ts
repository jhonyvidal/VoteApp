import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { hashSync, compareSync } from 'bcrypt';
import { promisify } from 'util';

@Injectable()
export class ShareService {
  constructor(private configService: ConfigService) {}

  randomString: string = '';

  async encript(text: string) {
    const hash = hashSync(text, 10);
    return hash;
  }

  async decript(text: string, hash: string) {
    const compare = compareSync(text, hash);
    return compare;
  }

  async client(isActive = false, UserEmail = '') {
    const sessionId = this.RandomString(10);
    const secret = await this.encriptSecret();
    return {
      isActive,
      UserEmail,
      sessionId,
      secret,
    };
  }

  RandomString(length) {
    let result = '';
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    this.randomString = result;
    return result;
  }

  async encriptSecret() {
    return await this.encript(
      this.randomString + this.configService.get('auth.secretKey'),
    );
  }
}
