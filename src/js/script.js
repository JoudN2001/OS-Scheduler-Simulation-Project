import { FCFS } from "./FCFS.js";
import { RR } from "./RR.js";
import { SJF } from "./SJF.js";
import { Priority } from "./Priority.js";

const selectAlgorthim = document.getElementById("algoSelect");
const info = document.getElementById("algoTooltip"); // add later
const addProcess = document.getElementById("addProcessBtn");
const clearProcesses = document.getElementById("clearProcessesBtn");
const runBtn = document.getElementById("RunBtn");
const summaryBtn = document.getElementById("toggleSummaryBtn");
const summaryProcess = document.getElementById("summaryname");

const tableOfProcess = document.getElementById("ProcessTableBody");
const tableOfMetrics = document.getElementById("metricsTableBody");
const tableOfSummary = document.getElementById("summaryContent");

// Select Algorithm
let quantumValue = 0;
selectAlgorthim.addEventListener("change", (e) => {
  let selected = e.target.value;

  // Reset style
  const inputSlider = document.getElementById("quantumContainer");
  const QT = document.querySelector(".QTNumber");
  const priorityCol = document.querySelector("#process-table thead tr");
  const priorityCol2 = document.querySelector(".input-column");
  priorityCol2.innerHTML = `
        <div class="row">
          <label class="pcb-label" for="pidInput">PID</label>
          <input id="pidInput" class="input-width" type="text" value="P1" disabled />
        </div>

        <div class="row">
          <label class="pcb-label" for="arrivalTimeInput">AT</label>
          <input id="arrivalTimeInput" class="input-width" type="number" min="0" value="0" />
        </div>

        <div class="row">
          <label class="pcb-label" for="burstInput">Burst</label>
          <input id="burstInput" class="input-width" type="number" min="1" value="2" />
          `;
  priorityCol.innerHTML = `<th>PID</th>
      <th>AT</th>
      <th>Burst</th>`;
  inputSlider.innerHTML = ``;
  QT.innerHTML = ``;

  switch (selected) {
    // Select Priority Algorithm preemptive
    case "priority":
      console.log(selected);
      let priority = document.createElement("div");
      priority.classList.add("row");
      priority.innerHTML = `
          <label class="pcb-label" for="priorityInput">Priority</label>
          <input id="priorityInput" class="input-width" type="number" min="1" value="1" />
        `;
      priorityCol2.append(priority);
      let priorityTh = document.createElement("th");
      priorityTh.innerHTML = `Priority`;
      priorityCol.append(priorityTh);
      break;

    // Select Round Robin Algorithm preemptive
    case "rr":
      console.log(selected);
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
        quantumValue = parseInt(quantumSlider.value);
        console.log(quantumValue);
      });
      break;

    // Select FCFS & SJF Algorithm non-preemptive
    default:
      console.log(selected);
      break;
  }
});

function defaultLayout() {} // add later in phase 3

// Select algorithm to Run & add
let selected = "fcfs";
selectAlgorthim.addEventListener("change", (e) => {
  return (selected = e.target.value);
});

// Add process
let INITIAL_PROCESSES = [];
let i = 0;
addProcess.addEventListener("click", (e) => {
  let PID = document.getElementById("pidInput");
  let AT = document.getElementById("arrivalTimeInput");
  let BT = document.getElementById("burstInput");
  i++;
  let currentPID = `P${i}`;
  PID.value = `P${i + 1}`;
  let newRow = document.createElement("tr");
  // Add Process Priority Algorithm
  if (selected === "priority") {
    let inputPriority = document.getElementById("priorityInput");
    newRow.innerHTML = `
      <td>${currentPID}</td>
      <td>${AT.value}</td>
      <td>${BT.value}</td>
      <td>${inputPriority.value}</td>
      `;
    tableOfProcess.append(newRow);
    INITIAL_PROCESSES.push({
      id: currentPID,
      arrivalTime: parseInt(AT.value),
      burstTime: parseInt(BT.value),
      priority: parseInt(inputPriority.value),
    });
    console.log(INITIAL_PROCESSES);
  }
  // Add Process Round Robin OR FCFS OR SJF Algorithm
  else {
    newRow.innerHTML = `
      <td>${currentPID}</td>
      <td>${AT.value}</td>
      <td>${BT.value}</td>
      `;
    tableOfProcess.append(newRow);
    INITIAL_PROCESSES.push({
      id: currentPID,
      arrivalTime: parseInt(AT.value),
      burstTime: parseInt(BT.value),
    });
    console.log(INITIAL_PROCESSES);
  }
});

