const express=require('express');
const mongoose=require('mongoose');
require('dotenv/config');
const app=express();
const bodyParser=require('body-parser');

const cors=require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

app.use(cors(corsOptions)) // Use this after the variable declaration

app.use(bodyParser.json());



//import routes
const signupRoute=require('./routes/signup');
const loginRoute=require('./routes/login');


//routes
app.use('/signup',signupRoute);
app.use('/login',loginRoute);


app.get('/',(req,res)=>{
res.send("Home page");
})



//DB connection
mongoose.connect(process.env.DB_CONNECTION,()=>{
    console.log("connected to database");
})

app.listen(3000);