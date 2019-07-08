
const AsyncString = (type, callback) => {
    if (type == 0)
        throw new TypeError('type is 0')
    
    const val = 'Test value'
    callback(null, val);
}

module.exports = AsyncString;