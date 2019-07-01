import MakeComment from '../comment.maker';

export default function AddCommentMaker({ db}){
    return async function addComment(comment){
        return db.insert({
            
        })
    }
}