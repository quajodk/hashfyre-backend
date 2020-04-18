const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NewsSchema = new Schema({
  title: {
    type: String,
    require: [true, 'Please provide title'],
    trim: true,
  },
  images: [String],
  source: String,
  message: String,
});

module.exports = mongoose.model('NewsMonitors', NewsSchema);
