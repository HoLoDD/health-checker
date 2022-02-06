import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateWebserviceDto } from './dto/create-webservice.dto';
import { Webservice } from './webservice.entity';
import { WebServicesService } from './webservice.service';

@ApiTags('Web Services')
@Controller('services')
export class WebServicesController {
  constructor(private webservicesService: WebServicesService) {}

  @ApiOperation({ summary: 'Get all webservices' })
  @ApiResponse({ status: 200, type: [Webservice] })
  @Get()
  getServicesList(): {} {
    return this.webservicesService.getAll();
  }

  @ApiOperation({ summary: 'Get Web Service by id' })
  @ApiResponse({ status: 200, type: Webservice })
  @Get(':id/status')
  getServiceStatus(@Param('id') id: number): {} {
    return this.webservicesService.getById(id);
  }

  @ApiOperation({ summary: 'Web Service creation' })
  @ApiResponse({ status: 200, type: Webservice })
  @Post()
  addService(@Body() dto: CreateWebserviceDto) {
    return this.webservicesService.addWebService(dto);
  }

  @ApiOperation({ summary: 'Web Service update' })
  @ApiResponse({ status: 200, type: Webservice })
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

  @ApiOperation({ summary: 'remove Web Service' })
  @ApiResponse({ status: 200, type: Webservice })
  @Delete(':id')
  removeService(@Param('id') id: number) {
    return this.webservicesService.removeWebService(id);
  }
}
