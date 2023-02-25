import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermissionsController } from './permissions.controller';
import { PermissionsService } from './permissions.service';
import { Permisssions } from './permissions.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Permisssions])],
  controllers: [PermissionsController],
  providers: [PermissionsService]
})
export class PermissionsModule {}
