import { Controller, Get } from '@nestjs/common';
import { ResendService } from './resend.service';

@Controller('resend')
export class ResendController {
  constructor(private readonly resendService: ResendService) {}

  @Get('test')
  async testEmail() {
    try {
      await this.resendService.sendPasswordResetEmail(
        'UNIAJC Test',
        'juandanielpenalozabrito@gmail.com',
        'test-token'
      );
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        stack: error.stack
      };
    }
  }
}
