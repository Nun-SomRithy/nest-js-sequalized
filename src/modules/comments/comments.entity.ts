import { Table ,Model, Column, DataType, ForeignKey, BelongsTo } from "sequelize-typescript";
import { User } from "../user/user.entity";
import { Post } from "../posts/posts.entity";


@Table
export class Comment extends Model<Comment>{

    @Column({type:DataType.STRING,allowNull:false})
    content:string

    @ForeignKey(()=> User)
    @Column({type:DataType.INTEGER, allowNull:false})
    userId: number
    

    @ForeignKey(() => Post)
    @Column({type: DataType.INTEGER, allowNull:false})
    postId: number

    @BelongsTo(() =>  User)
    user: User


    @BelongsTo(() => Post)
    post: Post

}