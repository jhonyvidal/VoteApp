import {Entity,Column,PrimaryGeneratedColumn,JoinColumn, ManyToOne} from 'typeorm'
import { Rols } from '../../rols/rols.entity'

@Entity({name:'users'})
export class User{
    @PrimaryGeneratedColumn()
    id :number 

    @Column({unique:true})
    email:string

    @Column()
    name:string

    @Column()
    password:string

    @Column({type:'datetime',default:()=>'CURRENT_TIMESTAMP'})
    createAt:Date

    @Column()
    status:string

    @ManyToOne(()=>Rols)
    @JoinColumn()
    rol:Rols
}