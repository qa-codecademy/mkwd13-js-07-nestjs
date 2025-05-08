import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { BlogPostService } from './blog-post.service';
import { CreateBlogPostDTO } from './dto/create-blog-post.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from "@nestjs/swagger";
import { EventLoggerService } from 'src/common/event-logger.service';
import { QueryBlogPostDTO } from './dto/query-blog-post.dto';

@Controller('blog-post')
export class BlogPostController {

    // private blogpostService = new BlogPostService() 

    // WE HAVE INJECTED THE BlogPostService inside the BlogPostController
    constructor(private blogpostService: BlogPostService, private eventLogger: EventLoggerService){}


    @ApiOperation({ summary: "Get all blog posts."})
    @ApiResponse({
        status: 200,
        description: 'Returns all blog posts.'
    })
    // localhost:3000/blog-post
    @Get()
    findAll(@Query() query: QueryBlogPostDTO){
        return this.blogpostService.findAll(query)
    }

    @ApiOperation({ summary: "Get blog post by id."})
    @ApiResponse({
        status: 200,
        description: 'Returns blog post by id.'
    })
    @ApiParam({ name: 'id', description: 'The id of the blog post we search.' })
    @Get(':id')
    findById(@Param('id') id: string){
        // req.body.params.id === @Param('id') id: string
        return this.blogpostService.findById(id);
    }

    @ApiOperation({ summary: "Create new blog post."})
    @ApiResponse({
        status: 201,
        description: 'Returns the id of the newly created blog post.'
    })
    @ApiBody({ type: CreateBlogPostDTO})
    @Post()
    create(@Body() createBlogPostDTO: CreateBlogPostDTO){
        this.eventLogger.log('INFO', `-- Step 1: Creating new blog post with params: ${createBlogPostDTO}`);
        const blogPostId = this.blogpostService.create(createBlogPostDTO);
        this.eventLogger.log('INFO', `-- Step 2: Blog post created: ${blogPostId}`);

        return {id: blogPostId}
    }
}
