const Trip = require('../../Data/Mongodb/Entities/Taxi/trip.model');
const logger = require('../../Util/winston')

exports.book_trip_through_web = (details) => {
    let trip = new Trip(details);

    return new Promise((resolve, reject) => {
        trip.save((err) => {
            if (err) {
                logger.error(err);
                reject(err);
            }
            logger.info("Saved to database");
            resolve('Booking added');
        })
    })

}

exports.start_trip = (tripId) => {
    return new Promise((resolve, reject) => {
        Trip.findByIdAndUpdate(tripId, { status: 'Started', startDate: Date.now() }, { new: true }, (err, result) => {
            if (err) {
                logger.error(err);
                reject(err);
            }
            resolve(result.data)
        })
    })
}

exports.stop_trip = (tripId) => {
    return new Promise((resolve, reject) => {
        Trip.findByIdAndUpdate(tripId, { status: 'Completed', endDate: Date.now() }, { new: true }, (err, result) => {
            if (err) {
                logger.error(err);
                reject(err);
            }
            resolve(result.data)
        })
    })
}