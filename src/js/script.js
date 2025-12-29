import { FCFS } from "./FCFS.js";
// import { RR } from "./RR.js";

const INITIAL_PROCESSES = [];

// let SolveFCFS = FCFS(INITIAL_PROCESSES);
// const SolveRR = RR(INITIAL_PROCESSES);

function getAvarage({ solved }) {
  const avgWaiting = (
    solved.reduce((acc, curr) => acc + curr.waitingTime, 0) / solved.length
  ).toFixed(2);

  const avgResponse = (
    solved.reduce((acc, curr) => acc + curr.responseTime, 0) / solved.length
  ).toFixed(2);

  const avgTurnaround = (
    solved.reduce((acc, curr) => acc + curr.turnaroundTime, 0) / solved.length
  ).toFixed(2);

  return { avgWaiting, avgResponse, avgTurnaround };
}

// console.log(getAvarage(SolveFCFS));
// console.log(getAvarage(SolveRR));

const selectAlgorthim = document.getElementById("algoSelect");
const info = document.getElementById("algoTooltip");
const quantumSlider = document.getElementById("quantum");
const addProcess = document.getElementById("addProcessBtn");
const clearProcesses = document.getElementById("clearProcessesBtn");
const runBtn = document.getElementById("RunBtn");
const summaryBtn = document.getElementById("toggleSummaryBtn");

let quantumNum = document.getElementById("valueLabel");
let quantumTableNum = document.getElementById("quantumTimeValue");

let PID = document.getElementById("pidInput");
let AT = document.getElementById("arrivalTimeInput");
let BT = document.getElementById("burstInput");
let Priority = document.getElementById("priorityInput");

const tableOfProcess = document.getElementById("ProcessTableBody");
const tableOfMetrics = document.getElementById("metricsTableBody");
const tableOfSummary = document.getElementById("summaryTableBody");

// Slider number
quantumSlider.addEventListener("change", (e) => {
  quantumNum.textContent = e.target.value;
  quantumTableNum.textContent = quantumNum.innerText; // change only in run
});

// input processes arrays
// let arrPID = [];
// let arrAT = [];
// let arrBT = [];
// let arrPriority = [];

// add process
let i = 2;
addProcess.addEventListener("click", (e) => {
  let newRow = document.createElement("tr");
  newRow.innerHTML = `
              <td>${PID.value}</td>
              <td>${AT.value}</td>
              <td>${BT.value}</td>
              <td>${Priority.value}</td>
`;
  // arrPID.push(PID.value);
  // arrAT.push(AT.value);
  // arrBT.push(BT.value);
  // arrPriority.push(Priority.value);
  tableOfProcess.append(newRow);
  PID.value = `P${i++}`;
  AT.value = i++;
  BT.value = i * 2;
  INITIAL_PROCESSES.push({
    id: PID.value,
    arrivalTime: parseInt(AT.value),
    burstTime: parseInt(BT.value),
  });
});

// clear all process
clearProcesses.addEventListener("click", (e) => {
  tableOfProcess.innerHTML = `<tbody>
        </tbody>
  `;
  tableOfMetrics.innerHTML = `<tbody>
        </tbody>
  `;
  tableOfSummary.innerHTML = `<tbody>
        </tbody>
  `;
  i = 1;
  PID.value = `P${i++}`;
  AT.value = 3;
  BT.value = 6;
});

// Select algorithm
let selected = null;
selectAlgorthim.addEventListener("change", (e) => {
  return (selected = e.target.value);
});

//run algorthim
runBtn.addEventListener("click", (e) => {
  switch (selected) {
    case "sjf":
      console.log(selected);
      break;
    case "priority":
      console.log(selected);
      break;
    case "rr":
      console.log(selected);
      break;
    default:
      console.log(selected);
      console.log(INITIAL_PROCESSES);
      console.log(FCFS(INITIAL_PROCESSES));
  }
  let SolveFCFS = FCFS(INITIAL_PROCESSES);
  SolveFCFS.solved.forEach((process) => {
    tableOfMetrics.innerHTML += `<tr>
        <td>${process.id}</td>
        <td>${process.arrivalTime}</td>
        <td>${process.burstTime}</td>
        <td>${process.waitingTime}</td> 
        <td>${process.turnaroundTime}</td>
        <td>${process.completionTime}</td>
        <td>${process.responseTime}</td>
              </tr>
    `;
  });
});

//Summary table
let t = 1;
summaryBtn.addEventListener("click", (e) => {
  if (t % 2) {
    let triangleOutLine = document.getElementById("toggleIcon");
    triangleOutLine.innerText = `△`;
    t++;
    document.querySelector(".group-content").classList.remove("hidden");

    tableOfSummary.innerHTML = `<tr>
        <td>${process.id}</td>
        <td>${process.arrivalTime}</td>
        <td>${process.burstTime}</td>
              </tr>
    `;
  } else {
    let triangleFill = document.getElementById("toggleIcon");
    triangleFill.innerText = `▼`;
    t++;
    document.querySelector(".group-content").classList.add("hidden");
    tableOfSummary.innerHTML = `<tbody>
        </tbody>
  `;
  }
});
// styling
// table layout auto , center for data inside table
