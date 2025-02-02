const express = require('express');
const cors = require('cors');
const app = express();
const userRouter = require('./userApi/userRouter.js');

app.use(cors());
app.use(express.json());
app.use('/api', userRouter);

const PORT = 2000;
const mongoose = require('mongoose');

const uli = 'mongodb+srv://David:qwer1234@cluster1.ctjdu.mongodb.net/classdb?retryWrites=true&w=majority&appName=Cluster1';
const OPT = {
    serverApi:
    {
        version: '1',
        strict: true,
        deprecationErrors: true
    }
};
mongoose.connect(uli, OPT)
    .then(() => console.log("success"))
    .catch((err) => console.log(err.message))



app.listen(PORT)