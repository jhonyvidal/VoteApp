import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { ShareService } from 'src/shared/service/shared.service';

@Injectable()
export class JwtStrategyService extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private shareService: ShareService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('auth.secretKey'),
    });
  }

  /**
   * Validate endPoint
   * @param { clientId }
   * @returns {}
   */
  async validate(payload: any) {
    
    const isValidToken = await this.shareService.decript(
      payload?.scope?.sessionId + this.configService.get('auth.secretKey'),
      payload?.scope?.secret,
    );

    if (!isValidToken) {
      throw new UnauthorizedException();
    }
    return isValidToken;
  }
}