// Clear all process
let isRun = false;
clearProcesses.addEventListener("click", (e) => {
  let PID = document.getElementById("pidInput");
  let AT = document.getElementById("arrivalTimeInput");
  let BT = document.getElementById("burstInput");
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
  i = 0;
  s = 1;
  summaryProcess.textContent = "Processes List";
  AT.value = i;
  PID.value = `P1`;
  BT.value = 2;
  INITIAL_PROCESSES = [];
  isRun = false;
});

// Run algorthim
let solvedData; // Unified variable for any algorithm result
let s = 1;
let Processes = [];

runBtn.addEventListener("click", (e) => {
  if (INITIAL_PROCESSES.length) {
    if (!isRun) {
      // 1. Solve based on selection
      switch (selected) {
        case "sjf":
          console.log(selected);
          solvedData = SJF(INITIAL_PROCESSES);
          break;
        case "priority":
          console.log(selected);
          solvedData = Priority(INITIAL_PROCESSES);
          break;
        case "rr":
          console.log(selected);
          solvedData = RR(INITIAL_PROCESSES, quantumValue);
          break;
        default: // FCFS
          solvedData = FCFS(INITIAL_PROCESSES);
          break;
      }

      // 2. Render Gantt Chart (works for all)
      renderGanttChart(solvedData.gantt);

      // 3. Render Metrics Table
      Processes = [];
      if (s === 1) {
        solvedData.solved.forEach((process) => {
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

      isRun = true;
    } else alert("Clear all Process before and run again");
  } else alert("Add Processes First");
});

// Average of processes
function getAverage({ solved }) {
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

// Summary table
let t = 1;
summaryBtn.addEventListener("click", (e) => {
  if (INITIAL_PROCESSES.length && solvedData) {
    let summaryDiv = document.createElement("div");
    if (t % 2) {
      let triangleOutLine = document.getElementById("toggleIcon");
      triangleOutLine.innerText = `△`;
      t++;
      let avg = getAverage(solvedData);
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
      tableOfSummary.innerHTML = "";
      t++;
    }
  } else alert("Add Processes First");
});

function renderGanttChart(ganttData) {
  const chartContainer = document.getElementById("gantt-chart-display");
  chartContainer.innerHTML = ""; // Clear previous chart

  const chartWrapper = document.createElement("div");
  chartWrapper.className = "gantt-wrapper";

  // Scale factor: How wide (in pixels) should 1 unit of time be?
  const timeUnitWidth = 45;

  ganttData.forEach((item, index) => {
    const block = document.createElement("div");
    block.className = "gantt-block";
    block.innerText = item.processId;

    // Calculate width based on duration
    const duration = item.endTime - item.startTime;
    block.style.width = `${duration * timeUnitWidth}px`;

    // Add End Time Label for every block
    const endTimeLabel = document.createElement("span");
    endTimeLabel.className = "gantt-time";
    endTimeLabel.innerText = item.endTime;
    block.appendChild(endTimeLabel);

    // Add Start Time Label ONLY for the very first block
    if (index === 0) {
      const startTimeLabel = document.createElement("span");
      startTimeLabel.className = "gantt-start-time";
      startTimeLabel.innerText = item.startTime;
      block.appendChild(startTimeLabel);
    }

    chartWrapper.appendChild(block);
  });

  chartContainer.appendChild(chartWrapper);
}
