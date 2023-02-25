import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DashboardController } from './dashboard.controller';
import { dashboardService } from './dashboard.service';

@Module({
  controllers: [DashboardController],
  providers: [dashboardService]
})
export class DashboardModule {}