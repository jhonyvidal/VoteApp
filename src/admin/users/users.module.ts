import { Module } from '@nestjs/common';
import { UsersController } from './controller/users.controller';
import { UsersService } from './services/users.service';
import { TypeOrmModule} from '@nestjs/typeorm'
import { User } from './entity/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtStrategyService } from './services/jwt.strategy.service';
import { SharedModule } from 'src/shared/share.module';

@Module({
  imports:[ JwtModule.registerAsync({
    useFactory:(configService:ConfigService)=>{
      return{
        secret:configService.get('auth.secretKey'),
        signOptions:{expiresIn:'20h'}
      };
    },
    inject:[ConfigService],
  }),
  TypeOrmModule.forFeature([User]),
  SharedModule],
  controllers: [UsersController],
  providers: [UsersService,JwtStrategyService]
})
export class UsersModule {}
