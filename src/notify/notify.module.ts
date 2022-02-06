import { Module } from '@nestjs/common';
import { Telegraf } from 'telegraf';
import { NotifyService } from './notify.service';

@Module({
  imports: [Telegraf],
  exports: [NotifyService],
  providers: [NotifyService],
})
export class NotifyModule {}
