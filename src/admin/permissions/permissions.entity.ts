import {Entity,Column,PrimaryGeneratedColumn, ManyToOne, JoinColumn, ManyToMany, JoinTable} from 'typeorm'
import { Modules } from '../modules/modules.entity'
import { Rols } from '../rols/rols.entity'

@Entity({name:'permissions'})
export class Permisssions{
    @PrimaryGeneratedColumn()
    id :number 

    @Column({unique:true})
    name:string

    @Column({type:'datetime',default:()=>'CURRENT_TIMESTAMP'})
    createAt:Date

    @ManyToOne(()=>Modules)
    @JoinColumn()
    module:Modules

    // @ManyToMany(()=>Rols)
    // @JoinTable()
    // roles:Rols[]
}