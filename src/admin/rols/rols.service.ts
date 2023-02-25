import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { response } from 'src/shared/types/response';
import { Repository } from 'typeorm';
import { Permisssions } from '../permissions/permissions.entity';
import { Rols } from './rols.entity';

@Injectable()
export class RolsService {

    constructor(
        @InjectRepository(Rols) private rolRepository: Repository<Rols>,
      ) {}

    async getRols(): Promise<response> {
        const res: response = {};
        try {
          const newUser = await this.rolRepository.find({
            relations:{
              Permisssions:true
            }
          });
          res.data = newUser;
          return res;
        } catch (error) {
          return new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async createRol(rolDto:createRolDto): Promise<response> {
        const res: response = {};
        try {
          const rolFound = await this.rolRepository.findOne({
            where: { name:rolDto.name },
          });
          if (rolFound) {
            return new HttpException('Rol Already Exist', HttpStatus.CONFLICT);
          }
          const newRol = this.rolRepository.create(rolDto);
          res.data = (await this.rolRepository.save(newRol)).id;
          return res;
        } catch (error) {
          return new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async updateRol(id: number, rol: createRolDto) {
      try {
        console.log(id,rol)
        const newUser = this.rolRepository.update(id, rol);
        return newUser;
      } catch (error) {
        throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
}

export class createRolDto{
    name:string
    Permisssions:Permisssions[]
}