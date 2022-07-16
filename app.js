const express=require('express');
const mongoose=require('mongoose');
require('dotenv/config');
const app=express();
const bodyParser=require('body-parser');
const session = require('express-session');

const cors=require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

app.use(cors(corsOptions)) // Use this after the variable declaration

app.use(bodyParser.json());


app.use(session({
    secret: "helloAkhil",
    saveUninitialized:true,
    resave: false 
}));


//import routes
const signupRoute=require('./routes/signup');
const loginRoute=require('./routes/login');
const levelsRoute=require('./routes/levels');
const fieldsRoute=require('./routes/fields');
const subFieldsRoute=require('./routes/subFields');
const careersRoute=require('./routes/careers');
const backgroundRoute=require('./routes/background');
const countryRoute=require('./routes/countries');
const schoolRoute=require('./routes/schools');
const programsRoute=require('./routes/programs');



//routes
app.use('/signup',signupRoute);
app.use('/login',loginRoute);
app.use('/levels',levelsRoute);
app.use('/fields',fieldsRoute);
app.use('/subFields',subFieldsRoute);
app.use('/careers',careersRoute);
app.use('/background',backgroundRoute);
app.use('/countries',countryRoute);
app.use('/schools',schoolRoute);
app.use('/programs',programsRoute);


app.get('/',(req,res)=>{
res.send("Home page");
})



//DB connection
mongoose.connect(process.env.DB_CONNECTION,()=>{
    console.log("Connected to database");
})

app.listen(3000);