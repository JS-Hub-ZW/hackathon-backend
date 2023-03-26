var express = require('express');
const { default: events } = require('../../data/events');
var router = express.Router();

/* GET events listing. */
router.get('/events/:type', function(req, res, next) {

  let type = req.params.type
  let results = []

  if (type){
    results = events.filter(e => e.type == type)
  }else{
    results = events 
  }


  res.send({
    status: true,
    message: "Operation was successful",
    data: results
  });
});


/* POST events update. */
router.post('/events/update/:id', function(req, res, next) {

    let id = req.params.id
    let result 
    
  
    res.send({
      status: true,
      message: "Operation was successful",
      data: result
    });
  });

  
  /* POST events delete. */
router.post('/events/delete/:id', function(req, res, next) {

    let id = req.params.id 
    let result


    res.send({
      status: true,
      message: "Operation was successful",
      data: result
    });
  });
  

module.exports = router;
