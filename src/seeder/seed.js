const User = require('../schemas/users')
const Event = require('../schemas/events')

const events = require("../../data/events")


async function seedDB(){
await User.deleteMany({})
const inserted = await User.insertMany([
    {name: 'John', surname: 'Doe', email: 'j@doe.com', password: '1234'  },
    { name: 'Mary', surname: 'Doe', email: 'm@doe.com', password: '1234' },
    { name: 'Jane', surname: 'Doe', email: 'jn@doe.com', password: '1234'  },
    { name: 'James', surname: 'Doe', email: 'jm@doe.com', password: '1234'  },
    { name: 'Rene', surname: 'Doe', email: 'r@doe.com', password: '1234'  }
    ])
    console.log('Starting with new data in the database...')
}



const events = await Event.insertMany([
    ...events
])



module.exports = seedDB
