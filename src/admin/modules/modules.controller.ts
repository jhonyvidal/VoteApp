import { Body, Controller, Get, Post } from '@nestjs/common';
import { createModulesDto, ModulesService } from './modules.service';

@Controller('modules')
export class ModulesController {
    constructor(private ModulesService: ModulesService) {}

    @Get()
    getRols() {
      return this.ModulesService.getModules();
    }

    @Post()
    createUser(@Body() newUser: createModulesDto) {
      return this.ModulesService.createPermissions(newUser);
    }
}
