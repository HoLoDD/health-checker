import { Module } from '@nestjs/common';
import { TelegrafUpdate } from './telegraf.update';
import { TelegrafService } from './telegraf.service';
import { WebServicesModule } from 'src/webservices/webservice.module';
import { UsersModule } from 'src/users/users.module';
import { NotifyModule } from 'src/notify/notify.module';

@Module({
  imports: [WebServicesModule, UsersModule, NotifyModule],
  exports: [TelegrafService],
  providers: [TelegrafUpdate, TelegrafService],
})
export class TelegrafModule {}
