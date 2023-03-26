const User = require('../schemas/users')

async function seedDB(){
await User.deleteMany({})
const inserted = await User.insertMany([
    {name: 'John', surname: 'Doe', email: 'j@doe.com', password: '1234', isAdmin: false, created_at: Date.now() },
    { name: 'Mary', surname: 'Doe', email: 'm@doe.com', password: '1234', isAdmin: false, created_at: Date.now() , create_at: Date.now()},
    { name: 'Jane', surname: 'Doe', email: 'jn@doe.com', password: '1234', isAdmin: false, created_at: Date.now() },
    { name: 'James', surname: 'Doe', email: 'jm@doe.com', password: '1234', isAdmin: false, created_at: Date.now() },
    { name: 'Rene', surname: 'Doe', email: 'r@doe.com', password: '1234', isAdmin: false, created_at: Date.now() }
    ])
    console.log('Starting with new data in the database...')
}

module.exports = seedDB
