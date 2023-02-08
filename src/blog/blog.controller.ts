import { ApiCreatedResponse, ApiParam} from '@nestjs/swagger';
import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreateBlogDto, UpdateBlogDto } from './dto/blog.dto';
import { Blog } from './interfaces/blog.interface';

@Controller('blog')
export class BlogController {

  constructor(private readonly blogService: BlogService) {}

  @Post()
   @ApiCreatedResponse({ description: 'Created Succesfully' })
  async create(@Body() createBlogDto: CreateBlogDto) {
    await this.blogService.create(createBlogDto);
  }

  @Get()
  async findAll(): Promise<Blog[]> {
    return this.blogService.findAll();
  }

  @Patch('/:id')
  @ApiParam({
    name: 'id',
  })
  async update(@Body() updateBlogDto: UpdateBlogDto,
               @Param('id') id) {
      return await this.blogService.update(updateBlogDto, id);
  }

  @Delete('/:id')
  @ApiParam({
    name: 'id',
  })
  async delete(@Param('id') id) {
    await this.blogService.delete(id);
  }

}
