const express = require('express')

const { getAllBooking, createBooking, findBookingById, deleteBooking } = require('../controllers/booking.controller');
const { restricGuard } = require('../guard/restric.guard');

const BookingRouter = express.Router();

BookingRouter.route("/")
    .get(restricGuard("admin", "staff"), getAllBooking)
    .post(restricGuard("admin"), createBooking)

BookingRouter.route('/:id')
    .get(restricGuard("admin", "staff"), findBookingById)
    .delete(restricGuard("admin" , "staff"), deleteBooking)
module.exports = BookingRouter