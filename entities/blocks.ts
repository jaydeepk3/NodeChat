import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";
import {users} from "./users";


@Entity("blocks" ,{schema:"loungemate" } )
@Index("blocks_user_id_foreign",["user",])
export class blocks {

    @PrimaryGeneratedColumn({
        type:"bigint", 
        unsigned: true,
        name:"id"
        })
    id:string;
        

   
    @ManyToOne(()=>users, (users: users)=>users.blockss,{  nullable:false,onDelete: 'CASCADE',onUpdate: 'CASCADE' })
    @JoinColumn({ name:'user_id'})
    user:users | null;


    @Column("varchar",{ 
        nullable:true,
        name:"block_type"
        })
    block_type:string | null;
        

    @Column("varchar",{ 
        nullable:true,
        name:"block_value"
        })
    block_value:string | null;
        

    @Column("varchar",{ 
        nullable:true,
        name:"block_value_type"
        })
    block_value_type:string | null;
        

    @Column("datetime",{ 
        nullable:true,
        name:"block_time"
        })
    block_time:Date | null;
        

    @Column("tinyint",{ 
        nullable:false,
        width:1,
        default: () => "'0'",
        name:"unblock"
        })
    unblock:boolean;
        

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
