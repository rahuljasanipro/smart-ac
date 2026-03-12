const electricityRate = 8;

let acOn = false;
let ecoMode = false;

let roomTemp = 30;
let targetTemp = 24;

let todayUsage = 0;
let weeklyUsage = 0;

const power = 1.5;

const slider = document.getElementById("tempSlider");
const targetLabel = document.getElementById("targetTempLabel");

slider.oninput = () => {

targetTemp = slider.value;

targetLabel.innerText = targetTemp + "°C";

};



const powerBtn = document.getElementById("powerBtn");

powerBtn.onclick = () => {

acOn = !acOn;

powerBtn.innerText = acOn ? "AC ON" : "AC OFF";

};



const ecoBtn = document.getElementById("ecoBtn");

ecoBtn.onclick = () => {

ecoMode = !ecoMode;

ecoBtn.style.background = ecoMode ? "#4CAF50" : "#ffffff20";

};



function simulateEnvironment(){

if(acOn){

let cooling = ecoMode ? 0.1 : 0.2;

if(roomTemp > targetTemp){

roomTemp -= cooling;

}

todayUsage += power/360;

weeklyUsage += power/360;

}

else{

roomTemp += 0.02;

}

updateUI();

}



function updateUI(){

document.getElementById("roomTemp").innerText = roomTemp.toFixed(1)+"°C";

document.getElementById("todayUsage").innerText = todayUsage.toFixed(2)+" kWh";

document.getElementById("weeklyUsage").innerText = weeklyUsage.toFixed(2)+" kWh";

document.getElementById("powerDraw").innerText = acOn ? power+" kW" : "0 kW";

let cost = todayUsage * electricityRate;

document.getElementById("cost").innerText = "₹"+cost.toFixed(2);

updateChart();

localStorage.setItem("usage",todayUsage);

}



setInterval(simulateEnvironment,1000);



const ctx=document.getElementById("chart");

const data=[0,0,0,0,0,0,0];

const chart=new Chart(ctx,{

type:'line',

data:{

labels:['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],

datasets:[{

label:'Energy kWh',

data:data,

borderWidth:3,

tension:0.4

}]

},

options:{

plugins:{legend:{display:false}}

}

});



function updateChart(){

let day=new Date().getDay();

data[day]=todayUsage;

chart.update();

}



const darkBtn=document.getElementById("darkBtn");

darkBtn.onclick=()=>{

document.body.classList.toggle("dark");

};
