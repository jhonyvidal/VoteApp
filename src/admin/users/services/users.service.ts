import {
  Injectable,
  HttpException,
  HttpStatus,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entity/user.entity';
import { Like, Repository } from 'typeorm';
import { createUserDto } from '../dto/createUser.dto';
import { response } from 'src/shared/types/response';
import { updateUserDto } from '../dto/updateUser.dto';
import { throwError } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { createLoginDto } from '../dto/createLogin.dto';
import { ShareService } from 'src/shared/service/shared.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,
    private shareService: ShareService,
    private configService: ConfigService,
  ) {}

  async posLogin(createLoginDto): Promise<any> {
    const resUser = await this.isUserActive(
      createLoginDto.data.email,
      createLoginDto.data.password,
    );

    if (!resUser || !resUser.isActive) {
      throw new UnauthorizedException('Invalid User');
    }

    const payload: {
      scope: {
        isActive?: boolean;
        UserEmail?: string;
        sessionId?: string;
        secret?: any;
      };
    } = {
      scope: resUser,
    };

    return {
      user: {
        uuid: payload.scope.sessionId,
        from: 'custom-db',
        role: 'admin',
        data: {
          displayName: 'Abbott Keitch',
          photoURL: 'assets/images/avatars/brian-hughes.jpg',
          email: createLoginDto.data.email,
          settings: {
            layout: {},
            theme: {},
          },
          shortcuts: ['apps.calendar', 'apps.mailbox', 'apps.contacts'],
        },
      },
      access_token: this.jwtService.sign(payload),
    };
  }

  async getAccessToken(authorization): Promise<any> {
    const res: response = {};
    try {
      const newAccesToken = {
        user: {
          uuid: 'XgbuVEXBU5gtSKdbQRP1Zbbby1i1',
          from: 'custom-db',
          role: 'admin',
          data: {
            displayName: 'Abbott Keitch',
            photoURL: 'assets/images/avatars/brian-hughes.jpg',
            email: 'admin@fusetheme.com',
            settings: {
              layout: {},
              theme: {},
            },
            shortcuts: ['apps.calendar', 'apps.mailbox', 'apps.contacts'],
          },
        },
        access_token: authorization.split(' ')[1],
      };
      return newAccesToken;
    } catch (error) {
      return new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getUserFilter(filter: string): Promise<response> {
    const res: response = {};
    try {
      let newUser=[]
      if (filter === 'null') {
        newUser = await this.userRepository.find({
          select: {
            id: true,
            email: true,
            name: true,
            createAt: true,
            status: true,
          },
          take:100
        });
      }else{
        newUser = await this.userRepository.find({
          select: {
            id: true,
            email: true,
            name: true,
            createAt: true,
            status: true,
          },
          where: [
            {
              email: Like('%' + filter + '%'),
            },
            {
              name: Like('%' + filter + '%'),
            },
          ],
          take:100
        });
      }
     
      res.data = newUser;
      return res;
    } catch (error) {
      return new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getUserById(id: number): Promise<response> {
    const res: response = {};
    try {
      const data = await this.userRepository.findOne({
        where: {
          id,
        },
        relations: ['rol', 'rol.Permisssions' ],
      });
      if (!data) {
        return new HttpException('Not Found', HttpStatus.NOT_FOUND);
      }
      res.data = data;
      return res;
    } catch (error) {
      return new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async createUser(user: createUserDto): Promise<response> {
    const res: response = {};
    try {
      const UserFound = await this.userRepository.findOne({
        where: { email: user.data.email },
      });
      if (UserFound) {
        throw new HttpException('User Already Exist', HttpStatus.CONFLICT);
      }
      user.data.password = await this.shareService.encript(user.data.password);
      user.data.status = 'active';
      const newUser = this.userRepository.create(user.data);
      res.data = (await this.userRepository.save(newUser)).id;
      return res;
    } catch (error) {
      return (res.message = error);
    }
  }

  async updateUser(id: number, user: updateUserDto) {
    const res: response = {};
    try {
      if (user.data.password) {
        user.data.password = await this.shareService.encript(
          user.data.password,
        );
      }

      const newUser = this.userRepository.update(id, user.data);
      return newUser;
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async isUserActive(user: string, password: string) {
    const response = await this.userRepository.findOne({
      where: {
        email: user
      },
    });
    if (!(await this.shareService.decript(password, response.password))) {
      return false;
    }
    if (response) {
      return await this.shareService.client(true, user);
    } else {
      return false;
    }
  }
}
