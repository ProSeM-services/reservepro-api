import { Controller, Get, Param, Query } from '@nestjs/common';
import { ClientService } from './client.service';

@Controller('client')
export class ClientController {
  constructor(private readonly clientServices: ClientService) {}

  @Get('/companies')
  async getCompanies(
    @Query() query: { name: string; category: string; city: string },
  ) {
    try {
      return this.clientServices.getCompanies(
        query.name,
        query.category,
        query.city.split(',')[0],
      );
    } catch (error) {
      return error;
    }
  }
  @Get('/companies/:id')
  async getCompanyById(@Param() { id }: { id: string }) {
    try {
      return this.clientServices.getCompanyById(id);
    } catch (error) {
      return error;
    }
  }
}
