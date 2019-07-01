export default function BuildComment({ Id }) {
    return function makeComment({
        author,
        createdOn = Date.now(),
        id = Id.makeId(),
        modifiedOn = Date.now(),
        postId,
        text
    } = {}) {
        if (!author)
            throw new Error('Comment must have an author')
        if (!postId)
            throw new Error('Comment must contain a postId.')
        if (!text || text.length < 1)
            throw new Error('Comment must include at least one character of text.')

        return Object.freeze({
            getAuthor: () => author,
            getCreatedOn: () => createdOn,
            getId: () => id,
            getModifiedOn: () => modifiedOn,
            getPostId: () => postId,
        })

    }
}