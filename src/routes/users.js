var express = require('express');
const User = require('../schemas/users');
var router = express.Router();

/* GET users listing. */
router.get('/:id?', async function(req, res, next) {
  
  try{
    let userId = req.params.id

    if (userId){
      let user = await User.findById(userId)
      res.send({
        status: true,
        message: "Operation was successful",
        data: user
      });
    }else{
      let users = await User.find({})
      res.send({
        status: true,
        message: "Operation was successful",
        data: users
      });
    }

  }catch(error){
    res.send({
      status: false,
      message: "Operation was not successful",
      data: error
    });
  }
});


/* POST users create. */
router.post('/create', async function(req, res, next) {
  try {
    let user = req.body

    const newUser = new User(user)
    await newUser.save()

    res.send({
      status: true,
      message: "Operation was successful",
      data: newUser
    });

  }catch(error){
    res.send({
      status: false,
      message: "Operation was not successful",
      data: error
    })
  }
});

/* PUT users update. */
router.post('/update/:id', async function(req, res, next) {
  try {
    let user = req.body
    let id = req.params.id

    const updatedUser = await User.findByIdAndUpdate(id, user, {new: true})

    res.send({
      status: true,
      message: "Operation was successful",
      data: updatedUser
    });

  }catch(error){
    res.send({
      status: false,
      message: "Operation was not successful",
      data: error
    })
  }
});

/* DELETE users delete. */
router.post('/delete/:id', async function(req, res, next) {
  try {
    let id = req.params.id

    const deletedUser = await User.findByIdAndDelete(id)

    res.send({
      status: true,
      message: "Operation was successful",
      data: deletedUser
    });

  }catch(error){
    res.send({
      status: false,
      message: "Operation was not successful",
      data: error
    })
  }
});



module.exports = router;
