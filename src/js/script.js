import { FCFS } from "./FCFS.js";
import { RR } from "./RR.js";
import { SJF } from "./SJF.js";
// import { Priority } from "./Priority.js";

const selectAlgorthim = document.getElementById("algoSelect");
const info = document.getElementById("algoTooltip");
const addProcess = document.getElementById("addProcessBtn");
const clearProcesses = document.getElementById("clearProcessesBtn");
const runBtn = document.getElementById("RunBtn");
const summaryBtn = document.getElementById("toggleSummaryBtn");
const summaryProcess = document.getElementById("summaryname");

let PID = document.getElementById("pidInput");
let AT = document.getElementById("arrivalTimeInput");
let BT = document.getElementById("burstInput");
let Priority = document.getElementById("priorityInput");

const tableOfProcess = document.getElementById("ProcessTableBody");
const tableOfMetrics = document.getElementById("metricsTableBody");
const tableOfSummary = document.getElementById("summaryContent");

// Select Algorithm
selectAlgorthim.addEventListener("change", (e) => {
  let selected = e.target.value;

  //reset style
  const inputSlider = document.getElementById("quantumContainer");
  const QT = document.querySelector(".QTNumber");
  inputSlider.innerHTML = ``;
  QT.innerHTML = ``;

  switch (selected) {
    // Select Priority Algorithm preemptive
    case "priority":
      let priority = document.createElement("div");
      priority.classList.add("row");
      priority.innerHTML = `
                <label class="pcb-label" for="priorityInput">Priority</label>
                <input id="priorityInput" class="input-width" type="number" min="1" value="1" />
              `;
      document.querySelector(".input-column").append(priority);

      let priorityTh = document.createElement("th");
      priorityTh.innerHTML = `Priority`;
      document.querySelector("#process-table thead tr").append(priorityTh);
      break;

    // Select Round Robin Algorithm preemptive
    case "rr":
      let slider = document.createElement("div");
      slider.innerHTML = `
        <label class="qu-label">Quantum Time: <span id="valueLabel">3</span></label>
        <div class="quantum-slider-container">
          <input class="Quantum-slider" type="range" id="quantum" min="1" max="15" value="3" />
          <span class="slider-start">1</span>
          <span class="slider-end">15</span>
        </div>
      `;
      inputSlider.append(slider);
      QT.innerHTML = `<p class="qt-display">QT = <span id="quantumTimeValue">3</span></p>`;

      // Slider number
      const quantumSlider = document.getElementById("quantum");
      let quantumNum = document.getElementById("valueLabel");
      let quantumTableNum = document.getElementById("quantumTimeValue");
      quantumSlider.addEventListener("change", (e) => {
        quantumNum.textContent = e.target.value;
        quantumTableNum.textContent = quantumNum.innerText; // change only in run
      });
      break;

    // Select FCFS & SJF Algorithm non-preemptive
    default:
      break;
  }
});

function defaultLayout() {} // add later in phase 3

// Select algorithm to Run & add
let selected = null;
selectAlgorthim.addEventListener("change", (e) => {
  return (selected = e.target.value);
});

// add process
let INITIAL_PROCESSES = [];
let i = 0;
addProcess.addEventListener("click", (e) => {
  let newRow = document.createElement("tr");
  switch (selected) {
    // Add Process Priority Algorithm preemptive
    case "priority":
      break;

    // Add Process Round Robin Algorithm non-preemptive
    case "rr":
      PID.value = `P${++i}`;
      newRow.innerHTML = `
      <td>${PID.value}</td>
      <td>${AT.value}</td>
      <td>${BT.value}</td>
      `;
      tableOfProcess.append(newRow);
      INITIAL_PROCESSES.push(
        {
          id: PID.value,
          arrivalTime: parseInt(AT.value),
          burstTime: parseInt(BT.value),
        },
        quantumSlider.value
      );
      console.log(INITIAL_PROCESSES);
      break;

    // Add Process FCFS OR SJF Algorithm non-preemptive
    default:
      PID.value = `P${++i}`;
      newRow.innerHTML = `
      <td>${PID.value}</td>
      <td>${AT.value}</td>
      <td>${BT.value}</td>
      `;
      tableOfProcess.append(newRow);
      INITIAL_PROCESSES.push({
        id: PID.value,
        arrivalTime: parseInt(AT.value),
        burstTime: parseInt(BT.value),
      });
      console.log(INITIAL_PROCESSES);
      break;
  }
});

