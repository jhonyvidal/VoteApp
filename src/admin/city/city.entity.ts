import {Entity,Column,PrimaryGeneratedColumn, ManyToMany, JoinTable} from 'typeorm'

@Entity({name:'city'})
export class City{
    @PrimaryGeneratedColumn()
    id :number 

    @Column()
    daneCode:string

    @Column()
    name:string

    @Column()
    state:string

    @Column({type:'datetime',default:()=>'CURRENT_TIMESTAMP'})
    createAt:Date

    @Column()
    status:boolean

}