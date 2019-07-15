const types = new Map(['Budget Car', 40], ['Car', 50], ['Van', 60], ['Bus', 100]);

exports.calculate_Price = (type, distance) => {
    const rate = types[type];
    let price = rate * distance;

    return price;   
}