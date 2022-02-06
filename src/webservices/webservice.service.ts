import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Webservice } from './webservice.entity';
import { CreateWebserviceDto } from './dto/create-webservice.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class WebServicesService {
  constructor(
    @InjectRepository(Webservice)
    private webservicesRepository: Repository<Webservice>,
    private userService: UsersService,
  ) {}

  async getAll() {
    return await this.webservicesRepository.find();
  }

  async getById(id: number) {
    try {
      return await this.webservicesRepository.findOneOrFail(id);
    } catch (error) {
      throw new NotFoundException(`Web Service with id ${id} doesn't exist`);
    }
  }

  async addWebService(dto: CreateWebserviceDto) {
    const user = await this.userService.getUserById(dto.userid);
    const newWebservice = this.webservicesRepository.create();

    newWebservice.name = dto.name;
    newWebservice.url = dto.url;
    newWebservice.latency = dto.latency;

    if (!newWebservice.users) newWebservice.users = [];
    newWebservice.users = [...newWebservice.users, user];

    return this.webservicesRepository.save(newWebservice);
  }

  async editWebService(
    id: number,
    name: string,
    url: string,
    latency: number,
    isAvailable: boolean,
    unavailableFrom?: string,
    unavailableTo?: string,
  ) {
    try {
      const webservice = await this.webservicesRepository.findOneOrFail(id);

      webservice.name = name;
      webservice.url = url;
      webservice.latency = latency;
      webservice.isAvailable = isAvailable;
      webservice.unavailableFrom = unavailableFrom;
      webservice.unavailableTo = unavailableTo;

      return this.webservicesRepository.save(webservice);
    } catch (error) {
      throw new NotFoundException(`Web Service with id ${id} doesn't exist`);
    }
  }

  async removeWebService(id: number) {
    try {
      const webservice = await this.webservicesRepository.findOneOrFail(id);
      return this.webservicesRepository.remove(webservice);
    } catch (error) {
      throw new NotFoundException(`Web Service with id ${id} doesn't exist`);
    }
  }

  async getUsersForWebservice() {
    return await this.webservicesRepository.find({
      relations: ['users'],
    });
  }
}
