import {
  BadRequestException,
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  HttpStatus,
  InternalServerErrorException,
  NotFoundException,
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
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

@Controller()
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @ApiOperation({ summary: 'Get all customers' })
  @ApiResponse({
    status: 200,
    description: 'Successfully fetched all customers.',
    type: [CustomerDTO],
    example: [
      {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@doe.com',
        address: {
          street: 'Świętokrzyska',
          city: 'Warszawa',
          country: 'Polska',
          postalCode: '00-001',
          buildingNumber: '33',
        },
      },
    ],
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error.',
    type: InternalServerErrorException,
    example: {
      message: 'Internal Server Error',
      statusCode: 500,
    },
  })
  @Get('/customers')
  public async getCustomers(): Promise<CustomerDTO[]> {
    const customers: Customer[] = await this.customerService.getCustomers();

    return this.toDTOs(customers);
  }

  @ApiOperation({ summary: 'Get customer by id' })
  @ApiParam({
    name: 'id',
    description: 'id of the customer to get',
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully get a customer.',
    type: CustomerDTO,
    example: {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@doe.com',
      address: {
        street: 'Świętokrzyska',
        city: 'Warszawa',
        country: 'Polska',
        postalCode: '00-001',
        buildingNumber: '33',
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Inappropriate parameters.',
    type: BadRequestException,
    example: {
      message: 'Inappropriate parameters.',
      error: 'Bad Request',
      statusCode: 400,
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Customer does not exists.',
    type: NotFoundException,
    example: {
      message:
        'Customer does not exists, id = 9b19b1b6-7e95-4838-85b8-d06f73d13c0c',
      error: 'Not Found',
      statusCode: 404,
    },
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error.',
    type: InternalServerErrorException,
    example: {
      message: 'Internal Server Error',
      statusCode: 500,
    },
  })
  @Get('/customer/:id')
  public async getCustomer(@Param('id') id: string): Promise<CustomerDTO> {
    const customer: Customer = await this.customerService.getCustomer(id);

    return this.toDTO(customer);
  }

  @ApiOperation({ summary: 'Create a customer' })
  @ApiBody({
    type: CreateCustomerDTO,
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully created a customer.',
    type: CustomerDTO,
    example: {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@doe.com',
      address: {
        street: 'Świętokrzyska',
        city: 'Warszawa',
        country: 'Polska',
        postalCode: '00-001',
        buildingNumber: '33',
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Inappropriate parameters.',
    type: BadRequestException,
    example: {
      message: 'Inappropriate parameters.',
      error: 'Bad Request',
      statusCode: 400,
    },
  })
  @ApiResponse({
    status: 409,
    description: 'Customer is defined.',
    type: ConflictException,
    example: {
      message: 'Customer is defined.',
      error: 'Conflict',
      statusCode: 409,
    },
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error.',
    type: InternalServerErrorException,
    example: {
      message: 'Internal Server Error',
      statusCode: 500,
    },
  })
  @Post('/customer')
  @UsePipes(ValidationPipe)
  public async createCustomer(
    @Body() dto: CreateCustomerDTO,
  ): Promise<CustomerDTO> {
    const created: Customer = await this.customerService.createCustomer(dto);

    return this.toDTO(created);
  }

  @ApiOperation({ summary: 'Update a customer' })
  @ApiParam({
    name: 'id',
    description: 'id of the customer to update',
    type: String,
  })
  @ApiBody({
    type: UpdateCustomerDTO,
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully updated a customer.',
    type: CustomerDTO,
    example: {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@doe.com',
      address: {
        street: 'Świętokrzyska',
        city: 'Warszawa',
        country: 'Polska',
        postalCode: '00-001',
        buildingNumber: '33',
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Inappropriate parameters.',
    type: BadRequestException,
    example: {
      message: 'Inappropriate parameters.',
      error: 'Bad Request',
      statusCode: 400,
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Customer does not exists.',
    type: NotFoundException,
    example: {
      message:
        'Customer does not exists, id = 9b19b1b6-7e95-4838-85b8-d06f73d13c0c',
      error: 'Not Found',
      statusCode: 404,
    },
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error.',
    type: InternalServerErrorException,
    example: {
      message: 'Internal Server Error',
      statusCode: 500,
    },
  })
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

  @ApiOperation({ summary: 'Delete a customer' })
  @ApiParam({
    name: 'id',
    description: 'id of the customer to delete',
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully delete a customer.',
    example: {
      message:
        'Customer with id 9b19b1b6-7e95-4838-85b8-d06f73d13c0c has been deleted successfully.',
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Inappropriate parameters.',
    type: BadRequestException,
    example: {
      message: 'Inappropriate parameters.',
      error: 'Bad Request',
      statusCode: 400,
    },
  })
  @ApiResponse({
    status: 404,
    description: 'Customer does not exists.',
    type: NotFoundException,
    example: {
      message: 'Customer does not exists, id = 9b19b1b6-7e95-4838-85b8-d06f73d13c0c',
      error: 'Not Found',
      statusCode: 404,
    },
  })
  @ApiResponse({
    status: 500,
    description: 'Internal server error.',
    type: InternalServerErrorException,
    example: {
      message: 'Internal Server Error',
      statusCode: 500,
    },
  })
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
