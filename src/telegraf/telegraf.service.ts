import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { WebServicesService } from 'src/webservices/webservice.service';

@Injectable()
export class TelegrafService {
  constructor(
    private webservicesService: WebServicesService,
    private userService: UsersService,
  ) {}

  async addUser(tg_id: number, mail?: string) {
    try {
      await this.userService.createUser(tg_id);
      return 'Added';
    } catch (error) {
      return 'User already added';
    }
  }

  async removeUser(tg_id: number) {
    try {
      const user = await this.userService.getUserByTelegram(tg_id);
      await this.userService.removeUserById(user.id);
      return 'Deleted';
    } catch (error) {
      return 'Error while deleting user';
    }
  }

  async viewWebservices() {
    const servicesList = await this.webservicesService.getAll();
    let list: string = '--- Services list ---\n\n';
    servicesList.forEach((webservice, index) => {
      list += `Web Service ${index}:
       Name: ${webservice.name}
       URL: ${webservice.url}
       Status: ${webservice.isAvailable ? 'ONLINE' : 'OFFLINE'}\n\n`;
    });
    return list;
  }

  async viewWebservicesForUser(userId: number) {
    const [user] = await this.userService.getServicesForUser(userId);
    console.log(user);

    let list: string = '--- My Services list ---\n\n';
    if (!user.webservices) return 'Empty';
    user.webservices.forEach((webservice, index) => {
      list += `Web Service ${index}:
       Name: ${webservice.name}
       URL: ${webservice.url}
       Status: ${webservice.isAvailable ? 'ONLINE' : 'OFFLINE'}\n\n`;
    });
    return list;
  }
}
