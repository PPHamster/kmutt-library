import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

type MailOptions = {
  to: string;
  subject: string;
  text: string;
  attachments?: {
    filename: string;
    path: string;
  }[];
};

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;

  public constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  public async sendEmail(mailOptions: MailOptions) {
    await this.transporter.sendMail({
      ...mailOptions,
      from: `KMUTT Library <${process.env.EMAIL_USERNAME}>`,
    });
  }
}
