import { Controller, Get, Query } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';

@Controller('analytics')
export class AnalyticsController {
  constructor(private analyticsService: AnalyticsService) {}

  @Get('dashboard')
  getDashboardStats() {
    return this.analyticsService.getDashboardStats();
  }

  @Get('member-growth')
  getMemberGrowth(@Query('days') days: string) {
    return this.analyticsService.getMemberGrowthData(parseInt(days) || 7);
  }

  @Get('event-attendance')
  getEventAttendance() {
    return this.analyticsService.getEventAttendanceData();
  }

  @Get('membership-stats')
  getMembershipStats() {
    return this.analyticsService.getMembershipStats();
  }

  @Get('recent-activity')
  getRecentActivity(@Query('limit') limit: string) {
    return this.analyticsService.getRecentActivity(parseInt(limit) || 10);
  }
}
