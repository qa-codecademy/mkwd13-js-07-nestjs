import { Post } from 'src/post/entity/post.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Blog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true, type: 'text' })
  description: string;

  @Column()
  author: string;

  //One-to-many One blog can many posts
  @OneToMany(() => Post, (post) => post.blog)
  posts: Post[];

  @CreateDateColumn({ default: new Date() })
  createdAt: Date;

  @CreateDateColumn({ nullable: true })
  updatedAt: Date;
}
