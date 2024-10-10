var express = require('express');
const Event = require('../schemas/events');
// const  events = require('../../data/events');
var router = express.Router();
const { getEvents, createEvents, updatedEvent, deleteEvent } = require('../controllers/events.js');

/* GET events listing. */
router.get('/:type?', getEvents);


/* POST events create. */
router.post('/create', createEvents);


/* POST events update. */
router.post('/update/:id', updatedEvent);

  
  /* POST events delete. */
router.post('/delete/:id', deleteEvent);
  

module.exports = router;
