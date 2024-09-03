import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id:string;

  @Column({ type: 'varchar', length: 128 , nullable: false })
  title: string;

  @Column({ type: 'text', nullable: false })
  description: string;

  @Column({ type: 'varchar', length: 64 , nullable: false, default: 'PENDING' })
  status: string;

  @CreateDateColumn()
  createdAt: Date;
}
