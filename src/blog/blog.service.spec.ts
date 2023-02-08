import { Test, TestingModule } from '@nestjs/testing';
import { BlogService } from './blog.service';
import { getModelToken } from '@nestjs/mongoose';

describe('Blogs', () => {
  let provider: BlogService;

  const mockRepository = {
    find() {
      return {};
    }
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BlogService,
        {provide: getModelToken('Blog'), useValue: mockRepository,},],
    }).compile();

    provider = module.get<BlogService>(BlogService);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
