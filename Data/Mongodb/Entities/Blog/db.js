import Id from './Id'

export default function MakeDb({ makedb }) {
    return Object.freeze({
        insert
    })

    async function insert({ id: _id = Id.makeId(), ...commentInfo }) {
        const db = await makedb();
        const result = await db.collection('comments').insertOne({ _id, ...commentInfo })
        const { _id: id, ...insertedInfo } = result.ops[0]
        return { id, ...insertedInfo }
    }
}