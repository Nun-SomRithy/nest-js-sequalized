import { Body, Controller, Inject, Param, Post, Request, UseGuards } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentDto } from './dto/comments.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Comment')
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}


  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@Body() commentDto: CommentDto) {
    const createdComment = await this.commentsService.createComment(commentDto);
    return createdComment;
  }
}
