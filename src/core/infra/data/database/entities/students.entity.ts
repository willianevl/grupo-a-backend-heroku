import {BaseEntity, BeforeInsert, BeforeUpdate, Column, Entity, PrimaryColumn} from "typeorm";

@Entity({name: 'students'})
export class StudentEntity extends BaseEntity {
    @PrimaryColumn({name: "ra"})
    ra!: string;

    @Column({name: "name"})
    name: string;

    @Column({name: "cpf"})
    cpf: string;

    @Column({name: "email"})
    email: string;


    constructor(name: string, cpf: string, email: string){
        super();
        this.ra = ra;
        this.name = name;
        this.cpf = cpf;
        this.email = email;
    };
};
