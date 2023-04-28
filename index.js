const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const { Configuration, OpenAIApi } = require("openai");

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static(__dirname + "/public"));

const configuration = new Configuration({
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);


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
    type : String
  },
  Marital_Status : {
    type : String,
    required : true,
    trim : true
  },
  No_Of_Children : {
    type : String
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

const govSurveySchema = new mongoose.Schema({
  How_do_you_rate_the_overall_performance_of_the_current_government_in_India :String,
  Do_you_believe_that_the_Indian_government_is_making_significant_progress_in_terms_of_economic_growth : String,
  Are_you_satisfied_with_the_current_government_handling_of_the_COVID19_pandemic_in_India : String,
  How_effective_do_you_think_the_Indian_government_efforts_are_in_tackling_corruption_in_the_country : String,
  How_would_you_rate_the_Indian_government_efforts_in_improving_the_education_system_in_the_country : String
});

const eduSurveySchema = new mongoose.Schema({
  How_familiar_are_you_with_the_new_education_policy : String,
  What_aspects_of_the_new_education_policy_do_you_think_will_have_the_greatest_impact : String,
  Do_you_believe_the_new_education_policy_adequately_addresses_the_needs_of_students_from_marginalized_communities : String,
  What_do_you_think_about_the_increased_emphasis_on_technology_and_digital_learning_in_the_new_education_policy : String,
  Overall_do_you_think_the_new_education_policy_is_a_step_in_the_right_direction_for_our_country_s_education_system : String
});

const elecSurveySchema = new mongoose.Schema({
  What_electronic_products_do_you_use_on_a_daily_basis : String,
  How_often_do_you_replace_your_electronic_devices : String,
  How_important_is_it_for_you_to_have_the_latest_technology_when_purchasing_electronic_products : String,
  What_features_are_most_important_to_you_when_purchasing_electronic_products : String,
  What_concerns_do_you_have_about_the_environmental_impact_of_electronic_products : String
});

const user = mongoose.model("User",userSchema);
const govSurvey = mongoose.model("govSurvey",govSurveySchema);
const eduSurvey = mongoose.model("eduSurvey",eduSurveySchema);
const elecSurvey = mongoose.model("elecSurvey",elecSurveySchema);

app.route("/")

.get(function(req,res){
  res.render("index");
})

.post(async function(req,res){
  console.log(req.body);
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
    res.render("thanks");
    // res.status(200).send("Registered Successfully");
  }
  catch(err){
    res.status(404).send(err);
  }

});

app.route("/thanks")

.get(async function(req,res){
  res.render("thanks");
});

app.route("/generate")

.get(async function(req,res){
  try{
    const items = await user.find({});
    console.log(items);
    res.send(items);
  }
  catch(err){
    res.send(err);
  }
})

.post(async function(req,res){
  req.setTimeout(50000);
  const survey = req.body.survey;

  if (!configuration.apiKey) {
  res.status(500).json({
    error: {
      message: "Error : Key not configured, please follow the instructions",
    }
  });
  return;
}

  const data = await user.find({});


    data.forEach(async elt => {
      const fname = elt.First_Name;
      const lname = elt.Last_Name;
      const email = elt.Email_Address;
      const dob = elt.DateOfBirth;
      const city = elt.City;
      const state = elt.State;
      const country = elt.Country;
      const education = elt.Highest_Education;
      const jobtitle = elt.Job_Title;
      const jobsdescription = elt.Job_Description;
      const income = elt.Income_Level;
      const maritalstatus = elt.Marital_Status;
      const children = elt.No_Of_Children;
      const single_parent = elt.Single_Parent;
      const interests = elt.Interests;
      const hobbies = elt.Hobbies;
      const mental_issues = elt.Mental_Issues;
      const physical_issues = elt.Physical_Issues;
      const social_problems = elt.Social_Problems;
      const survey_types = elt.Preferred_Survey_Types;
      const availability = elt.Availabilty;
      const frequency = elt.Frequency_Of_Surveys;
      const reasons = elt.Survey_Participation_Reasons;
      const feedback = elt.Feedback;
      try {
        const completion = await openai.createCompletion({
          model: "text-davinci-003",
          prompt: generatePrompt(survey, fname, lname, email, dob, city, state, country, education, jobtitle, jobsdescription, income, maritalstatus, children, single_parent, interests, hobbies, mental_issues, physical_issues, social_problems, survey_types, availability, frequency, reasons, feedback),
          temperature: 0.7,
        });
        console.log(completion.data.choices[0].text);
        // res.status(200).json({ result: completion.data.choices[0].text });
      } catch(error) {
        // Consider adjusting the error handling logic for your use case
        if (error.response) {
          console.error(error.response.status, error.response.data);
          res.status(error.response.status).json(error.response.data);
        } else {
          console.error(`Error with OpenAI API request: ${error.message}`);
          res.status(500).json({
            error: {
              message: 'An error occurred during your request.',
            }
          });
        }
      }
    });
    res.send("success");
});

