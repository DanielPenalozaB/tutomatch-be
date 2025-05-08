import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Resend } from 'resend';
import { passwordResetEmail } from './templates/password-reset.template';

@Injectable()
export class ResendService {
  private resend: Resend;

  constructor(private configService: ConfigService) {
    this.resend = new Resend(this.configService.get('RESEND_API_KEY'));
  }

  async sendPasswordResetEmail(name: string, email: string, token: string): Promise<void> {
    const resetLink = `${this.configService.get('FRONTEND_URL')}/auth/reset-password/${token}`;
    const emailContent = passwordResetEmail(name, resetLink);

    try {
      await this.resend.emails.send({
        from: 'TutoMatch <onboarding@danielpenalozab.com>',
        to: email,
        subject: emailContent.subject,
        html: emailContent.html,
        text: emailContent.text
      });
    } catch (error) {
      console.error('Failed to send email via Resend:', error);
      throw new Error('Failed to send email');
    }
  }
}