const mongoose = require('mongoose');

const contactSchema = mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  emailAddress: { type : String, required: true }
});

module.exports = mongoose.model('Contact', contactSchema);