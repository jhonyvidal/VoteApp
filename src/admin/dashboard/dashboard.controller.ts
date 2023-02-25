import { Body, Controller, Get, Post } from '@nestjs/common';
import { dashboardService } from './dashboard.service';

@Controller('dashboard')
export class DashboardController {

    constructor(private dashboardService: dashboardService) {}

    @Get()
    getDashboard() {
      return this.dashboardService.getDashboard();
    }

}