import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolsController } from './rols.controller';
import { Rols } from './rols.entity';
import { RolsService } from './rols.service';

@Module({
  imports:[TypeOrmModule.forFeature([Rols])],
  controllers: [RolsController],
  providers: [RolsService]
})
export class RolsModule {}
