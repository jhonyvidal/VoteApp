import { Inject, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './admin/users/users.module';
import {TypeOrmModule} from '@nestjs/typeorm'
import { User } from './admin/users/entity/user.entity';
import { RolsModule } from './admin/rols/rols.module';
import { Rols } from './admin/rols/rols.entity';
import { PermissionsModule } from './admin/permissions/permissions.module';
import { Permisssions } from './admin/permissions/permissions.entity';
import { ModulesModule } from './admin/modules/modules.module';
import { Modules } from './admin/modules/modules.entity';
import { DashboardModule } from './admin/dashboard/dashboard.module';
import { JwtModule } from '@nestjs/jwt/dist';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configurationAuth from './configuration/configuration-auth';
import { SenderModule } from './admin/sender/sender.module';
import { Sender } from './admin/sender/sender.entity';
import { Customer } from './admin/customer/customer.entity';
import { CustomerModule } from './admin/customer/customer.module';
import { City } from './admin/city/city.entity';
import { CityModule } from './admin/city/city.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      // type:'mysql',
      // host:'localhost',
      // port:3306,
      // username: 'root',
      // password: '',
      type:'mysql',
      host:'containers-us-west-198.railway.app',
      port:5805,
      username: 'root',
      password: 'YValCKleuo8iXmOEZrR9',
      database:'railway',
      synchronize: true,
      logging: true,
      entities:[User,Rols,Permisssions,Modules,Sender,Customer,City],
    }),
    ConfigModule.forRoot({
      load:[configurationAuth],
      envFilePath:`./env/dev.env`,
      isGlobal:true
    }),
    UsersModule,
    RolsModule,
    PermissionsModule,
    ModulesModule,
    DashboardModule,
    SenderModule,
    CityModule,
    CustomerModule
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
