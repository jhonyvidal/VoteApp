import {Entity,Column,PrimaryGeneratedColumn, ManyToMany, JoinTable} from 'typeorm'
import { Permisssions } from '../permissions/permissions.entity'

@Entity({name:'rols'})
export class Rols{
    @PrimaryGeneratedColumn()
    id :number 

    @Column({unique:true})
    name:string

    @Column({type:'datetime',default:()=>'CURRENT_TIMESTAMP'})
    createAt:Date

    @Column()
    status:boolean

    @ManyToMany(()=>Permisssions)
    @JoinTable()
    Permisssions:Permisssions[]
}