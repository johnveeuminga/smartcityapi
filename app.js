var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose");

mongoose.connect("mongodb://localhost/smart_city", {useNewUrlParser: true, useUnifiedTopology: true});

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

var applicantSchema = new mongoose.Schema({
    age: String,
    sex: String,
    civilStatus: String,
    fname: String,
    lname: String,
    image: String,
});

var Applicant = mongoose.model("Applicant", applicantSchema);


app.get("/", function(req, res){
    res.render("application");
});

app.get("application", function(req, res){
    Applicant.find({}, function(err, applicants){
        if(err){
            console.log("Err");
        } else {
            res.render("application", {applicants: applicants})
        }
    });
});


app.post("/application", function(req, res){
    var fname = req.body.fname;
    var lname = req.body.lname;
    var age = req.body.age;
    var sex = req.body.sex;
    var civilStatus = req.body.civilStatus;
    var newApplicant = {fname: fname, lname: lname, age: age, sex: sex, civilStatus: civilStatus};
    Applicant.create(newApplicant, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            res.redirect("/");     
        }
    });
})

app.listen("3000", function(){
    console.log("running")
})