// clear all process
clearProcesses.addEventListener("click", (e) => {
  tableOfProcess.innerHTML = `<tbody>
        </tbody>
  `;
  tableOfMetrics.innerHTML = `<tbody>
        </tbody>
  `;
  tableOfSummary.innerHTML = ``;
  let triangleFill = document.getElementById("toggleIcon");
  triangleFill.innerText = `▼`;
  t++;
  console.log();
  // document.querySelector(".group-content").classList.add("hidden");
  i = 0;
  s = 1;
  summaryProcess.textContent = "Processes List";
  AT.value = i;
  PID.value = `P1`;
  BT.value = 2;
  INITIAL_PROCESSES = [];
});

//run algorthim
let SolveFCFS;
let s = 1;
let Processes = [];
runBtn.addEventListener("click", (e) => {
  if (INITIAL_PROCESSES.length) {
    switch (selected) {
      case "sjf":
        console.log(selected);
        SolveFCFS = SJF(INITIAL_PROCESSES);
        Processes = [];
        if (s === 1) {
          SolveFCFS.solved.forEach((process) => {
            Processes.push(process.id);
            tableOfMetrics.innerHTML += `<tr>
              <td>${process.id}</td>
              <td>${process.responseTime}</td>
              <td>${process.waitingTime}</td>
              <td>${process.turnaroundTime}</td>
              </tr>
          `;
          });
          s++;
          summaryProcess.textContent = Processes.join(", ");
        }
        break;
      case "priority":
        console.log(selected);
        break;
      case "rr":
        console.log(selected);
        SolveFCFS = RR(INITIAL_PROCESSES);
        Processes = [];
        if (s === 1) {
          SolveFCFS.solved.forEach((process) => {
            Processes.push(process.id);
            tableOfMetrics.innerHTML += `<tr>
              <td>${process.id}</td>
              <td>${process.responseTime}</td>
              <td>${process.waitingTime}</td>
              <td>${process.turnaroundTime}</td>
              </tr>
          `;
          });
          s++;
          summaryProcess.textContent = Processes.join(", ");
        }
        break;
      default:
        SolveFCFS = FCFS(INITIAL_PROCESSES);
        Processes = [];
        if (s === 1) {
          SolveFCFS.solved.forEach((process) => {
            Processes.push(process.id);
            tableOfMetrics.innerHTML += `<tr>
              <td>${process.id}</td>
              <td>${process.responseTime}</td>
              <td>${process.waitingTime}</td>
              <td>${process.turnaroundTime}</td>
              </tr>
          `;
          });
          s++;
          summaryProcess.textContent = Processes.join(", ");
        }
    }
  } else alert("Add Processes First");
});

// let SolveRR = RR(INITIAL_PROCESSES);

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

//Summary table
let t = 1;
summaryBtn.addEventListener("click", (e) => {
  if (INITIAL_PROCESSES.length) {
    if (t % 2) {
      let triangleOutLine = document.getElementById("toggleIcon");
      triangleOutLine.innerText = `△`;
      t++;
      let avg = getAvarage(SolveFCFS);
      let summaryDiv = document.createElement("div");
      summaryDiv.innerHTML = `
        <span>Avg Response Time</span>
        <span></span>
        <strong>${avg.avgResponse}</strong>
        <span>Avg Waiting Time</span>
        <span></span>
        <strong>${avg.avgWaiting}</strong>
        <span>Avg Turnaround Time</span>
        <span></span>
        <strong>${avg.avgTurnaround}</strong>
            `;
      tableOfSummary.append(summaryDiv);
    } else {
      let triangleFill = document.getElementById("toggleIcon");
      triangleFill.innerText = `▼`;
      t++;
    }
  } else alert("Add Processes First");
});
