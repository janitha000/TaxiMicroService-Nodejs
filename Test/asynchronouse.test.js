const AsyncString = require('./asynchronouse');
const expect = require('chai').expect

describe('#asyncString', () => {
    it('should return string', (done) => {
        AsyncString(1, (err, value) => {
            if (err) return done(err)

            expect(value).to.be.a('string')
            done();
        })
    })

    // it('type should not 0', (done) => {
    //     AsyncString(0, (err, result) => {
    //         if (err) {
    //             expect( function()  { throw err })
    //                 .to.throw(TypeError, 'type is 0');
    //             return done();

    //         }
    //     })
    // })
})