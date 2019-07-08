
const asyncMessage = (type) => {
    if(type == 0)
        throw new Error('type is 0')
    
    return 'Test Value'
}

module.exports = asyncMessage;