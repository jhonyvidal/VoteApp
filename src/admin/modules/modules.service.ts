import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { response } from 'src/shared/types/response';
import { Repository } from 'typeorm';
import { Modules } from './modules.entity';

@Injectable()
export class ModulesService {
    constructor(
        @InjectRepository(Modules) private ModulesRepository: Repository<Modules>,
    ) {}

    async getModules(): Promise<response> {
        const res: response = {};
        try {
          const newUser = await this.ModulesRepository.find();
          res.data = newUser;
          return res;
        } catch (error) {
          return new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async createPermissions(modDto:createModulesDto): Promise<response> {
        const res: response = {};
        try {
          const rolFound = await this.ModulesRepository.findOne({
            where: { name:modDto.name },
          });
          if (rolFound) {
            return new HttpException('User Already Exist', HttpStatus.CONFLICT);
          }
          const newRol = this.ModulesRepository.create(modDto);
          res.data = (await this.ModulesRepository.save(newRol)).id;
          return res;
        } catch (error) {
            return new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
        }
      }

}

export class createModulesDto{
    name:string
}