const express=require("express");
// simply we are importing express from express.
// Node js use a lage code to create server. but using express we create server very easily.
const app=express();
// THIS means we are using express in app;
// app.use(express.json());  // this ia just a middle-were
const cors = require('cors')
const authroute=require("./router/auth-router");
// imported authrouter.
const contactroute=require("./router/contact-router");
const serviceRoute=require("./router/service-router");
const adminRoute=require("./router/admin-router");



const dotenv=require('dotenv');
const connectDb = require("./utils/db");
const User = require("./model/user-model");
const errorMiddlewere = require("./middlewere/error-middlewere");
const { route } = require("./router/auth-router");




// app.get("/",(req,res)=>{
//     // console.log(req.body);
//     res.status(200).send("welcome to mern series");
// });
// The app.get() method specifies a callback function that will be invoked whenever there is an HTTP GET request with a path ( '/' ) relative to the site root. The callback function takes a request and a response object as arguments, and calls send() on the response to return the string "string".
// get request can easily be checked on writing path on window. But post type of request cannot be easily send through chrome URL. 
// For post request we require a fronted , by using which we send a request to server. And then server response on that.
// One more way is that we can send request to server by using postman without using frontend.
// app.get("/registar",(req,res)=>{
//     res.status(200).send("welcome to mern series registar page");
// });
dotenv.config();
// connectDb();

// Let`s tackle cors.
var corsOptions = {
    origin: 'http://localhost:5173',
    // optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
    methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
    credentials: true,
} 

// UNCONDITIONAL MIDDLE-WARE
// it will automatically.
app.use(cors(corsOptions));
app.use(express.json());
app.use(errorMiddlewere);
// this is used as a middleware , which helps to run json file easily without any problem. Otherwise req.body cannot be run properly without using this above package. now we can use json in this file. it should be written at begining i.e. before router to ensure it is available for all other subsequent route handler. it parse the incoming request body with the json payloads.

// CONDITIONAL MIDDLE-WARE.
// here this will call only if initial path like "/api/data" is available then only call serviceRoute.
app.use("/api/auth",authroute);
app.use("/api/form",contactroute);
app.use("/api/data",serviceRoute);
app.use("/api/admin",adminRoute);



const PORT=500;
connectDb().then(()=>{
    app.listen(PORT,(req,res)=>{
        console.log(`server is running at ${PORT}`);
    });
})

// const fun=async()=>{
//     const data=await User.find({});
//     console.log(data);
// }
// fun();

// LISTEN 
// listen() in Express is like telling your app to start listening for visitors on a specific address and port.
