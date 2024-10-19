import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('set')
  async setValue(@Body('key') key: string, @Body('value') value: string) {
    await this.appService.setValue(key, value);
    return `Key ${key} set with value ${value}`;
  }

  @Get('get/:key')
  async getValue(@Param('key') key: string) {
    const value = await this.appService.getValue(key);
    return value ? `Value for key ${key} is ${value}` : `Key ${key} not found`;
  }
}
