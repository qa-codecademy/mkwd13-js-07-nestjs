import { Injectable, NotFoundException } from '@nestjs/common';
import { BlogPost } from './interfaces/blog-post.interface';

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

    findAll(){
        return this.blogPosts
    }

    findById(id: string){
        const blogPost = this.blogPosts.find((blogPost) => blogPost.id === id);

        if(!blogPost){
            throw new NotFoundException(`Blog post with id: ${id} does not exist.`)
        }

        return blogPost
    }
}
