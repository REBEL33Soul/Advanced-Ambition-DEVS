import nodemailer from 'nodemailer'
import { User } from '@advanced-ambition/core'

export class EmailService {
  private transporter: nodemailer.Transporter

  constructor() {
    this.transporter = nodemailer.createTransport({
      // Configure your email service
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    })
  }

  async sendWelcomeEmail(user: User) {
    await this.transporter.sendMail({
      to: user.email,
      subject: 'Welcome to Advanced Ambition DEVS',
      html: this.getWelcomeTemplate(user)
    })
  }

  async sendSubscriptionRenewal(user: User) {
    await this.transporter.sendMail({
      to: user.email,
      subject: 'Subscription Renewal Notice',
      html: this.getRenewalTemplate(user)
    })
  }

  async sendProductUpdate(users: User[], updateInfo: any) {
    for (const user of users) {
      if (user.preferences.productUpdates) {
        await this.transporter.sendMail({
          to: user.email,
          subject: 'New Product Update Available',
          html: this.getProductUpdateTemplate(updateInfo)
        })
      }
    }
  }

  private getWelcomeTemplate(user: User): string {
    return `
      <h1>Welcome ${user.name}!</h1>
      <p>Thank you for joining Advanced Ambition DEVS...</p>
    `
  }

  private getRenewalTemplate(user: User): string {
    return `
      <h1>Subscription Renewal</h1>
      <p>Your subscription will renew on ${user.subscriptionEndDate}...</p>
    `
  }

  private getProductUpdateTemplate(updateInfo: any): string {
    return `
      <h1>New Update Available</h1>
      <p>${updateInfo.description}</p>
    `
  }
}