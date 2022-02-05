import { Injectable } from '@nestjs/common';
import { NotifyService } from 'src/notify/notify.service';
import { Cron, CronExpression } from '@nestjs/schedule';
import { WebServicesService } from 'src/webservices/webservice.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class UrlCheckerService {
  private axios = require('axios');
  constructor(
    private notifyService: NotifyService,
    private webServicesService: WebServicesService,
    private userService: UsersService,
  ) {}

  @Cron(CronExpression.EVERY_5_MINUTES)
  async statusChecker() {
    const servicesList = await this.webServicesService.getUsersForWebservice();
    console.log();

    servicesList.forEach((service) => {
      this.checkUrlStatus(service.url, service.latency).then((status) => {
        if (!status) {
          if (service.isAvailable) {
            if (service.users) {
              service.users.forEach((user) => {
                service.isAvailable = false;
                const today = new Date();
                service.unavailableFrom = today
                  .toDateString()
                  .concat(...[' ', today.toTimeString().split('(')[0]]);

                service.unavailableTo = null;

                this.webServicesService.editWebService(
                  service.id,
                  service.name,
                  service.url,
                  service.latency,
                  service.isAvailable,
                  service.unavailableFrom,
                  service.unavailableTo,
                );

                this.notifyService.notifyUser(false, user, service);
              });
            }
          }
        } else {
          if (!service.isAvailable) {
            if (service.users) {
              service.users.forEach((user) => {
                service.isAvailable = true;
                const today = new Date();
                service.unavailableTo = today
                  .toDateString()
                  .concat(...[' ', today.toTimeString().split('(')[0]]);

                this.webServicesService.editWebService(
                  service.id,
                  service.name,
                  service.url,
                  service.latency,
                  service.isAvailable,
                  service.unavailableFrom,
                  service.unavailableTo,
                );
                this.notifyService.notifyUser(true, user, service);
              });
            }
          }
        }
      });
    });
  }

  async checkUrlStatus(url: string, latency: number) {
    const reqStart = new Date().getTime();
    const response = await this.axios.get(url);
    const reqEnd = new Date().getTime();
    const reqDuration = reqEnd - reqStart;
    const reqStatus = response.status;

    console.log(url, reqStatus, reqDuration);

    if (reqStatus >= 500 || reqDuration >= latency) {
      return null;
    } else {
      return 'ONLINE';
    }
  }
}
