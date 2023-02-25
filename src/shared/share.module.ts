import { Module } from '@nestjs/common';
import { TypeOrmModule} from '@nestjs/typeorm'
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { ShareService } from './service/shared.service';

@Module({
  imports:[],
  controllers: [],
  providers: [ShareService],
  exports:[ShareService]
})
export class SharedModule {}
