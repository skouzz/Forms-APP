import axios from 'axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EmailService {
  constructor(private readonly configService: ConfigService) {}

  async sendResetPasswordEmail(email: string, resetToken: string) {
    const apiKey = this.configService.get<string>('RESEND_API_KEY');
    const fromEmail = this.configService.get<string>('EMAIL_FROM');

    if (!apiKey || !fromEmail) {
      throw new Error('Missing Resend API credentials');
    }

    const resetLink = `http://localhost:4200/reset-password?token=${resetToken}`;

    try {
      const response = await axios.post(
        'https://api.resend.com/emails',
        {
          from: fromEmail,
          to: email,
          subject: 'Reset Your Password',
          html: `<p>Click <a href="${resetLink}">here</a> to reset your password.</p>`,
        },
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
        },
      );

      console.log('Email sent:', response.data);
    } catch (error) {
      console.error('❌ Error sending email:', error.response?.data || error.message);
      throw new Error('Failed to send password reset email');
    }
  }
}
