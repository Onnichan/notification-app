const mongoose = require('mongoose');
const {Schema} = mongoose;
const {compareSync, hashSync, genSaltSync} = require('bcryptjs');

const UserSchema = new Schema({
  username: {type: String, required: true},
  password: {type: String, required: true}
});

UserSchema.pre('save', async function(next){
  console.log(this);
});

module.exports = mongoose.model('user', UserSchema);