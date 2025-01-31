import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppointmentsController } from './appointments.controller';
import { AppointmentsService } from './appointments.service';
import { tenantModels } from 'src/common/providers/tenant-models-provider';
import { TenantsModule } from 'src/tenants/tenants.module';
import { JwtService } from '@nestjs/jwt';
import { TenantsMiddleware } from 'src/common/middlewares/tenants.middleware';
import { MembersService } from 'src/members/members.service';
import { CustomerService } from 'src/customer/customer.service';
import { ServicesService } from 'src/services/services.service';

@Module({
  imports: [TenantsModule],
  controllers: [AppointmentsController],
  providers: [
    AppointmentsService,
    CustomerService,
    ServicesService,
    tenantModels.appointmentModel,
    tenantModels.membersModel,
    MembersService,
    JwtService,
  ],
  exports: [AppointmentsService],
})
export class AppointmentsModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TenantsMiddleware).forRoutes(AppointmentsController);
  }
}
