import { Injectable, NotFoundException } from '@nestjs/common';
import { BlogPost } from './interfaces/blog-post.interface';
import { CreateBlogPostDTO } from './dto/create-blog-post.dto';
import {v4 as uuidv4} from "uuid";
import { QueryBlogPostDTO } from './dto/query-blog-post.dto';

@Injectable()
export class BlogPostService {
    private blogPosts: BlogPost[] = [
        {
            id: "1",
            title: "Getting Started with NestJS",
            content: "NestJS is a framework inspided by Angular...",
            author: "John Doe",
            tags: ["nestjs", "node", "backend"],
            createdAt: new Date('05.05.2025'),
            updatedAt: null
        },
        {
            id: "2",
            title: "Planet Earth",
            content: "Planet Earth is the only planet that has life in our solar system...",
            author: "Bob Bobski",
            tags: ["planet", "earth", "oceans"],
            createdAt: new Date('01.05.2024'),
            updatedAt: new Date('02.04.2025')
        },
        {
            id: "3",
            title: "Javascript",
            content: "Javascript is a programming language suitable for beginners...",
            author: "Lee Enderson",
            tags: ["programming", "js"],
            createdAt: new Date('01.05.2024'),
            updatedAt: null
        },
    ]

    findAll(query: QueryBlogPostDTO){
        let filteredBlogPost = [...this.blogPosts];

        // Applying the filters
        if(query.author){
            filteredBlogPost = filteredBlogPost.filter((blogPost) => blogPost.author === query.author)
        }

        if(query.title){
            filteredBlogPost = filteredBlogPost.filter((blogPost) => blogPost.title === query.title);
        }

        return filteredBlogPost
    }

    findById(id: string){
        const blogPost = this.blogPosts.find((blogPost) => blogPost.id === id);

        if(!blogPost){
            throw new NotFoundException(`Blog post with id: ${id} does not exist.`)
        }

        return blogPost
    }

    create(createBlogPostDTO: CreateBlogPostDTO){ 
        const newBlogPost: BlogPost = {
            id: uuidv4(),
            title: createBlogPostDTO.title,
            content: createBlogPostDTO.content,
            author: createBlogPostDTO.author,
            tags: createBlogPostDTO.tags,
            createdAt: new Date(),
            updatedAt: null
        }

        this.blogPosts.push(newBlogPost);

        return newBlogPost.id
    }
}
