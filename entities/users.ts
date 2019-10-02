import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";
import {Chat} from "./Chat";


@Entity("users" ,{schema:"loungemate" } )
@Index("users_email_unique",["email",],{unique:true})
@Index("users_phone_unique",["phone",],{unique:true})
export class users {

    @PrimaryGeneratedColumn({
        type:"bigint", 
        unsigned: true,
        name:"id"
        })
    id:string;
        

    @Column("enum",{ 
        nullable:false,
        default: () => "'guest'",
        enum:["host","guest","both"],
        name:"role"
        })
    role:string;
        

    @Column("varchar",{ 
        nullable:false,
        name:"name"
        })
    name:string;
        

    @Column("varchar",{ 
        nullable:false,
        unique: true,
        name:"email"
        })
    email:string;
        

    @Column("varchar",{ 
        nullable:false,
        unique: true,
        name:"phone"
        })
    phone:string;
        

    @Column("timestamp",{ 
        nullable:true,
        name:"email_verified_at"
        })
    email_verified_at:Date | null;
        

    @Column("varchar",{ 
        nullable:true,
        name:"password"
        })
    password:string | null;
        

    @Column("enum",{ 
        nullable:true,
        enum:["facebook","google"],
        name:"thirdparty_name"
        })
    thirdparty_name:string | null;
        

    @Column("text",{ 
        nullable:true,
        name:"thirdparty_token"
        })
    thirdparty_token:string | null;
        

    @Column("varchar",{ 
        nullable:true,
        name:"profile"
        })
    profile:string | null;
        

    @Column("tinyint",{ 
        nullable:false,
        width:1,
        default: () => "'1'",
        name:"active"
        })
    active:boolean;
        

    @Column("varchar",{ 
        nullable:true,
        length:100,
        name:"remember_token"
        })
    remember_token:string | null;
        

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
        

    @Column("tinyint",{ 
        nullable:false,
        width:1,
        default: () => "'0'",
        name:"paid"
        })
    paid:boolean;
        

   
    @OneToMany(()=>Chat, (Chat: Chat)=>Chat.sendUser,{ onDelete: 'CASCADE' ,onUpdate: 'CASCADE' })
    chats:Chat[];
    

   
    @OneToMany(()=>Chat, (Chat: Chat)=>Chat.receiveUser,{ onDelete: 'CASCADE' ,onUpdate: 'CASCADE' })
    chats2:Chat[];
    
}
