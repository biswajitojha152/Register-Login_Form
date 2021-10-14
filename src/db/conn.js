const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/youtubeRegistration', { useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>{
    console.log('connected to database successful');
})
.catch((err)=>{
    console.log("no connection",err);
})