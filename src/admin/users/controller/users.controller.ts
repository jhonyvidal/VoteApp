import { Body, Headers, Controller, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { Get, Param, Patch } from '@nestjs/common/decorators';
import { AuthGuard } from '@nestjs/passport';
import { createLoginDto } from '../dto/createLogin.dto';
import { createUserDto } from '../dto/createUser.dto';
import { updateUserDto } from '../dto/updateUser.dto';
import { UsersService } from '../services/users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}


  @Post('/login')
  postLogin(@Body() newLogin: createLoginDto) {
    return this.userService.posLogin(newLogin);
  }
  
  @Get('filter/:id')
  @UseGuards(AuthGuard('jwt'))
  getUsers(@Param('id') id: string | any) {
    console.log("controller")
    return this.userService.getUserFilter(id);
  }

  @Get('/access-token')
  @UseGuards(AuthGuard('jwt'))
  getAccessToken(@Headers() { authorization }:{ authorization : string} ) {
    return this.userService.getAccessToken(authorization);
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  getUsersId(@Param('id', ParseIntPipe) id: number) {
    console.log("asd")
    return this.userService.getUserById(id);
  }


  @Post()
  @UseGuards(AuthGuard('jwt'))
  createUser(@Body() newUser: createUserDto) {
    return this.userService.createUser(newUser);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() newUser: updateUserDto,
  ) {
    return this.userService.updateUser(id, newUser);
  }
}
