import { FCFS } from "./FCFS.js";

const INITIAL_PROCESSES = [
  { id: 1, arrivalTime: 0, burstTime: 8 },
  { id: 2, arrivalTime: 3, burstTime: 5 },
  { id: 3, arrivalTime: 4, burstTime: 10 },
  { id: 4, arrivalTime: 6, burstTime: 9 },
  { id: 5, arrivalTime: 11, burstTime: 7 },
];

const SolveFCFS = FCFS(INITIAL_PROCESSES);

function getAvarage(solvedProcesses) {
  const avgWaiting = (
    solvedProcesses.reduce((acc, curr) => acc + curr.waitingTime, 0) /
    solvedProcesses.length
  ).toFixed(2);

  const avgResponse = (
    solvedProcesses.reduce((acc, curr) => acc + curr.responseTime, 0) /
    solvedProcesses.length
  ).toFixed(2);

  const avgTurnaround = (
    solvedProcesses.reduce((acc, curr) => acc + curr.turnaroundTime, 0) /
    solvedProcesses.length
  ).toFixed(2);

  return { avgWaiting, avgResponse, avgTurnaround };
}

console.log(getAvarage(SolveFCFS));
