const express = require('express');
const app = express();
const port = 1988;

var Mongodb = require('mongodb');
var MongoClients = Mongodb.MongoClient;
var url = "mongodb+srv://Aristeidis:50dcb877@cluster0.kg7sp.mongodb.net/BlogAppDB";



app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.set('view engine', 'ejs');


app.use(express.static(__dirname + '/public'));



//send data to page//
app.get('/', function(req, res){
    MongoClients.connect(url,function(err,db){
        if(err) throw err;
        var dbo = db.db("BlogAppDB");
    dbo.collection("sports").find({}).toArray(function(err, sports) {
        if (err) throw err;
      dbo.collection("arts").find({}).toArray(function(err, arts) {
          if (err) throw err;
          dbo.collection("politics").find({}).toArray(function(err, politics) {
            if (err) throw err;
            dbo.collection("funnys").find({}).toArray(function(err, funnys) {
                if (err) throw err;
    
      res.render('index', {
        sports : sports,
        arts : arts,
        politics : politics,
        funnys : funnys
      })
    })
    })
})})})})






    

//open add page//
app.get('/add', function(req, res){
    res.render('AddPage');
})

app.get('/addart', function(req, res){
    res.render('addartpage');
})

app.get('/addpolitic', function(req, res){
    res.render('addpoliticpage');
})

app.get('/addfunny', function(req, res){
    res.render('addfunnypage');
})







//send data to database//
app.post('/add',function(req,res){
    var {title} = req.body;
    var {author} = req.body;
    var {desc} = req.body;
    var {pic} = req.body;
    date = (new Date).toLocaleDateString();
    key = Date.now();
    MongoClients.connect(url,function(err,db){
        if(err)throw err;
        var dbo = db.db("BlogAppDB");
        var myObj = {"title" : title, "author" : author, "desc":desc,"pic" : pic, date , "key": key }
 dbo.collection('sports').insertOne(myObj,function(err,response){
    if(err) throw err;
    db.close();
    res.redirect('/');
})
})
})


app.post('/addart',function(req,res){
    var {title} = req.body;
    var {author} = req.body;
    var {desc} = req.body;
    var {pic} = req.body;
    date = (new Date).toLocaleDateString();
    key = Date.now();
    MongoClients.connect(url,function(err,db){
        if(err)throw err;
        var dbo = db.db("BlogAppDB");
        var myObj = {"title" : title, "author" : author, "desc":desc,"pic" : pic, date , key }
 dbo.collection('arts').insertOne(myObj,function(err,response){
    if(err) throw err;
    db.close();
    res.redirect('/');
})
})
})

app.post('/addpolitic',function(req,res){
    var {title} = req.body;
    var {author} = req.body;
    var {desc} = req.body;
    var {pic} = req.body;
    date = (new Date).toLocaleDateString();
    key = Date.now();
    MongoClients.connect(url,function(err,db){
        if(err)throw err;
        var dbo = db.db("BlogAppDB");
        var myObj = {"title" : title, "author" : author, "desc":desc,"pic" : pic, date , key }
 dbo.collection('politics').insertOne(myObj,function(err,response){
    if(err) throw err;
    db.close();
    res.redirect('/');
})
})
})

app.post('/addfunny',function(req,res){
    var {title} = req.body;
    var {author} = req.body;
    var {desc} = req.body;
    var {pic} = req.body;
    date = (new Date).toLocaleDateString();
    key = Date.now();
    MongoClients.connect(url,function(err,db){
        if(err)throw err;
        var dbo = db.db("BlogAppDB");
        var myObj = {"title" : title, "author" : author, "desc":desc,"pic" : pic, date , key }
 dbo.collection('funnys').insertOne(myObj,function(err,response){
    if(err) throw err;
    db.close();
    res.redirect('/');
})
})
})







//delete article//
app.post('/deletesport', function(req, res){
    MongoClients.connect(url,function(err,db){
        if(err) throw err;
        var dbo = db.db("BlogAppDB");
    var {del} = req.body;
    var ChosenKey = Number(del);
    dbo.collection('sports').findOneAndDelete({"key": ChosenKey}, function(err){
        if(err) throw err;
        res.redirect('/');
    })    
})})


app.post('/deleteart', function(req, res){
    MongoClients.connect(url,function(err,db){
        if(err) throw err;
        var dbo = db.db("BlogAppDB");
    var {del} = req.body;
    var ChosenKey = Number(del);
    dbo.collection('arts').findOneAndDelete({"key": ChosenKey}, function(err){
        if(err) throw err;
        res.redirect('/');
    })    
})})


