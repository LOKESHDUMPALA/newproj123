
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const authRouter = require('./routes/auth/auth-routes');


  mongoose.connect('mongodb+srv://lokeswararaodumpala2004:2zo7qgz34ki0S8Yc@cluster0.x7zlw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0').then( () => console.log("MongoDB connected") )
        .catch((error) => console.log(error));
const app = express();
const PORT = process.env.PORT || 4000;

app.use(
    cors(
        {
            origin: 'http://localhost:5173',
            methods: ['GET','POST','DELETE','PUT'],
            allowHeaders : [
                "Content-type",
                'Authorization',
                'Cache-Control',
                'Expires',
                'Pragma'
            ],
           credentials : true 
        })
);
app.use(cookieParser());
app.use(express.json());

app.use('/api/auth',authRouter);

app.listen(PORT,()=> console.log("Server started"));