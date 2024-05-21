import { IsNotEmpty, MinLength } from "class-validator"

export class CommentDto{

    @IsNotEmpty()
    @MinLength(4)
    readonly content:string


    @IsNotEmpty()
    readonly userId: number;
    
    @IsNotEmpty()
    readonly postId : number
}