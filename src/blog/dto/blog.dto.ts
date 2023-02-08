import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
export class CreateBlogDto {
    @ApiProperty()
    title: string;

    @ApiProperty()
    paragraph: string;
    // @ApiPropertyOptional()

    @ApiProperty()
    username: string;

    @ApiProperty()
    likes: number;
}

export class UpdateBlogDto {
    @ApiProperty()
    title: string;

    @ApiProperty()
    paragraph: string;

    @ApiProperty()
    likes: number;
}