app.post('/deletepolitic', function(req, res){
    MongoClients.connect(url,function(err,db){
        if(err) throw err;
        var dbo = db.db("BlogAppDB");
    var {del} = req.body;
    var ChosenKey = Number(del);
    dbo.collection('politics').findOneAndDelete({"key": ChosenKey}, function(err){
        if(err) throw err;
        res.redirect('/');
    })    
})})


app.post('/deletefunny', function(req, res){
    MongoClients.connect(url,function(err,db){
        if(err) throw err;
        var dbo = db.db("BlogAppDB");
    var {del} = req.body;
    var ChosenKey = Number(del);
    dbo.collection('funnys').findOneAndDelete({"key": ChosenKey}, function(err){
        if(err) throw err;
        res.redirect('/');
    })    
})})



//open category page//
app.get('/allsports', function(req, res){
    MongoClients.connect(url,function(err,db){
        if(err) throw err;
        var dbo = db.db("BlogAppDB");
    dbo.collection("sports").find({}).toArray(function(err, sports) {
        if (err) throw err;
    res.render('sports',{sports : sports});
})})})


app.get('/allarts', function(req, res){
    MongoClients.connect(url,function(err,db){
        if(err) throw err;
        var dbo = db.db("BlogAppDB");
    dbo.collection("arts").find({}).toArray(function(err, arts) {
        if (err) throw err;
    res.render('arts',{arts : arts});
})})})


app.get('/allpolitics', function(req, res){
    MongoClients.connect(url,function(err,db){
        if(err) throw err;
        var dbo = db.db("BlogAppDB");
    dbo.collection("politics").find({}).toArray(function(err, politics) {
        if (err) throw err;
    res.render('politic',{politics : politics});
})})})


app.get('/allpolitics', function(req, res){
    MongoClients.connect(url,function(err,db){
        if(err) throw err;
        var dbo = db.db("BlogAppDB");
    dbo.collection("politics").find({}).toArray(function(err, politics) {
        if (err) throw err;
    res.render('politic',{politics : politics});
})})})


app.get('/allfunnys', function(req, res){
    MongoClients.connect(url,function(err,db){
        if(err) throw err;
        var dbo = db.db("BlogAppDB");
    dbo.collection("funnys").find({}).toArray(function(err, funnys) {
        if (err) throw err;
    res.render('funny',{funnys : funnys});
})})})










//view article//
app.get('/post/:salma', function(req, res){
    MongoClients.connect(url,function(err,db){
    if(err) throw err;
        var dbo = db.db("BlogAppDB");
    var del = req.params.salma;
    var ChosenKey = Number(del);
    dbo.collection("sports").findOne({"key": ChosenKey}, function(err, sports){
        if(err) throw err;
        res.render('view', {sports: sports});
        })
})})


app.get('/postart/:salma', function(req, res){
    MongoClients.connect(url,function(err,db){
    if(err) throw err;
        var dbo = db.db("BlogAppDB");
    var del = req.params.salma;
    var ChosenKey = Number(del);
    dbo.collection("arts").findOne({"key": ChosenKey}, function(err, arts){
        if(err) throw err;
        res.render('viewarts', {arts : arts});
        })
})})


app.get('/postpolitic/:salma', function(req, res){
    MongoClients.connect(url,function(err,db){
    if(err) throw err;
        var dbo = db.db("BlogAppDB");
    var del = req.params.salma;
    var ChosenKey = Number(del);
    dbo.collection("politics").findOne({"key": ChosenKey}, function(err, politics){
        if(err) throw err;
        res.render('viewpolitics', {politics : politics});
        })
})})


app.get('/postfunny/:salma', function(req, res){
    MongoClients.connect(url,function(err,db){
    if(err) throw err;
        var dbo = db.db("BlogAppDB");
    var del = req.params.salma;
    var ChosenKey = Number(del);
    dbo.collection("funnys").findOne({"key": ChosenKey}, function(err, funnys){
        if(err) throw err;
        res.render('viewfunnys', {funnys : funnys});
        })
})})




