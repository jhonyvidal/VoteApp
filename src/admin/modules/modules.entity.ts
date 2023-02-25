import {Entity,Column,PrimaryGeneratedColumn} from 'typeorm'

@Entity({name:'modules'})
export class Modules{
    @PrimaryGeneratedColumn()
    id :number 

    @Column({unique:true})
    name:string

    @Column({type:'datetime',default:()=>'CURRENT_TIMESTAMP'})
    createAt:Date
}