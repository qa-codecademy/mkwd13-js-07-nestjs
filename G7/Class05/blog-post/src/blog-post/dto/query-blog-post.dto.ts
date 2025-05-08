import { ApiProperty } from "@nestjs/swagger"
import { IsOptional, IsString } from "class-validator"

export class QueryBlogPostDTO {
    @ApiProperty({
        description: 'Filter by title (partial match)',
        required: false,
        example: 'NodeJS'
    })
    @IsOptional()
    @IsString()
    title?: string

    @ApiProperty({
        description: 'Filter by author (partial match)',
        required: false,
        example: 'John Doe'
    }
    )
    @IsOptional()
    @IsString()
    author?: string
}