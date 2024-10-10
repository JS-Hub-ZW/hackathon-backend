const User = require('../schemas/users')
const Event = require('../schemas/events')

const events = require("../../data/events")


async function seedDB(){
await User.deleteMany({})
const insertedUsers = await User.insertMany([
    { username: 'John', surname: 'Doe', email: 'j@doe.com', password: '1234'  },
    { username: 'Mary', surname: 'Doe', email: 'm@doe.com', password: '1234' },
    { username: 'Jane', surname: 'Doe', email: 'jn@doe.com', password: '1234'  },
    { username: 'James', surname: 'Doe', email: 'jm@doe.com', password: '1234'  },
    { username: 'Rene', surname: 'Doe', email: 'r@doe.com', password: '1234'  }
    ])
    console.log('Starting with new data in the database...')
    const insertedEvents = await Event.insertMany([
        ...events
    ])
}

module.exports = seedDB