//open editpage article//
app.get('/edit/:salma', function(req, res){
    var del = req.params.salma;
    var ChosenKey = Number(del);
    MongoClients.connect(url,function(err,db){
        if(err) throw err;
            var dbo = db.db("BlogAppDB");
            dbo.collection("sports").findOne({"key": ChosenKey}, function(err, sports){
                if(err) throw err;
                dbo.collection('sports').findOneAndDelete({"key": ChosenKey}, function(err){
                    if(err) throw err;
               res.render('editpage', {sports : sports})
                        })})})})


app.get('/editart/:salma', function(req, res){
var del = req.params.salma;
var ChosenKey = Number(del);
MongoClients.connect(url,function(err,db){
if(err) throw err;
var dbo = db.db("BlogAppDB");
dbo.collection("arts").findOne({"key": ChosenKey}, function(err, arts){
if(err) throw err;
dbo.collection('arts').findOneAndDelete({"key": ChosenKey}, function(err){
    if(err) throw err;
res.render('editpageart', {arts : arts})
})})})})


app.get('/editpolitic/:salma', function(req, res){
    var del = req.params.salma;
    var ChosenKey = Number(del);
    MongoClients.connect(url,function(err,db){
        if(err) throw err;
            var dbo = db.db("BlogAppDB");
            dbo.collection("politics").findOne({"key": ChosenKey}, function(err, politics){
                if(err) throw err;
                dbo.collection('politics').findOneAndDelete({"key": ChosenKey}, function(err){
                    if(err) throw err;
               res.render('editpagepolitic', {politics : politics})
                        })})})})


                        app.get('/editfunny/:salma', function(req, res){
                            var del = req.params.salma;
                            var ChosenKey = Number(del);
                            MongoClients.connect(url,function(err,db){
                                if(err) throw err;
                                    var dbo = db.db("BlogAppDB");
                                    dbo.collection("funnys").findOne({"key": ChosenKey}, function(err, funnys){
                                        if(err) throw err;
                                        dbo.collection('funnys').findOneAndDelete({"key": ChosenKey}, function(err){
                                            if(err) throw err;
                                       res.render('editpagefunny', {funnys : funnys})
                                                })})})})



//REsend data to database//
app.post('/postEdit',function(req,res){
    var {title} = req.body;
    var {author} = req.body;
    var {desc} = req.body;
    var {pic} = req.body;
    date = (new Date).toLocaleDateString();
    key = Date.now();
    MongoClients.connect(url,function(err,db){
        if(err)throw err;
        var dbo = db.db("BlogAppDB");
        var myObj = {"title" : title, "author" : author, "desc":desc, "pic" : pic, date , "key": key }
 dbo.collection('sports').insertOne(myObj,function(err,response){
    if(err) throw err;
db.close();
    res.redirect('/');
})
})
})

app.post('/postEditart',function(req,res){
    var {title} = req.body;
    var {author} = req.body;
    var {desc} = req.body;
    var {pic} = req.body;
    date = (new Date).toLocaleDateString();
    key = Date.now();
    MongoClients.connect(url,function(err,db){
        if(err)throw err;
        var dbo = db.db("BlogAppDB");
        var myObj = {"title" : title, "author" : author, "desc":desc, "pic" : pic, date , "key": key }
 dbo.collection('arts').insertOne(myObj,function(err,response){
    if(err) throw err;
db.close();
    res.redirect('/');
})
})
})



app.post('/postEditpolitic',function(req,res){
    var {title} = req.body;
    var {author} = req.body;
    var {desc} = req.body;
    var {pic} = req.body;
    date = (new Date).toLocaleDateString();
    key = Date.now();
    MongoClients.connect(url,function(err,db){
        if(err)throw err;
        var dbo = db.db("BlogAppDB");
        var myObj = {"title" : title, "author" : author, "desc":desc, "pic" : pic, date , "key": key }
 dbo.collection('politics').insertOne(myObj,function(err,response){
    if(err) throw err;
db.close();
    res.redirect('/');
})
})
})



app.post('/postEditfunny',function(req,res){
    var {title} = req.body;
    var {author} = req.body;
    var {desc} = req.body;
    var {pic} = req.body;
    date = (new Date).toLocaleDateString();
    key = Date.now();
    MongoClients.connect(url,function(err,db){
        if(err)throw err;
        var dbo = db.db("BlogAppDB");
        var myObj = {"title" : title, "author" : author, "desc":desc, "pic" : pic, date , "key": key }
 dbo.collection('funnys').insertOne(myObj,function(err,response){
    if(err) throw err;
db.close();
    res.redirect('/');
})
})
})
                                            















app.listen(port, function(){
    console.log("Server is up and running on port " + port)
})