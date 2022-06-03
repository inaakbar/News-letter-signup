var express=require("express");
const bodyParser=require("body-parser");
const request=require("request");
const https= require("HTTPS");
const { dirname } = require("path");

var app=express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/",function(req,res){
   res.sendFile(__dirname+"/index.html");

});
 app.post("/",function(req,res){
     const firstName =req.body.firstname;
     const lastName= req.body.lastName;
     const email= req.body.email;

     var data={
         members:[
           {  email_address: email,
             status: "subscribed",
             merge_fields: {
                 FNAME: firstName,
                 LNAME: lastName
             }

     }]
     };
     const jsonData=JSON.stringify(data);
     const url="https://us8.api.mailchimp.com/3.0/lists/66c2cffd44";
     const options={
         method: "POST",
         auth: "ina1:e2c8bcb74d8ab290537afb06465f96cb-us8"
     }
     const request=https.request(url,options,function(response ){
         if(response.statusCode===200){
             res.sendFile(__dirname+"/success.html");
         }else{
             res.sendFile(__dirname+"/failure.html");
         }



     response.on("data",function(data){
         console.log(JSON.parse(data));
     })
     })
request.write(jsonData);
request.end();
 });

app.post("/failure",function(req,res){
    res.redirect("/");
})

app.listen(process.env.PORT||3000,function(){
console.log("server is running on port 3000");
});
//Api key
//e2c8bcb74d8ab290537afb06465f96cb-us8

//list id
//66c2cffd44
//66c2cffd44