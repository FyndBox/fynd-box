import { User } from '../user/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Storage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ nullable: true })
  image: string; // This stores the image as a URL or path

  // Foreign key relation to the User entity
  @ManyToOne(() => User, (user) => user.storages, {
    onDelete: 'CASCADE',
    eager: true,
  })
  @JoinColumn({ name: 'userId' }) // Explicitly set the foreign key column name
  user: User;

  @Column()
  userId: number; // Explicit foreign key column to store the userId for efficient querying

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
