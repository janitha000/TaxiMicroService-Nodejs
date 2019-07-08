const promiseString = require('./promise')
const expect = require('chai').expect

describe('#promiseString()', () => {
    context('with type 1', () => {
        it('Should return string', () => {
            return promiseString(1).then((result) => {
                expect(result).to.be.a('string')
            })
        })
    })

    context('with type 0', () => {
        it('should return error', function ()  {
            return this.skip();

            return promiseString(0).catch((err) => {
                expect(() => {throw err}).to.throw('type is 0')
            })
        })
    })
})