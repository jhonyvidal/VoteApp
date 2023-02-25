import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ModulesController } from './modules.controller';
import { Modules } from './modules.entity';
import { ModulesService } from './modules.service';

@Module({
  imports:[TypeOrmModule.forFeature([Modules])],
  controllers: [ModulesController],
  providers: [ModulesService]
})
export class ModulesModule {}
