const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static(__dirname + "/public"));

mongoose.connect("mongodb://0.0.0.0:27017/surveyUsersDB");

const userSchema = new mongoose.Schema({
  First_Name : {
    type : String,
    required : true,
    trim : true
  },
  Last_Name : {
    type : String,
    required : true,
    trim : true
  },
  Email_Address : {
    type : String,
    required : true,
    trim : true
  },
  DateOfBirth : {
    type : Date,
    required : true,
  },
  City : {
    type : String,
    required : true,
    trim : true
  },
  State : {
    type : String,
    required : true,
    trim : true
  },
  Country : {
    type : String,
    required : true,
    trim : true
  },
  Highest_Education : {
    type : String,
    required : true
  },
  Job_Title : {
    type : String,
    required : true
  },
  Job_Description : {
    type : String,
    required : true,
    trim : true
  },
  Income_Level : {
    type : Number
  },
  Marital_Status : {
    type : String,
    required : true,
    trim : true
  },
  No_Of_Children : {
    type : Number
  },
  Single_Parent : {
    type : String
  },
  Interests : {
    type : String,
    required : true,
    trim : true
  },
  Hobbies : {
    type : String,
    required : true,
    trim : true
  },
  Mental_Issues : {
    type : String,
    required : true,
    trim : true
  },
  Physical_Issues: {
    type : String,
    required : true,
    trim : true
  },
  Social_Problems : {
    type : String,
    required : true,
    trim : true
  },
  Preferred_Survey_Types:{
    type : String,
    required : true,
    trim : true
  },
  Availabilty : {
    type : String,
    required :true
  },
  Frequency_Of_Surveys : {
    type : Number,
    required: true
  },
  Survey_Participation_Reasons : {
    type : String,
    required : true
  },
  Feedback : {
    type : String
  }
});

const user = mongoose.model("User",userSchema);

app.route("/")

.post(async function(req,res){
  const fname = req.body.fname;
  const lname = req.body.lname;
  const email = req.body.email;
  const dob = req.body.dob;
  const city = req.body.city;
  const state = req.body.state;
  const country = req.body.country;
  const education = req.body.education;
  const job_title = req.body.jobtitle;
  const job_description = req.body.jobdescription;
  const income = req.body.income;
  const marital_status = req.body.maritalstatus;
  const no_of_children = req.body.children;
  const single_parent = req.body.singleparent;
  const interests = req.body.interests;
  const hobbies = req.body.hobbies;
  const mental_issues = req.body.mental_issues;
  const physical_issues = req.body.physical_issues;
  const social_problems = req.body.social_problems;
  const preferences = req.body.preferences;
  const availability = req.body.availability;
  const frequency = req.body.frequency;
  const reasons = req.body.reasons;
  const feedback = req.body.feeback;

  const data = new user({
    First_Name : fname,
    Last_Name : lname,
    Email_Address : email,
    DateOfBirth: dob,
    City : city,
    State : state,
    Country : country,
    Highest_Education : education,
    Job_Title : job_title,
    Job_Description : job_description,
    Income_Level : income,
    Marital_Status : marital_status,
    No_Of_Children : no_of_children,
    Single_Parent : single_parent,
    Interests : interests,
    Hobbies : hobbies,
    Mental_Issues : mental_issues,
    Physical_Issues : physical_issues,
    Social_Problems : social_problems,
    Preferred_Survey_Types : preferences,
    Availabilty : availability,
    Frequency_Of_Surveys : frequency,
    Survey_Participation_Reasons : reasons,
    Feedback : feedback
  });

  try{
    await data.save();
    res.status(200).send("Registered Successfully");
  }
  catch(err){
    res.status(404).send(err);
  }

});

app.route("/productSurvey")

.post(async function(req,res){
  console.log(req.body);
});

app.listen(3000 || process.env.PORT, () => {
  console.log("Server Started Successfully");
});
