import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TelegrafModule } from 'nestjs-telegraf';
import { UrlCheckerModule } from 'src/url-checker/url-checker.module';
import { UsersModule } from 'src/users/users.module';
import { WebServicesController } from './webservice.controller';
import { Webservice } from './webservice.entity';
import { WebServicesService } from './webservice.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Webservice]),
    TelegrafModule,
    UsersModule,
  ],
  exports: [TypeOrmModule, WebServicesService],
  controllers: [WebServicesController],
  providers: [WebServicesService],
})
export class WebServicesModule {}
