const mongoose = require('mongoose');
require('dotenv').config();
const uri = process.env.mongo_uri;
if (!uri) {
    console.error('MongoDB URI is not defined. Make sure to set the mongo_uri environment variable.');
    process.exit(1);
}
mongoose.connect(uri,
{
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
    console.log("Successfully connected to database!!");
});