function generatePrompt(survey,fname, lname, email, dob, city, state, country, education, jobtitle, jobsdescription, income, maritalstatus, children, single_parent, interests, hobbies, mental_issues, physical_issues, social_problems, survey_types, availability, frequency, reasons, feedback) {
  return `I want to select  a user to send a survey related to a particular type and return Yes or No depending upon whether the user is related to the survey type .
   Type : Politics
   User Data : "My date of birth is 12-09-2002. I live in Chennai, Tamil Nadu in the country of India. My Highest Education is B.Tech. My Job title is Software Developer. My Job Description is that I have to develop high quality software products. My income level is between 100000 - 200000 per annum. My marital status is married and I have one children . My single parent status is No. My interests include cricket, sports, politics. My hobbies are coding and playing football. My mental health problems are none. My physical health problems are none. my social problems are none. my preferred survey types apart from my interests and background include higher education and travel. I am mostly free on weekends. I prefer surveys to be sent on a max of 3 per week. My reasons for receiving surveys are to help the community people better understand things from common people's perspective. My feedback is to provide interactive feedbacks".
   Result : Yes
   Type: ${survey}
   User Data:  "My date of birth is ${dob}. I live in ${city}, ${state} in the country of ${country}. My Highest Education is ${education}. My Job title is ${jobtitle}. My Job Description is that ${jobsdescription}. My income level is between ${income} per annum. My marital status is ${maritalstatus} and I have ${children} children . My single parent status is ${single_parent}. My interests include ${interests}. My hobbies are ${hobbies}. My mental health problems are ${mental_issues}. My physical health problems are ${physical_issues}. my social problems are ${social_problems}. my preferred survey types apart from my interests and background include ${survey_types}. I am mostly free on ${availability}. I prefer surveys to be sent on a max of ${frequency} per week. My reasons for receiving surveys are ${reasons}. My feedback is ${feedback}"
   Result :                                                                                                                                                                                              `;
}


app.route("/GovSurvey")

.post(async function(req,res){
  const q1 = req.body.question1;
  let a1 = "";
  switch (q1) {
    case "Item 1":
    a1="Excellent";
    break;
    case "Item 2":
    a1="Good";
    break;
    case "Item 3":
    a1="Average";
    break;
    case "Item 4":
    a1="Poor";
    break;
    case "Item 5":
    a1="Very Poor";
    break;
  }
  const q2 = req.body.question2;
  let a2 = "";
  switch (q1) {
    case "Item 1":
    a2="Yes, I think the government is making significant progress";
    break;
    case "Item 2":
    a2="No, I don't think the government is making significant progress";
    break;
    case "Item 3":
    a2="I am not sure";
    break;
  }
  const q3 = req.body.question3;
  let a3 ="";
  switch (q3) {
    case "Item 1":
    a3="Yes, I am satisfied";
    break;
    case "Item 2":
    a3="No, I am not satisfied";
    break;
    case "Item 3":
    a3="I am not sure";
    break;
  }
  const q4 = req.body.question4;
  let a4 = "";
  switch (q4) {
    case "Item 1":
    a4="Very effective";
    break;
    case "Item 2":
    a4="Somewhat effective";
    break;
    case "Item 3":
    a4="Not very effective";
    break;
    case "Item 4":
    a4="Not at all effective";
    break;
  }
  const q5 = req.body.question5;
  let a5 = "";
  switch (q5) {
    case "Item 1":
    a5="Excellent";
    break;
    case "Item 2":
    a5="Good";
    break;
    case "Item 3":
    a5="Average";
    break;
    case "Item 4":
    a5="Poor";
    break;
    case "Item 5":
    a5="Very Poor";
    break;
  }
  console.log(a1);
  const data = new govSurvey({
    How_do_you_rate_the_overall_performance_of_the_current_government_in_India :a1,
    Do_you_believe_that_the_Indian_government_is_making_significant_progress_in_terms_of_economic_growth : a2,
    Are_you_satisfied_with_the_current_government_handling_of_the_COVID19_pandemic_in_India : a3,
    How_effective_do_you_think_the_Indian_government_efforts_are_in_tackling_corruption_in_the_country : a4,
    How_would_you_rate_the_Indian_government_efforts_in_improving_the_education_system_in_the_country : a5
  });

  try{
    await data.save();
    res.status(200).send("Recorded Successfully");
  }
  catch(err){
    res.status(404).send(err);
  }
});

app.route("/EduSurvey")

