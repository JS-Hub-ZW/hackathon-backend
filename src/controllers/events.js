const Event = require('../schemas/events');

const getEvents = async function (req, res, _next) {

    try {
        let type = req.params.type
        let results = []
        if (type) {
            results = await Event.find({ type: type })
        } else {
            results = await Event.find({})
        }
        res.send({
            status: true,
            message: "Operation was successful",
            data: results
        });
    } catch (error) {
        res.send({
            status: false,
            message: "Operation was not successful",
            data: error
        });
    }
}

const createEvents = async function (req, res, _next) {
    try {
        let event = req.body

        const newEvent = new Event(event)
        await newEvent.save()

        res.send({
            status: true,
            message: "Operation was successful",
            data: newEvent
        });

    } catch (error) {
        res.send({
            status: false,
            message: "Operation was not successful",
            data: error
        })
    }
}

const updatedEvent = async function (req, res, _next) {

    try {
        let eventId = req.params.id
        let eventData = req.body

        const updatedEvent = await Event.findByIdAndUpdate(eventId, eventData, { new: true });
        res.send({
            status: true,
            message: "Operation was successful",
            data: updatedEvent
        });
    } catch (error) {
        res.send({
            status: false,
            message: "Operation was not successful",
            data: error
        })
    }
}

const deleteEvent = async function (req, res, _next) {

    try {
        let eventId = req.params.id

        const deletedEvent = await Event.findByIdAndDelete(eventId)
        res.send({
            status: true,
            message: "Operation was successful",
            data: deletedEvent
        });
    } catch (error) {
        res.send({
            status: false,
            message: "Operation was not successful",
            data: error
        })
    }
}

module.exports = {getEvents, createEvents, updatedEvent, deleteEvent};