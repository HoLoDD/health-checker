import { Module } from '@nestjs/common';
import { Telegraf } from 'telegraf';
import { NotifyController } from './notify.controller';
import { NotifyService } from './notify.service';

@Module({
  imports: [Telegraf],
  exports: [NotifyService],
  controllers: [NotifyController],
  providers: [NotifyService],
})
export class NotifyModule {}
