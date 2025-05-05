import { Injectable } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';

@Injectable()
export class ReviewService {
  create(createReviewDto: CreateReviewDto) {
    return 'This action adds a new review';
  }

  findAll() {
    return `This action returns all review`;
  }

  findOne(id: number) {
    return `This action returns a #${id} review`;
  }

  remove(id: number) {
    return `This action removes a #${id} review`;
  }
}
