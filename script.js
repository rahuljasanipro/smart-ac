const electricityRate = 8;

let acOn = false;
let todayUsage = 0;
let weeklyUsage = 0;

const weeklyData = [0,0,0,0,0,0,0];

document.getElementById("date").innerText =
new Date().toDateString();


const tempSlider = document.getElementById("tempSlider");
const tempValue = document.getElementById("tempValue");

tempSlider.oninput = function(){
tempValue.innerText = this.value + "°C";
};


const acToggle = document.getElementById("acToggle");

acToggle.onclick = () => {

acOn = !acOn;

acToggle.innerText = acOn ? "AC ON" : "AC OFF";
acToggle.style.background = acOn ? "#28a745" : "#007bff";

};


const simulateBtn = document.getElementById("simulateBtn");

simulateBtn.onclick = () => {

if(!acOn){
alert("Turn ON the AC first");
return;
}

let usage = (Math.random()*2).toFixed(2);

todayUsage += parseFloat(usage);
weeklyUsage += parseFloat(usage);

let cost = todayUsage * electricityRate;

document.getElementById("todayUsage").innerText =
todayUsage.toFixed(2) + " kWh";

document.getElementById("weeklyUsage").innerText =
weeklyUsage.toFixed(2) + " kWh";

document.getElementById("cost").innerText =
"₹" + cost.toFixed(2);

updateChart(parseFloat(usage));

};



const ctx = document.getElementById('energyChart');

const chart = new Chart(ctx, {

type:'line',

data:{
labels:['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],
datasets:[{
label:'Energy (kWh)',
data:weeklyData,
borderWidth:2,
tension:0.4
}]
},

options:{
responsive:true
}

});


function updateChart(usage){

const day = new Date().getDay();

weeklyData[day] += usage;

chart.update();

}



const darkBtn = document.getElementById("darkMode");

darkBtn.onclick = () => {

document.body.classList.toggle("dark");

};
