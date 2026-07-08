/*==========================================================
 ENY SMARTESTIMATE™ ENGINE
 Electricians Near You
 Version 2.0
==========================================================*/

const app = {

    currentQuestion: 1,

    totalQuestions: 8,

    answers: {

        property: null,
        bedrooms: null,
        board: null,
        age: null,
        extras: [],
        surge: null,
        urgency: null

    }

};


/*==========================================================
 PRICING DATABASE
==========================================================*/

const pricing = {

    property: {

        flat: {
            name: "Flat / Apartment",
            min: 650,
            max: 780,
            circuits: "6-8"
        },

        terraced: {
            name: "Terraced House",
            min: 720,
            max: 860,
            circuits: "8-10"
        },

        semi: {
            name: "Semi Detached",
            min: 790,
            max: 930,
            circuits: "10-12"
        },

        detached: {
            name: "Detached House",
            min: 920,
            max: 1150,
            circuits: "12-16"
        }

    }

};


/*==========================================================
 UI REFERENCES
==========================================================*/

const ui = {

    price: document.getElementById("livePrice"),

    property: document.getElementById("summaryProperty"),

    bedrooms: document.getElementById("summaryBedrooms"),

    board: document.getElementById("summaryBoard"),

    age: document.getElementById("summaryAge"),

    extras: document.getElementById("summaryExtras"),

    confidenceFill: document.getElementById("confidenceFill"),

    confidenceText: document.getElementById("confidenceText"),

    progress: document.getElementById("progressFill")

};


/*==========================================================
 UPDATE SUMMARY
==========================================================*/

function updateSummary(){

    if(app.answers.property){

        ui.property.textContent =
            pricing.property[app.answers.property].name;

    }

}


/*==========================================================
 UPDATE ESTIMATE
==========================================================*/

function updateEstimate(){

    if(!app.answers.property) return;

    const selected =
        pricing.property[app.answers.property];

    ui.price.textContent =
        "£" +
        selected.min +
        " - £" +
        selected.max;

}


/*==========================================================
 UPDATE PROGRESS
==========================================================*/

function updateProgress(){

    const percent =
        (app.currentQuestion / app.totalQuestions) * 100;

    ui.progress.style.width = percent + "%";

    ui.confidenceFill.style.width = percent + "%";

    ui.confidenceText.textContent =
        Math.round(percent) + "% Complete";

}


/*==========================================================
 INITIALISE
==========================================================*/

function initialiseCalculator(){

    updateProgress();

}

document.addEventListener(
    "DOMContentLoaded",
    initialiseCalculator
);

/*==========================================================
 PROPERTY CARD SELECTION
==========================================================*/

function selectProperty(value, button){

    // Store answer
    app.answers.property = value;

    // Remove previous selection
    document.querySelectorAll(".property-card").forEach(card=>{
        card.classList.remove("selected");
    });

    // Highlight current selection
    button.classList.add("selected");

    // Update UI
    updateSummary();
    updateEstimate();

    // Move progress to question 2
    app.currentQuestion = 2;

    updateProgress();

    // Show Question 2
    showQuestion(2);

}


/*==========================================================
 SHOW QUESTION
==========================================================*/

function showQuestion(questionNumber){

    // Hide every question
    document.querySelectorAll(".question-card").forEach(card=>{

        card.classList.add("hidden");

    });

    // Show selected question
    const question =
        document.getElementById("question"+questionNumber);

    if(question){

        question.classList.remove("hidden");

        question.scrollIntoView({

            behavior:"smooth",

            block:"center"

        });

    }

}


/*==========================================================
 PROPERTY EVENTS
==========================================================*/

document.querySelectorAll(".property-card")

.forEach(button=>{

    button.addEventListener("click",()=>{

        selectProperty(

            button.dataset.value,

            button

        );

    });

});
