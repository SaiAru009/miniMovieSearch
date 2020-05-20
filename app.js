var express=require("express");
var app=express();
var items = require("request");

app.set("view engine","ejs");
app.use(express.static('public'));
app.get("/",function(req,res){
	res.render("home");
});

app.get("/results",function(req,res){
	// console.log(req.query);
	var pref = req.query.pref;
	var url="http://www.omdbapi.com/?" + pref + "=" + req.query.mov;
items(url,function(error,response,body) {
  if(!error && response.statusCode==200){
	  var results = JSON.parse(body);
	  if(pref=="s")
       res.render("searched",{results:results.Search}); //Renders "Search by Name" template.
	  else
       res.render("searchedt",{results:results}); } //Renders "Search by Title" template.
  })
})
var port= process.env.PORT||3000;
app.listen(port,function(){
	console.log("Server has started");
})