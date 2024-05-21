import { Inject, Injectable } from '@nestjs/common';
import { COMMENT_REPOSITORY } from 'src/core/constants';
import { CommentDto } from './dto/comments.dto';
import { Comment } from './comments.entity';
import { CpuInfo } from 'os';

@Injectable()
export class CommentsService {
constructor(@Inject(COMMENT_REPOSITORY) private readonly commentRepository: typeof Comment) {}


  async createComment(commentDto: CommentDto): Promise<Comment> {
    const { content, userId, postId } = commentDto;

    const newComment = await this.commentRepository.create({
      content,
      userId,
      postId,
    });

    return newComment;
  }
   
}
