import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  Headers,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateWebserviceDto } from './dto/create-webservice.dto';
import { WebServicesService } from './webservice.service';

@Controller('services')
export class WebServicesController {
  constructor(private webservicesService: WebServicesService) {}

  @Get()
  getServicesList(): {} {
    return this.webservicesService.getAll();
  }

  @Get(':id/status')
  getServiceStatus(@Param('id') id: number): {} {
    return this.webservicesService.getStatus(id);
  }

  @Post()
  addService(@Body() dto: CreateWebserviceDto) {
    return this.webservicesService.addWebService(dto);
  }

  @Put(':id')
  editService(
    @Param('id') id: number,
    @Body('name') name: string,
    @Body('url') url: string,
    @Body('latency') latency: number,
    @Body('isAvailable') isAvailable: boolean,
  ) {
    return this.webservicesService.editWebService(
      id,
      name,
      url,
      latency,
      isAvailable,
    );
  }

  @Delete(':id')
  removeService(@Param('id') id: number) {
    return this.webservicesService.removeWebService(id);
  }
}
