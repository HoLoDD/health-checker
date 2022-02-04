import { Injectable } from '@nestjs/common';
import { InjectBot } from 'nestjs-telegraf';
import { Context } from 'src/interfaces/context.interface';
import { User } from 'src/users/user.entity';
import { Webservice } from 'src/webservices/webservice.entity';
import { Telegraf } from 'telegraf';

@Injectable()
export class NotifyService {
  constructor(@InjectBot() private bot: Telegraf<Context>) {}

  notifyUser(online: boolean, user: User, webService: Webservice) {
    if (online) {
      this.serviceOnlineAlert(user, webService);
    } else {
      this.serviceOfflineAlert(user, webService);
    }
  }

  private serviceOnlineAlert(user: User, webService: Webservice) {
    if (user.telegram_id) {
      this.notifyTelegram(
        user.telegram_id,
        `WebService is ONLINE!
Unavailable 
  from ${webService.unavailableFrom} 
  to ${webService.unavailableTo}
Name: ${webService.name}
URL ${webService.url}`,
      );
    }
    if (user.mail) {
      this.notifyMail(
        user.mail,
        `WebService is ONLINE!
Unavailable 
  from ${webService.unavailableFrom} 
  to ${webService.unavailableTo}
Name: ${webService.name}
URL ${webService.url}`,
      );
    }
  }

  private serviceOfflineAlert(user: User, webService: Webservice) {
    if (user.telegram_id) {
      this.notifyTelegram(
        user.telegram_id,
        `Alert! WebService if OFFLINE (Or latency more then ${webService.latency}ms).
Name: ${webService.name}
URL ${webService.url}`,
      );
    }
    if (user.mail) {
      this.notifyMail(
        user.mail,
        `Alert WebService if OFFLINE (Or latency more then ${webService.latency}ms).
Name: ${webService.name}
URL ${webService.url}`,
      );
    }
  }

  private notifyTelegram(telegram_id: number, msg: string) {
    this.bot.telegram.sendMessage(telegram_id, msg);
  }

  private notifyMail(mail: string, msg: string) {
    /*

    Sending email...
    
    const nodemailer = require('nodemailer');
    const mailGun = require('nodemailer-mailgun-transport');

    const auth = {
    auth: {
        api_key: process.env.API_KEY || 'mailgun_api_key',  
        domain: process.env.DOMAIN || 'mailgun_domain',
    }
    };

    const transporter = nodemailer.createTransport( mailGun(auth) );

    const mailOptions = {
        from: 'sender@gmail.com', // email sender
        to: mail, // email receiver
        subject: 'Health-Checker Status Notification',
        text: msf
    };

    transporter.sendMail(mailOptions, (err, data) => {
        if (err) {
            return log('Error while sending msg: ', err);
        }
        return log('Email sent!');
    });   
        
    */
  }
}
