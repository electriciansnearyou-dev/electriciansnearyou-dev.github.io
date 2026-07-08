/*==================================================
 ENY SMART ESTIMATE ENGINE
 Version 1.0
==================================================*/

const estimate = {

property: "",

bedrooms: "",

board: "",

age: "",

extras: [],

priceMin:650,

priceMax:900

};

function updateEstimate(){

let min = 650;

let max = 900;


/* PROPERTY */

const propertyPricing={

flat:{
name:"Flat",
baseMin:650,
baseMax:780,
circuits:"6-8"
},

terraced:{
name:"Terraced",
baseMin:710,
baseMax:850,
circuits:"8-10"
},

semi:{
name:"Semi Detached",
baseMin:790,
baseMax:930,
circuits:"10-12"
},

detached:{
name:"Detached",
baseMin:920,
baseMax:1150,
circuits:"12-16"
}

};

/* BEDROOMS */

switch(estimate.bedrooms){

case "1":

min+=0;

max+=0;

break;

case "2":

min+=40;

max+=50;

break;

case "3":

min+=80;

max+=100;

break;

case "4":

min+=140;

max+=180;

break;

case "5+":

min+=220;

max+=260;

break;

}


/* BOARD */

switch(estimate.board){

case "Plastic":

min+=60;

max+=90;

break;

case "Metal":

min+=0;

max+=0;

break;

case "Very Old":

min+=160;

max+=240;

break;

}


/* AGE */

switch(estimate.age){

case "10-20":

min+=20;

max+=30;

break;

case "20-40":

min+=70;

max+=100;

break;

case "40+":

min+=140;

max+=220;

break;

}


/* EXTRAS */

estimate.extras.forEach(extra=>{

min+=35;

max+=55;

});


estimate.priceMin=min;

estimate.priceMax=max;


/* UPDATE SCREEN */

document.getElementById("livePrice").innerHTML=

"£"+min.toLocaleString()+" - £"+max.toLocaleString();

}
