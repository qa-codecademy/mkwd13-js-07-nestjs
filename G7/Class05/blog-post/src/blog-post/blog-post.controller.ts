import { Controller, Get, Param } from '@nestjs/common';
import { BlogPostService } from './blog-post.service';

@Controller('blog-post')
export class BlogPostController {

    // private blogpostService = new BlogPostService() 

    // WE HAVE INJECTED THE BlogPostService inside the BlogPostController
    constructor(private blogpostService: BlogPostService){}


    // localhost:3000/blog-post
    @Get()
    findAll(){
        return this.blogpostService.findAll()
    }

    @Get(':id')
    findById(@Param('id') id: string){
        // req.body.params.id === @Param('id') id: string
        return this.blogpostService.findById(id);
    }

}
