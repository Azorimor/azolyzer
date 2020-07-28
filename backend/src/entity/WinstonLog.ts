import {Entity, PrimaryColumn, Column, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class WinstonLog {

    @PrimaryGeneratedColumn("rowid")
    _id!: number

    @Column({
        type: "timestamp"
    })
    timestamp!: Date

    @Column({
        type: "character varying"
    })
    level!: string

    @Column({
        type: "character varying"
    })
    message!: string

    @Column({
        type: "json",
        nullable: true,
    })
    meta!: JSON

    @Column({
        type: "character varying",
    })
    service!: string
}
