import { IsNotEmpty, IsString, IsOptional, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBlogPostDTO {
    @ApiProperty({
        description: "The title of the blog post.",
        example: "Dummy blog post.",
        minLength: 5,
        maxLength: 100
    })
    @IsNotEmpty()
    @IsString()
    @MinLength(5)
    @MaxLength(100)
    title: string

    @ApiProperty({
        description: "The content of the blog post.",
        example: "Dummy content for the blog post.",
        minLength: 10
    })
    @IsNotEmpty()
    @IsString()
    @MinLength(10)
    content: string

    @ApiProperty({
        description: "The author of the blog post.",
        example: "John Doe",
        required: false
    })
    @IsString()
    @IsOptional()
    author?: string

    @ApiProperty({
        description: "Tags in the blog post.",
        example: ['technology', 'programming'],
        required: false,
        type: [String]
    })
    @IsOptional()
    @IsString({ each: true }) // check each element inside tags to be a string
    tags?: string[]

}