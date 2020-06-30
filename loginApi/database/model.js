/* eslint-disable no-unused-vars */

const mongoose = require('mongoose');
const url = require('../config/mongoConfig');

const db = process.env.db || url.MONGODB_URL;
mongoose.connect(db, { useNewUrlParser: true ,
    "auth": { "authSource": "admin" },});
mongoose.set('useCreateIndex', true);
const [database, Schema] = [mongoose.connection, mongoose.Schema];
database.on('error', console.error.bind(console, 'MongoDB connection error:'));

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return /\w+@\w+.com/.test(v);
      },
    },
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  isSeller:{
      type:Boolean,
      required:true,

  }
});

const User = mongoose.model('users', userSchema);

const bookSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
    },
  price: {
    type: Number,
    required: true,
  },
  units:{
      type:Number,
      required:true,

  }
});

const Books = mongoose.model('books', bookSchema);

const purchaseSchema = new Schema({
  bookId: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    }
});

const Purchase = mongoose.model('purchase', purchaseSchema);

module.exports = {
  User,
  Books,
  Purchase
};
