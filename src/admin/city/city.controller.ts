import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { createCityDto, CityService } from './city.service';

@Controller('city')
export class CityController {
    constructor(private CityService: CityService) {}


    @Get('filter/:id')
    @UseGuards(AuthGuard('jwt'))
    getCustomer(@Param('id') id: string | any) {
      console.log("controller")
      return this.CityService.getCityFilter(id);
    }

    @Post()
    @UseGuards(AuthGuard('jwt'))
    createCustomer(@Body() newSender: createCityDto) {
      return this.CityService.createCity(newSender);
    }

    @Patch(':id')
    @UseGuards(AuthGuard('jwt'))
    updateCustomer(
      @Param('id', ParseIntPipe) id: number,
      @Body() newSender: createCityDto,
    ) {
      return this.CityService.updateCity(id, newSender);
    }

  
}
