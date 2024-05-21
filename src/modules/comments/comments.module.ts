import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { COMMENT_REPOSITORY } from 'src/core/constants';
import { Comment } from './comments.entity';

@Module({
  controllers: [CommentsController],
  providers: [CommentsService,
    {
      provide: COMMENT_REPOSITORY,
      useValue: Comment,
    },
  ],
})
export class CommentsModule {}
