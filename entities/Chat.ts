import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";
import {users} from "./users";


@Entity("Chat" ,{schema:"loungemate" } )
@Index("newConst",["sendUser",])
@Index("newConstra",["receiveUser",])
export class Chat {

    @PrimaryGeneratedColumn({
        type:"bigint", 
        unsigned: true,
        name:"Id"
        })
    Id:string;
        

   
    @ManyToOne(()=>users, (users: users)=>users.chats,{  nullable:false,onDelete: 'CASCADE',onUpdate: 'CASCADE' })
    @JoinColumn({ name:'sendUserId'})
    sendUser:users | null;


   
    @ManyToOne(()=>users, (users: users)=>users.chats2,{  nullable:false,onDelete: 'CASCADE',onUpdate: 'CASCADE' })
    @JoinColumn({ name:'receiveUserId'})
    receiveUser:users | null;


    @Column("varchar",{ 
        nullable:false,
        length:100,
        name:"message"
        })
    message:string;
        

    @Column("timestamp",{ 
        nullable:false,
        default: () => "'CURRENT_TIMESTAMP(6)'",
        name:"created_at"
        })
    created_at:Date;
        
}
