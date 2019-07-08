module.exports = function ()  {

    var args = Array.prototype.slice.call(arguments);
    
    if (!args.every(Number.isFinite)) {
      throw new TypeError('sum() expects only numbers.')
    }
    
    // Return the sum of the arguments
    return args.reduce((a, b) => {
      return a + b
    }, 0);
    
  }