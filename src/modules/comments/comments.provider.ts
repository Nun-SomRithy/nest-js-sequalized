import { COMMENT_REPOSITORY } from "src/core/constants";


export const postsProviders = [{
    provide:COMMENT_REPOSITORY,
    useValue: Comment
}]