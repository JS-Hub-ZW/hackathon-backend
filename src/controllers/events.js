const Event = require('../schemas/events');

export async function getEvents(req, res, _next) {

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

export function createEvents(req, res, _next) {
    try {
        let event = req.body

        const newEvent = new Event(event)
        newEvent.save()

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

export async function updatedEvent(req, res, _next) {

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

export async function deleteEvent(req, res, _next) {

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