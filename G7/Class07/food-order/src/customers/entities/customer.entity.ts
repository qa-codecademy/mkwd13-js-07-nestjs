import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Customer {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column({ unique: true })
    email: string

    @Column({ nullable: true })
    phone: string

    @Column({ nullable: true })
    address: string
    // orders: [] // array of orders
}