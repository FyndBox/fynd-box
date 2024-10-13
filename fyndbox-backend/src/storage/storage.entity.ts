import { Box } from '../box/box.entity';
import { User } from '../user/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  OneToMany,
} from 'typeorm';

@Entity()
export class Storage {
  @PrimaryGeneratedColumn('uuid')
  id: string;

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

  @Column({ type: 'uuid' })
  userId: string; // Explicit foreign key column to store the userId for efficient querying

  @OneToMany(() => Box, (box) => box.storage)
  boxes: Box[]; // A storage can have multiple boxes

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
