import { Module } from '@nestjs/common';
import { NotifyModule } from 'src/notify/notify.module';
import { UsersModule } from 'src/users/users.module';
import { WebServicesModule } from 'src/webservices/webservice.module';
import { UrlCheckerService } from './url-checker.service';

@Module({
  imports: [NotifyModule, WebServicesModule, UsersModule],
  exports: [UrlCheckerService],
  providers: [UrlCheckerService],
})
export class UrlCheckerModule {}
