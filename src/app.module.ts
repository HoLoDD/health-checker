import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TelegrafModule as NestjsTelegrafModule } from 'nestjs-telegraf';
import { TelegrafModule as TelegrafModule } from './telegraf/telegraf.module';
import { Webservice } from './webservices/webservice.entity';
import { WebServicesModule } from './webservices/webservice.module';
import { UsersModule } from './users/users.module';
import { User } from './users/user.entity';
import { UrlCheckerModule } from './url-checker/url-checker.module';
import { NotifyModule } from './notify/notify.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    ScheduleModule.forRoot(),
    NestjsTelegrafModule.forRoot({
      token: process.env.TELEGRAM_BOT_TOKEN,
      include: [TelegrafModule],
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number.parseInt(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [Webservice, User],
      synchronize: true,
    }),
    WebServicesModule,
    TelegrafModule,
    UsersModule,
    UrlCheckerModule,
    NotifyModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
