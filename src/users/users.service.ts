import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Webservice } from 'src/webservices/webservice.entity';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  async createUser(tg_id: number, mail?: string) {
    const newUser = this.userRepository.create({
      telegram_id: tg_id,
      mail: mail,
    });

    return this.userRepository.save(newUser);
  }

  async getUsers() {
    return await this.userRepository.find();
  }

  async editUser(userid: number, telegram_id: number, mail: string) {
    try {
      const user = await this.userRepository.findOneOrFail(userid);

      user.telegram_id = telegram_id;
      user.mail = mail;

      return this.userRepository.save(user);
    } catch (error) {
      throw new NotFoundException(`User with id ${userid} doesn't exist`);
    }
  }

  async addWebService(userid: number, webService: Webservice) {
    const user = await this.userRepository.findOneOrFail(userid);

    if (!user.webservices) user.webservices = [];
    user.webservices = [...user.webservices, webService];
    console.log(user.webservices);

    return this.userRepository.save(user);
  }

  async getUserByTelegram(telegram_id: number) {
    try {
      return await this.userRepository.findOneOrFail({
        where: [{ telegram_id: telegram_id }],
      });
    } catch (error) {
      throw new NotFoundException(
        `User with telegram ${telegram_id} doesn't exist`,
      );
    }
  }

  async getUserById(id: number) {
    try {
      return await this.userRepository.findOneOrFail(id);
    } catch (error) {
      throw new NotFoundException(`User with id ${id} doesn't exist`);
    }
  }

  // async getServicesForUser(id: number) {
  //   return await this.userRepository.find({ relations: ['webservices'] });
  // }

  async removeUserById(id: number) {
    try {
      const user = await this.userRepository.findOneOrFail(id);
      return this.userRepository.remove(user);
    } catch (error) {
      throw new NotFoundException(`User with id ${id} doesn't exist`);
    }
  }
}
