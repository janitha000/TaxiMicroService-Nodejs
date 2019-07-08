const asyncMessage = require('./aync')
const expect = require('chai').expect

describe('#ayncAwait', () => {
    context('with string', () => {
        it('should return string', async () => {
            const val = await asyncMessage(1)
            expect(val).to.be.a('string')
        })
    })

    context('with type 0', () => {
        it('should return error', async function ()  {
            return this.skip();
            await asyncMessage(0).catch((err) => {
                expect(function()  { throw err}).to.throw(Error, 'type is 0')
            })
        })
    })
})