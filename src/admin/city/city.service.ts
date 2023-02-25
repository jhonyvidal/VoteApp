import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { response } from 'src/shared/types/response';
import { Like, Repository } from 'typeorm';
import { City } from './city.entity';

@Injectable()
export class CityService {

    constructor(
        @InjectRepository(City) private CityRepository: Repository<City>,
      ) {}

    async getCityFilter(filter: string): Promise<response> {
      const res: response = {};
      console.log("filter",filter)
      try {
        let newCity=[]
        if (filter === 'null') {
          newCity = await this.CityRepository.find({
            take:100
          });
        }else{
          newCity = await this.CityRepository.find({
            where: [
              {
                name: Like('%' + filter + '%'),
              },
              {
                daneCode: Like('%' + filter + '%'),
              },
            ],
            take:100
          });
        }
       
        res.data = newCity;
        return res;
      } catch (error) {
        return new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }

    async createCity(rolDto:createCityDto): Promise<response> {
        const res: response = {};
        try {
          const newCity = this.CityRepository.create(rolDto);
          res.data = (await this.CityRepository.save(newCity)).id;
          return res;
        } catch (error) {
          return new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async updateCity(id: number, rol: createCityDto) {
      try {
        console.log(id,rol)
        const newUser = this.CityRepository.update(id, rol);
        return newUser;
      } catch (error) {
        throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
}

export class createCityDto{
    name:string
}