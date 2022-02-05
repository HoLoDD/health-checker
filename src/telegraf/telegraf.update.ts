import { Update, Start, Help, On, Hears, Command, Ctx } from 'nestjs-telegraf';
import { TelegrafService } from './telegraf.service';
import { Context } from '../interfaces/context.interface';

@Update()
export class TelegrafUpdate {
  constructor(private telegramService: TelegrafService) {}

  @Start()
  async startCommand(ctx: Context) {
    await ctx.reply(
      'Welcome to Webservices Healthcheker Bot\n\nComands:\n\tSave id - /reg\n\tRemove id - /remove\n\tView services list - /services',
    );
  }

  @Command('allServices')
  async revicesList() {
    return this.telegramService.viewWebservices();
  }

  @Command('services')
  async revicesListForUser(ctx: Context) {
    return this.telegramService.viewWebservicesForUser(ctx.message.from.id);
  }

  @Command('reg')
  async addNewUser(ctx: Context) {
    return this.telegramService.addUser(ctx.message.from.id);
  }

  @Command('remove')
  async removeUser(ctx: Context) {
    return this.telegramService.removeUser(ctx.message.chat.id);
  }
}
