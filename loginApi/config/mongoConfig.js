const MONGODB_URL=  'mongodb://mocadmin:mocadmin@139.59.35.239:27017/moodcafe';

module.exports={
    MONGODB_URL,
};

// mongoose.connect(mongoDB, { useNewUrlParser: true });

// //Get the default connection
// var db = mongoose.connection;

// //Bind connection to error event (to get notification of connection errors)
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));