console.log("Hello, World");
//IMPORT LIB
var express = require("express");
var bodyParser = require("body-parser"); //New version need to import
var mongojs = require("mongojs"); //Add mongodb library
var db = mongojs("auiteriskdb",["faqservice"]); //CreateDB and Table

var app = express();

//Set Express to use folder public
app.use(express.static(__dirname + '/public'));
//Set express to parse body to data
//app.use(express.bodyParser()); //OLD NODEVERSION
app.use(bodyParser());

//Send back JSON
/*Step2*/
app.get('/faqservice',function(req,res){
	/*Step2.1 -test input form*/
	/*
	var faq1 = {
		topickey: "What",
		userkey: "Aui",
	};
	var faq2 = {
		topickey: "When",
		userkey: "Unn",
	};
	var faq3 = {
		topickey: "Where",
		userkey: "Oil",
	};	
	
	var faqarray = [faq1,faq2,faq3];
	*/
	/*step2.2*/
	//var faqarray = [];

	/*step2.1 read json directly*/
	//res.json(faqarray);

	/*Step3 db query*/
	db.faqservice.find(function(err,docs){
		res.json(docs);
	});
});

/*Step3*/
app.post("/faqservice",function(req,res){
	var faq = req.body;
	console.log(faq);

	//add insert
	db.faqservice.insert(faq,function(err,doc){  //insert(obj,function(error,document that insert))
		res.json(doc); //send back data
	}); 
});

/*Step0.1 -test response server*/
/*
app.get('/',function(req,res){
	res.send('hello world');
});
*/

/*Get data*/
app.get("/faqservice/:id",function(req,res){
	var id = req.params.id;
	console.log(id);	
	db.faqservice.findOne({_id : mongojs.ObjectId(id)},function(err,doc){
		res.json(doc);	
	});
});

//Update Data
app.put("/faqservice/:id",function(req,res){
	//var id = req.params.id;
	var faq = req.body;
	console.log(faq); //console.log(req.body);	
	/*db.faqservice.findAndModify(    //ERROR
		{ _id : mongojs.ObjectId(req.body._id) },
		{ $set: {name: req.body.name} },
		function(err,doc){res.json(doc);} 
		);*/
	db.faqservice.findAndModify({
		query: { _id : mongojs.ObjectId(req.body._id) },
		update: {name: req.body.name},
		new: true,
	}, function(err,doc){
		res.json(doc); 
	});
});

/*Step4 add delete*/
app.delete("/faqservice/:id",function(req,res){
	var id = req.params.id;
	console.log(id);
	db.faqservice.remove({_id : mongojs.ObjectId(id)},function(err,doc){
		res.json(doc);
	});
});

app.listen(3000);