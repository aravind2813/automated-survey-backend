function verify() {
    let fname = document.getElementById("fname").value;
    if(fname == "")   {
        alert("Enter First Name");
        return false;
    }

    let lname = document.getElementById("lname").value
    if(lname == "") {
        alert("Enter Last Name");
        return false;
    }

    let mail = document.getElementById("mail").value
    if(mail == "")   {
        alert("Enter Mail ID");
        return false;
    }

    let dob = document.getElementById("dob").value
    if(dob == "")   {
        alert("Enter D.O.B");
        return false;
    }

    let  city= document.getElementById("city").value
    if(city == "")   {
        alert("Enter City Name");
        return false;
    }

    let state = document.getElementById("state").value
    if(state == "")   {
        alert("Enter State Name");
        return false;
    }

    let country = document.getElementById("count").value
    if(country == "")   {
        alert("Enter Country Name");
        return false;
    }

    let higher_education = document.getElementById("hied").value
    if(higher_education == "")   {
        alert("Enter Higher Education");
        return false;
    }

    let singleParent = document.getElementById("sinpar").value
    if(singleParent == "")   {
        alert("Enter for Single Parent");
        return false;
    }

    let interests = document.getElementById("int").value
    if(interests == "")   {
        alert("Enter Interests");
        return false;
    }

    let hobbies = document.getElementById("hob").value
    if(hobbies == "")   {
        alert("Enter Hobbies");
        return false;
    }

    let socialProblem = document.getElementById("socprob").value
    if(socialProblem == "")   {
        alert("Enter Social Problems");
        return false;
    }

    let typeOfSurvey = document.getElementById("mail").value
    if(mail == "")   {
        alert("Enter Mail ID");
        return false;
    }

    let reasonForSurvey = document.getElementById("reason").value
    if(reasonForSurvey == "")   {
        alert("Enter Reason For Survey");
        return false;
    }

    let Expectations = document.getElementById("expect").value
    if(Expectations == "")   {
        alert("Enter Expectations");
        return false;
    }
}
