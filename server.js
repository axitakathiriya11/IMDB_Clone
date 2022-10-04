require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const cookieParser = require('cookie-parser');
const path = require('path');

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(fileUpload({
    useTempFiles: true
}));


// Route
app.use('/user', require('./routes/userRouter'));
app.use('/api', require('./routes/actorRouter'));
app.use('/api', require('./routes/upload'));
app.use('/api', require('./routes/movieRouter'));
// connect to mongo db

const URI = process.env.MONGODB_URL;
mongoose.connect(URI, {
    // useCreateIndex: true,
    // useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
}, err => {
    if(err) throw err;
    console.log("Connected to MongoDb");
});

if(process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
    })
}

const PORT = process.env.PORT || 5500;
app.listen(PORT, () => {
    console.log("Server is Running on Port", PORT);
});