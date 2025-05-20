import { Blog } from 'src/blog/entities/blog.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: 'text' })
  content: string;

  // Many-To-One : Many posts can be part of one blog
  @ManyToOne(() => Blog, (blog) => blog.posts, {
    onDelete: 'CASCADE', // If a blog is deleted, the posts belonging to that blog are going to be removed.
  })
  // NOTE: @JoinColumn is used in the table that is owner of the relationship. If we do not specifically define it, it is going to be created under the hood (by default).
  //   @JoinColumn({ name: 'blogId' }) // the owner of the relationship holds the foreign_key
  blog: Blog;

  //   @Column()
  //   blogId: number;

  @CreateDateColumn()
  createdAt: Date;

  @CreateDateColumn()
  updatedAt: Date;
}
