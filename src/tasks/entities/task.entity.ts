import { TaskStatusEnum } from 'src/enums/task-status.enum';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 128, nullable: false })
  title: string;

  @Column({ type: 'text', nullable: false })
  description: string;

  @Column({
    type: 'enum',
    nullable: false,
    default: TaskStatusEnum.PENDING,
    enum: TaskStatusEnum,
  })
  status: TaskStatusEnum;

  @CreateDateColumn()
  createdAt: Date;
}
