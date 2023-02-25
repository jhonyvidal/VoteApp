import {Entity,Column,PrimaryGeneratedColumn, ManyToMany, JoinTable, ManyToOne, JoinColumn} from 'typeorm'
import { City } from '../city/city.entity'
import { Permisssions } from '../permissions/permissions.entity'

@Entity({name:'customer'})
export class Customer{
    @PrimaryGeneratedColumn()
    id :number 

    @Column()
    document:string

    @Column()
    email:string

    @Column()
    name:string

    @Column()
    lastName:string

    @Column()
    adress:string

    @Column()
    phone:string

    @Column({type:'datetime',default:()=>'CURRENT_TIMESTAMP'})
    createAt:Date

    @Column()
    status:boolean

    @ManyToOne(()=>City)
    @JoinColumn()
    city:City

}