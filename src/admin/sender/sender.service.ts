import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { response } from 'src/shared/types/response';
import { Like, Repository } from 'typeorm';
import { Permisssions } from '../permissions/permissions.entity';
import { Sender } from './sender.entity';

@Injectable()
export class SenderService {

    constructor(
        @InjectRepository(Sender) private senderRepository: Repository<Sender>,
      ) {}

    // async getSenders(): Promise<response> {
    //     const res: response = {};
    //     try {
    //       const newSender = await this.rolRepository.find({});
    //       res.data = newSender;
    //       return res;
    //     } catch (error) {
    //       return new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    //     }
    // }
    async getSenderFilter(filter: string): Promise<response> {
      const res: response = {};
      console.log("filter",filter)
      try {
        let newSender=[]
        if (filter === 'null') {
          newSender = await this.senderRepository.find({
            take:100
          });
        }else{
          newSender = await this.senderRepository.find({
            where: [
              {
                name: Like('%' + filter + '%'),
              },
              {
                document: Like('%' + filter + '%'),
              },
              {
                lastName: Like('%' + filter + '%'),
              },
            ],
            take:100
          });
        }
       
        res.data = newSender;
        return res;
      } catch (error) {
        return new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }

    async createSender(rolDto:createSenderDto): Promise<response> {
        const res: response = {};
        try {
          const newSender = this.senderRepository.create(rolDto);
          res.data = (await this.senderRepository.save(newSender)).id;
          return res;
        } catch (error) {
          return new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async updateSender(id: number, rol: createSenderDto) {
      try {
        console.log(id,rol)
        const newUser = this.senderRepository.update(id, rol);
        return newUser;
      } catch (error) {
        throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
}

export class createSenderDto{
    name:string
    Permisssions:Permisssions[]
}