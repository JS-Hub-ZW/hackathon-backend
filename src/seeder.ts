// Seed using REST API calls because I am stupid
const axios = require('axios')


const createADocument = async (collection: string, data: any) => {
    axios.post(`${process.env.DB_URL}/${collection}`, data)
        .then((res: { data: any }) => console.log(res.data))
}



// Define your data here in the form of an array of objects
let hackathons = []


const createHackathons = async () => {
    for (const hackathon of hackathons){
        await createADocument('hackathons', hackathon)
    }
}


createHackathons()
    .then(() => console.log('Seeded'))


