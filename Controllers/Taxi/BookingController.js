const bookingService = require('../../Services/Taxi/BookingService');

exports.book_through_web = async (req, res) => {
    const trip = req.body
    try {
        let result = await bookingService.book_trip_through_web(trip)
        res.send(result);

    }
    catch (err) {
        res.status(500).send(err);
    }
}

exports.start_trip = async (req, res) => {
    const tripId = req.params.tripId;
    if (tripId) {
        try {
            let result = await bookingService.start_trip(tripId);
            res.send(result);
        } catch (err) {
            res.status(500).send(err);
        }
    }
    else {
        res.send('Empty trip id');
    }
}

exports.complete_trip = async (req, res) => {
    const tripId = req.params.tripId;
    if (tripId) {
        try {
            let result = await bookingService.stop_trip(tripId);
            res.send(result);
        } catch (err) {
            res.status(500).send(err);
        }
    }
    else {
        res.send('Empty trip id');
    }
}