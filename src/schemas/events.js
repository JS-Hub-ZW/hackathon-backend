const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
  date: {
    type: Date,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  venue: {
    type: String,
    required: true
  },
  hosts: {
    type: [Object],
    required: true
  },
  sponsors: {
    type: [Object],
    required: true
  },
  contacts: {
    type: [Object],
    required: true
  },
  imagePortrait: {
    type: String,
    required: true
  },
  imageLandscape: {
    type: String,
    required: true
  },
  admission: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  prizes: {
    type: String,
    required: true
  }
});

const Event = mongoose.model('Event', eventSchema);

export default Event