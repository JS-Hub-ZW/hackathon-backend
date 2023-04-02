var express = require('express');
const Event = require('../schemas/events');
// const  events = require('../../data/events');
var router = express.Router();

/* GET events listing. */
router.get('/:type?', async function(req, res, next) {

  let type = req.params.type
  let results = []



  if (type){
    results = await Event.find({type: type})
  }else{
    results = await Event.find({})
  }


  res.send({
    status: true,
    message: "Operation was successful",
    data: results
  });
});


/* POST events create. */
router.post('/create', function(req, res, next) {

    let event = req.body

    const newEvent = new Event(event)
    newEvent.save()
    
  
    res.send({
      status: true,
      message: "Operation was successful",
      data: newEvent
    });
  });


/* POST events update. */
router.post('/update/:id', function(req, res, next) {

    let id = req.params.id
    let result 
    
  
    res.send({
      status: true,
      message: "Operation was successful",
      data: result
    });
  });

  
  /* POST events delete. */
router.post('/delete/:id', function(req, res, next) {

    let id = req.params.id 
    let result


    res.send({
      status: true,
      message: "Operation was successful",
      data: result
    });
  });
  

module.exports = router;
