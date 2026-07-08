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

switch(estimate.property){

case "Flat":

min+=0;

max+=0;

break;

case "Terraced":

min+=40;

max+=50;

break;

case "Semi":

min+=90;

max+=120;

break;

case "Detached":

min+=180;

max+=250;

break;

}


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
