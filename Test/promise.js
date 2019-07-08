
const promiseString = (type) => {
    return new Promise((resolve, reject) => {
        if(type == 0){
            reject('type is 0')
        }
        resolve('Test value')

    })
}

module.exports = promiseString