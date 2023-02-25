import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SenderController } from './sender.controller';
import { Sender } from './sender.entity';
import { SenderService } from './sender.service';

@Module({
  imports:[TypeOrmModule.forFeature([Sender])],
  controllers: [SenderController],
  providers: [SenderService]
})
export class SenderModule {}
