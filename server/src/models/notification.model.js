const mongoose = require('mongoose');
const {Schema} = mongoose;

const NotificationSchema = new Schema({
  message: {type: String, required: true},
  type: {type: String, required: true},
});

NotificationSchema.pre('save', async function(next){
  console.log(this);
});

module.exports = mongoose.model('notification', UserSchema);