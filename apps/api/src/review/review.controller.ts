import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';

@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post()
  create(@Body() createReviewDto: CreateReviewDto) {
    return this.reviewService.create(createReviewDto);
  }

  @Get('vehicle/:id')
  findVehicleReviews(@Param('id') id: string) {
    return this.reviewService.findVehicleReviews(id);
  }

  @Get('user/:id')
  getReviewsForUser(@Param('id') id: string) {
    return this.reviewService.getUserReviews(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reviewService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reviewService.remove(id);
  }
}
