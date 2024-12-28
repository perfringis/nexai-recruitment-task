import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateCustomerDTO } from 'src/dto/create.customer.dto';
import { CustomerDTO } from 'src/dto/customer.dto';
import { UpdateCustomerDTO } from 'src/dto/update.customer.dto';
import { Customer } from 'src/entity/customer';
import { CustomerService } from 'src/service/customer.service';
import { Response } from 'express';

@Controller()
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Get('/customers')
  public async getCustomers(): Promise<CustomerDTO[]> {
    const customers: Customer[] = await this.customerService.getCustomers();

    return this.toDTOs(customers);
  }

  @Get('/customer/:id')
  public async getCustomer(@Param('id') id: string): Promise<CustomerDTO> {
    const customer: Customer = await this.customerService.getCustomer(id);

    return this.toDTO(customer);
  }

  @Post('/customer')
  @UsePipes(ValidationPipe)
  public async createCustomer(
    @Body() dto: CreateCustomerDTO,
  ): Promise<CustomerDTO> {
    const created: Customer = await this.customerService.createCustomer(dto);

    return this.toDTO(created);
  }

  @Put('/customer/:id')
  @UsePipes(ValidationPipe)
  public async updateCustomer(
    @Param('id') id: string,
    @Body() dto: UpdateCustomerDTO,
  ): Promise<CustomerDTO> {
    const updated: Customer = await this.customerService.updateCustomer(
      id,
      dto,
    );

    return this.toDTO(updated);
  }

  @Delete('/customer/:id')
  public async deleteCustomer(
    @Param('id') id: string,
    @Res() response: Response,
  ): Promise<void> {
    await this.customerService.deleteCustomer(id);

    response.status(HttpStatus.OK).send({
      message: `Customer with id= ${id} has been deleted successfully.`,
    });
  }

  private toDTOs(customers: Customer[]): CustomerDTO[] {
    return customers.map((customer) => this.toDTO(customer));
  }

  private toDTO(customer: Customer): CustomerDTO {
    return new CustomerDTO(customer);
  }
}
