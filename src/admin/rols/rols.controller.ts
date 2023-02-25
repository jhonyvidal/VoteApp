import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { createRolDto, RolsService } from './rols.service';

@Controller('rols')
export class RolsController {
    constructor(private rolService: RolsService) {}

    @Get()
    // @UseGuards(AuthGuard('jwt'))
    getRols() {
      return this.rolService.getRols();
    }

    @Post()
    @UseGuards(AuthGuard('jwt'))
    createRols(@Body() newUser: createRolDto) {
      return this.rolService.createRol(newUser);
    }

    @Patch(':id')
    @UseGuards(AuthGuard('jwt'))
    updateUser(
      @Param('id', ParseIntPipe) id: number,
      @Body() newRol: createRolDto,
    ) {
      return this.rolService.updateRol(id, newRol);
    }

  
}
