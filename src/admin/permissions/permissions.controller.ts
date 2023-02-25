import { Body, Controller, Get, Post } from '@nestjs/common';
import { createPermissionDto, PermissionsService } from './permissions.service';

@Controller('permissions')
export class PermissionsController {

    constructor(private permisionService: PermissionsService) {}

    @Get()
    getRols() {
      return this.permisionService.getPermissions();
    }

    @Post()
    createUser(@Body() newUser: createPermissionDto) {
      return this.permisionService.createPermissions(newUser);
    }
}
