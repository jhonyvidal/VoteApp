import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { response } from 'src/shared/types/response';
import { Repository } from 'typeorm';
import { Modules } from '../modules/modules.entity';
import { Rols } from '../rols/rols.entity';
import { Permisssions } from './permissions.entity';

@Injectable()
export class PermissionsService {
    constructor(
        @InjectRepository(Permisssions) private PermissionsRepository: Repository<Permisssions>,
    ) {}

    async getPermissions(): Promise<response> {
        const res: response = {};
        try {
          const newUser = await this.PermissionsRepository.find({
            relations: {
                module: true,
                //roles:true
            },
            
          } 
          );
          res.data = newUser;
          return res;
        } catch (error) {
          return new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async createPermissions(perDto:createPermissionDto): Promise<response> {
        const res: response = {};
        try {
          const rolFound = await this.PermissionsRepository.findOne({
            where: { name:perDto.name },
          });
          if (rolFound) {
            return new HttpException('User Already Exist', HttpStatus.CONFLICT);
          }
          const newRol = this.PermissionsRepository.create(perDto);
          console.log(newRol)
          res.data = (await this.PermissionsRepository.save(newRol)).id;
          return res;
        } catch (error) {
            return new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
        }
      }
}

export class createPermissionDto{
    name:string
    module:Modules
    roles:Rols[]
}
