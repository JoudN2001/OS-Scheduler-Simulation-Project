export function SJF(processes) {
  const sorted = [...processes].sort((a, b) => a.arrivalTime - b.arrivalTime);
  const solved = [];
  const gantt = [];

  let currentTime = 0;
  const completed = new Set();

  while (completed.size < sorted.length) {
    // Get available processes (arrived & not completed)
    const available = sorted.filter(
      (p) => p.arrivalTime <= currentTime && !completed.has(p.id)
    );

    // If no process available, CPU is idle
    if (available.length === 0) {
      currentTime++;
      continue;
    }

    // Choose process with shortest burst time
    available.sort((a, b) => a.burstTime - b.burstTime);
    const p = available[0];

    const startTime = currentTime;
    const endTime = startTime + p.burstTime;
    const waitingTime = startTime - p.arrivalTime;
    const responseTime = waitingTime; // same in non-preemptive
    const turnaroundTime = endTime - p.arrivalTime;

    solved.push({
      ...p,
      startTime,
      endTime,
      waitingTime,
      responseTime,
      turnaroundTime,
    });

    gantt.push({
      processId: p.id,
      startTime,
      endTime,
    });

    completed.add(p.id);
    currentTime = endTime;
  }

  return { solved, gantt };
}
