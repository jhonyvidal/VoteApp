import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { createSenderDto, SenderService } from './sender.service';

@Controller('sender')
export class SenderController {
    constructor(private senderService: SenderService) {}


    @Get('filter/:id')
    @UseGuards(AuthGuard('jwt'))
    getUsers(@Param('id') id: string | any) {
      console.log("controller")
      return this.senderService.getSenderFilter(id);
    }

    @Post()
    @UseGuards(AuthGuard('jwt'))
    createSender(@Body() newSender: createSenderDto) {
      return this.senderService.createSender(newSender);
    }

    @Patch(':id')
    @UseGuards(AuthGuard('jwt'))
    updateSender(
      @Param('id', ParseIntPipe) id: number,
      @Body() newSender: createSenderDto,
    ) {
      return this.senderService.updateSender(id, newSender);
    }

  
}
