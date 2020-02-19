var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose");

mongoose.connect("mongodb://localhost:27017/smart_city", {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

var applicationSchema = new mongoose.Schema({
    age: String,
    sex: String,
    civilStatus: String,
    fname: String,
    lname: String,
    image: String,
    status: Number,
    address: String,
    occupation: String,
    workAddress: String,
    date: String,
});

var Application = mongoose.model("application", applicationSchema);


app.get("/", function(req, res){
    res.render("application");
});

app.get("/application", function(req, res){
    Application.find({}, function(err, applications) {
        if (err) {
            console.log("Err")
            res.status(500)
            res.json("Something went wrong.")
        } else {
            res.json({
                applications,
            })
        }
    })
})
 
// app.get("application", function(req, res){
//     Application.find({}, function(err, Applications){
//         if(err){
//             console.log("Err");
//         } else {
//             res.render("application", {Applications: Applications})
//         }
//     });
// });


app.post("/application", function(req, res){
    var fname = req.body.fname;
    var lname = req.body.lname;
    var age = req.body.age;
    var sex = req.body.sex;
    var civilStatus = req.body.civilStatus;
    var address = req.body.address;
    var occupation = req.body.occupation;
    var workAddress = req.body.workAddress;
    var date = req.body.date;
    var newApplication = {
        fname: fname, 
        lname: lname, 
        age: age, 
        sex: sex, 
        civilStatus: civilStatus, 
        status: 1, 
        date: date, 
        address: address, 
        occupation: occupation, 
        workAddress: workAddress
    };
    Application.create(newApplication, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            res.json({
                application: newlyCreated
            })
        }
    });
})


app.get('/application/:id', function(req, res) {
    const id = req.params.id
    Application.findById(id, function(err, application) {
        if (err) {
            console.log(err)
        } else {
            res.json({
                application: application
            })
        }
    })
})

app.put('/application/:id', function(req, res) {
    const application = req.body

    Application.findByIdAndUpdate(req.params.id, application, {
        upsert: true
    },function(err, newApplication) {
        if (err) {
            console.log(err)
        } else {
            res.json({
                application: newApplication
            })
        }
    })
})

app.listen("3000", function(){
    console.log("running")
})
