import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { User } from "src/modules/user/user.entity";
import { Comment } from "../comments/comments.entity";

@Table
export class Post extends Model<Post>{

@Column({type:DataType.STRING,allowNull:false})
title:string

@Column({type: DataType.STRING,allowNull:false})
description:string

@ForeignKey(() => User)
@Column({type:DataType.INTEGER, allowNull:false}) 
userId: number

@BelongsTo(() => User)
user:User

@HasMany(() => Comment)
comments: Comment[];

}
