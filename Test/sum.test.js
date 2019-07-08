const expect = require('chai').expect
const sum = require('./sum')

describe('#sum()', () => {
    context('without arguments', () => {
        it('should return 0', () => {
            expect(sum()).to.equal(0);
        })
    })

    context('with number arguments', () => {
        it('should return sum of arguments', () => {
            expect(sum(1,2,3,4,5)).to.equal(15)
        })
    })

    context('with non-number arguments', () => {
        it('should throw error', () => {
            expect(() => {
                sum(1,2,3,'4', 5)
            }).to.throw(TypeError, 'sum() expects only numbers')
        })
    })
})