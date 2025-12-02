import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiExcludeEndpoint, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PublicRoute } from './decorators/public.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @PublicRoute()
  @ApiExcludeEndpoint()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('health')
  @PublicRoute()
  @ApiOperation({ summary: 'Health check endpoint' })
  @ApiResponse({ 
    status: 200, 
    description: 'Server is healthy',
    schema: {
      type: 'object',
      properties: {
        status: { type: 'string', example: 'ok' },
        timestamp: { type: 'string', example: '2025-01-03T13:26:57.000Z' },
        uptime: { type: 'number', example: 123.456 },
        environment: { type: 'string', example: 'production' },
        version: { type: 'string', example: '1.0.0' }
      }
    }
  })
  getHealth(): object {
    return this.appService.getHealth();
  }
}
