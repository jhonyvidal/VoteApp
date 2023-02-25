import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { response } from 'src/shared/types/response';
import { Like, Repository } from 'typeorm';
import { Permisssions } from '../permissions/permissions.entity';
import { Customer } from './customer.entity';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
  ) {}

  async getCustomerFilter(filter: string): Promise<response> {
    const res: response = {};
    console.log('filter', filter);
    try {
      let newCustomer = [];
      if (filter === 'null') {
        newCustomer = await this.customerRepository.find({
          relations: {
            city: true,
          },
          select: {
            city: { name: true },
          },
          take: 100,
        });
      } else {
        newCustomer = await this.customerRepository.find({
          relations: {
            city: true,
          },
          select: {
            city: {
              name: true,
            },
          },
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
          take: 100,
        });
      }

      res.data = newCustomer;
      return res;
    } catch (error) {
      return new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async createCustomer(rolDto: createCustomerDto): Promise<response> {
    const res: response = {};
    try {
      const newCustomer = this.customerRepository.create(rolDto);
      res.data = (await this.customerRepository.save(newCustomer)).id;
      return res;
    } catch (error) {
      return new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async updateCustomer(id: number, rol: createCustomerDto) {
    try {
      console.log(id, rol);
      const newUser = this.customerRepository.update(id, rol);
      return newUser;
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}

export class createCustomerDto {
  name: string;
}
