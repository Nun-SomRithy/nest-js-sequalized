import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, Request, UseGuards } from '@nestjs/common';
import { PostsService } from './posts.service';
import { Post as PostEntity } from './posts.entity';
import { AuthGuard } from '@nestjs/passport';
import { PostDto } from './dto/posts.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Post')
@Controller('posts')
export class PostsController {

    constructor (private readonly postService:PostsService ){}


    @Get()
    async findAll (){
        return await this.postService.findAll()
    }


    @Get(':id')
    async findOne(@Param('id') id: number): Promise<PostEntity> {
        // find the post with this id
        const post = await this.postService.findOne(id);

        if (!post) {
            throw new NotFoundException('This Post doesn\'t exist');
        }

        return post;
    }


    @UseGuards(AuthGuard('jwt'))
    @Post()
    async create(@Body() post: PostDto, @Request() req): Promise<PostEntity> {
        // create a new post and return the newly created post
        return await this.postService.create(post, req.user.id);
    }


    @UseGuards(AuthGuard('jwt'))
    @Put(':id')
    async update(@Param('id') id: number, @Body() post: PostDto, @Request() req): Promise<PostEntity> {
        const { numberOfAffectedRows, updatedPost } = await this.postService.updateById(id, post, req.user.id);

        if (numberOfAffectedRows === 0) {
            throw new NotFoundException('This Post doesn\'t exist');
        }

        return updatedPost;
    }

    @UseGuards(AuthGuard('jwt'))
    @Delete(':id')
    async remove(@Param('id') id: number, @Request() req){
        const deleted = await this.postService.deleteById(id,req.user.id);

        // check if user exits 

        if(deleted === 0 ){
            throw new NotFoundException('This Post doesn\'t exist');
        }

        return 'Successfully deleted';

    }

}