.post(async function(req,res){
  const q1 = req.body.question1;
  let a1 = "";
  switch (q1) {
    case "Item 1":
    a1="Very familiar";
    break;
    case "Item 2":
    a1="Somewhat familiar";
    break;
    case "Item 3":
    a1="Not at all familiar";
    break;
  }
  const q2 = req.body.question2;
  let a2 = "";
  switch (q2) {
    case "Item 1":
    a2="Vocational training and skill development";
    break;
    case "Item 2":
    a2="Board exams and assessment systems";
    break;
    case "Item 3":
    a2="Technology and digital learning";
    break;
    case "Item 4":
    a2="Curriculum and pedagogy";
    break;
    case "Item 5":
    a2="Teacher training and development";
    break;
  }
  const q3 = req.body.question3;
  let a3 ="";
  switch (q3) {
    case "Item 1":
    a3="Yes, it is inclusive and equitable";
    break;
    case "Item 2":
    a3="It needs more focus on addressing the specific needs of marginalized communities";
    break;
    case "Item 3":
    a3="No, it does not address the needs of marginalized communities";
    break;
    case "Item 4":
    a3="Not sure";
    break;
  }
  const q4 = req.body.question4;
  let a4 = "";
  switch (q4) {
    case "Item 1":
    a4="It is a necessary change in the current times";
    break;
    case "Item 2":
    a4="It will increase accessibility and inclusivity";
    break;
    case "Item 3":
    a4="It may lead to a digital divide among students";
    break;
    case "Item 4":
    a4="Not sure";
    break;
  }
  const q5 = req.body.question5;
  let a5 = "";
  switch (q5) {
    case "Item 1":
    a5=" Yes, it is a much-needed reform";
    break;
    case "Item 2":
    a5="It has some good ideas, but implementation will be key to its success";
    break;
    case "Item 3":
    a5="No, it does not address the fundamental issues in our education system";
    break;
    case "Item 4":
    a5=" Not sure";
    break;
  }
  const data = new eduSurvey({
    How_familiar_are_you_with_the_new_education_policy : a1,
    What_aspects_of_the_new_education_policy_do_you_think_will_have_the_greatest_impact : a2,
    Do_you_believe_the_new_education_policy_adequately_addresses_the_needs_of_students_from_marginalized_communities : a3,
    What_do_you_think_about_the_increased_emphasis_on_technology_and_digital_learning_in_the_new_education_policy : a4,
    Overall_do_you_think_the_new_education_policy_is_a_step_in_the_right_direction_for_our_country_s_education_system : a5
  });

  try{
    await data.save();
    res.status(200).send("Recorded Successfully");
  }
  catch(err){
    res.status(404).send(err);
  }
});

app.route("/ElecSurvey")

.post(async function(req,res){
  const q1 = req.body.question1;
  let a1 = "";
  switch (q1) {
    case "Item 1":
    a1="Smartphones";
    break;
    case "Item 2":
    a1="Tablets";
    break;
    case "Item 3":
    a1="Laptops";
    break;
    case "Item 4":
    a1="Desktop computers";
    break;
    case "Item 3":
    a1="Smart home devices";
    break;
  }
  const q2 = req.body.question2;
  let a2 = "";
  switch (q2) {
    case "Item 1":
    a2="Every year";
    break;
    case "Item 2":
    a2="Every 2-3 years";
    break;
    case "Item 3":
    a2="Every 4-5 years";
    break;
    case "Item 4":
    a2="I keep my devices until they break or stop working";
    break;
  }
  const q3 = req.body.question3;
  let a3 ="";
  switch (q3) {
    case "Item 1":
    a3="Very important";
    break;
    case "Item 2":
    a3="Somewhat important";
    break;
    case "Item 3":
    a3="Not very important";
    break;
    case "Item 4":
    a3="Not important at all";
    break;
  }
  const q4 = req.body.question4;
  let a4 = "";
  switch (q4) {
    case "Item 1":
    a4="Battery life";
    break;
    case "Item 2":
    a4="Processing power and speed";
    break;
    case "Item 3":
    a4="Display/screen quality";
    break;
    case "Item 4":
    a4="Camera quality";
    break;
    case "Item 5":
    a4="Design and aesthetics";
    break;
    case "Item 6":
    a4="Price";
    break;
  }
  const q5 = req.body.question5;
  let a5 = "";
  switch (q5) {
    case "Item 1":
    a5="E-waste and proper disposal of devices";
    break;
    case "Item 2":
    a5="Energy consumption and carbon footprint";
    break;
    case "Item 3":
    a5="Extraction of rare earth materials and their impact on the environment";
    break;
    case "Item 4":
    a5=" Lack of recycling programs for electronic devices";
    break;
  }
  const data = new elecSurvey({
    What_electronic_products_do_you_use_on_a_daily_basis : a1,
    How_often_do_you_replace_your_electronic_devices : a2,
    How_important_is_it_for_you_to_have_the_latest_technology_when_purchasing_electronic_products : a3,
    What_features_are_most_important_to_you_when_purchasing_electronic_products : a4,
    What_concerns_do_you_have_about_the_environmental_impact_of_electronic_products : a5,
  });

  try{
    await data.save();
    res.status(200).send("Recorded Successfully");
  }
  catch(err){
    res.status(404).send(err);
  }
});

app.listen(3000 || process.env.PORT, () => {
  console.log("Server Started Successfully");
});
