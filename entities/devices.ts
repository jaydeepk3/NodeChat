import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";
import {users} from "./users";


@Entity("devices" ,{schema:"loungemate" } )
@Index("devices_user_id_foreign",["user",])
export class devices {

    @PrimaryGeneratedColumn({
        type:"bigint", 
        unsigned: true,
        name:"id"
        })
    id:string;
        

   
    @ManyToOne(()=>users, (users: users)=>users.devicess,{  nullable:false,onDelete: 'CASCADE',onUpdate: 'CASCADE' })
    @JoinColumn({ name:'user_id'})
    user:users | null;


    @Column("varchar",{ 
        nullable:true,
        name:"device_id"
        })
    device_id:string | null;
        

    @Column("text",{ 
        nullable:true,
        name:"push_token"
        })
    push_token:string | null;
        

    @Column("timestamp",{ 
        nullable:true,
        name:"created_at"
        })
    created_at:Date | null;
        

    @Column("timestamp",{ 
        nullable:true,
        name:"updated_at"
        })
    updated_at:Date | null;
        
}
