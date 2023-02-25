import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { createCustomerDto, CustomerService } from './customer.service';

@Controller('customer')
export class CustomerController {
    constructor(private customerService: CustomerService) {}


    @Get('filter/:id')
    @UseGuards(AuthGuard('jwt'))
    getCustomer(@Param('id') id: string | any) {
      console.log("controller")
      return this.customerService.getCustomerFilter(id);
    }

    @Post()
    @UseGuards(AuthGuard('jwt'))
    createCustomer(@Body() newSender: createCustomerDto) {
      return this.customerService.createCustomer(newSender);
    }

    @Patch(':id')
    @UseGuards(AuthGuard('jwt'))
    updateCustomer(
      @Param('id', ParseIntPipe) id: number,
      @Body() newSender: createCustomerDto,
    ) {
      return this.customerService.updateCustomer(id, newSender);
    }

  
}
