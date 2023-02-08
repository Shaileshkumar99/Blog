import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateBlogDto, UpdateBlogDto } from './dto/blog.dto';
import { Blog } from './interfaces/blog.interface';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class BlogService {
  constructor(@InjectModel('Blog') private readonly blogModel: Model<Blog>
  ) {}

  async create(createBlogDto: CreateBlogDto): Promise<Blog> {
    try {
      const createdBlog = new this.blogModel({
        title: createBlogDto.title,
        paragraph: createBlogDto.paragraph,
        username: createBlogDto.username,
        likes: createBlogDto.likes,
        createdAt: new Date().getTime(),
      });
      return await createdBlog.save();
    } catch (error) {
      throw new HttpException('Error creating blog', HttpStatus.BAD_REQUEST);
    }
  }

  async update(updateBlogDto: UpdateBlogDto, id: string): Promise<Blog> {
    try {
      const blog = await this.findblog(id);
      blog.title = updateBlogDto.title;
      blog.paragraph = updateBlogDto.paragraph;
      blog.likes = updateBlogDto.likes;
      return await blog.save();
    } catch (error) {
      throw new HttpException('Error updating blog', HttpStatus.BAD_REQUEST);
    }
  }

  async delete(id: string): Promise<any> {
    try {
      return this.blogModel.deleteOne({ "_id": id });
    } catch (error) {
      throw new HttpException('Error deleting blog', HttpStatus.BAD_REQUEST);
    }
  }

  async findblog(id: string): Promise<Blog> {
    let blog;
    try {
      blog = await this.blogModel.findById(id).exec();
      return blog || null;
    } catch (error) {
      return null;
    }
  }

  async getblog(blogId: string) {
    const blog = await this.findblog(blogId);
    if (!blog) {
      throw new NotFoundException('Could not find blog.');
    }
    return blog;
  }

  async findAll(): Promise<Blog[]> {
    return this.blogModel.find().select({__v: 0}).exec();
  }
}
