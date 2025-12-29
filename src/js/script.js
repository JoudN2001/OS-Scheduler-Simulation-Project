import { FCFS } from "./FCFS.js";
// import { RR } from "./RR.js";

const selectAlgorthim = document.getElementById("algoSelect");
const info = document.getElementById("algoTooltip");
const addProcess = document.getElementById("addProcessBtn");
const clearProcesses = document.getElementById("clearProcessesBtn");
const runBtn = document.getElementById("RunBtn");
const summaryBtn = document.getElementById("toggleSummaryBtn");

let PID = document.getElementById("pidInput");
let AT = document.getElementById("arrivalTimeInput");
let BT = document.getElementById("burstInput");
let Priority = document.getElementById("priorityInput");

const tableOfProcess = document.getElementById("ProcessTableBody");
const tableOfMetrics = document.getElementById("metricsTableBody");
const tableOfSummary = document.getElementById("summaryTableBody");

// Select Algorithm
selectAlgorthim.addEventListener("change", (e) => {
  let selected = e.target.value;
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
      document.getElementById("quantumContainer").append(slider);

      let QT = document.createElement("div");
      QT.innerHTML = `<p class="qt-display">QT = <span id="quantumTimeValue">3</span></p>`;
      document.querySelector("#metricsContainer hr").after(QT);

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
      break;

    // Add Process FCFS OR SJF Algorithm non-preemptive
    default:
      console.log(INITIAL_PROCESSES);
      AT.value = i;
      PID.value = `P${++i}`;
      BT.value = i * 2;
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
  tableOfSummary.innerHTML = `<tbody>
        </tbody>
  `;
  i = 0;
  AT.value = i;
  PID.value = `P1`;
  BT.value = 2;
  INITIAL_PROCESSES = [];
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
      let SolveFCFS = FCFS(INITIAL_PROCESSES);
      SolveFCFS.solved.forEach((process) => {
        tableOfMetrics.innerHTML += `<tr>
            <td>${process.id}</td>
            <td>${process.responseTime}</td>
            <td>${process.waitingTime}</td>
            <td>${process.turnaroundTime}</td>
            </tr>
        `;
      });
  }
});

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

//Summary table
let t = 1;
summaryBtn.addEventListener("click", (e) => {
  if (t % 2) {
    let triangleOutLine = document.getElementById("toggleIcon");
    triangleOutLine.innerText = `△`;
    t++;
    document.querySelector(".group-content").classList.remove("hidden");

    let SolveFCFS = FCFS(INITIAL_PROCESSES);
    let avg = getAvarage(SolveFCFS);
    tableOfSummary.innerHTML = `<tr>
        <td>${avg.avgResponse}</td>
        <td>${avg.avgWaiting}</td>
        <td>${avg.avgTurnaround}</td>
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
