import { Module } from '@nestjs/common';
import { NotifyModule } from 'src/notify/notify.module';
import { UsersModule } from 'src/users/users.module';
import { WebServicesModule } from 'src/webservices/webservice.module';
import { UrlCheckerController } from './url-checker.controller';
import { UrlCheckerService } from './url-checker.service';

@Module({
  imports: [NotifyModule, WebServicesModule, UsersModule],
  exports: [UrlCheckerService],
  controllers: [UrlCheckerController],
  providers: [UrlCheckerService],
})
export class UrlCheckerModule {}
