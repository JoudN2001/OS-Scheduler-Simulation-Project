export function FCFS(processes) {
  const sorted = [...processes].sort((a, b) => a.arrivalTime - b.arrivalTime);
  const solved = [];
  const gantt = [];
  let currentTime = 0;

  sorted.forEach((p) => {
    if (currentTime < p.arrivalTime) {
      currentTime = p.arrivalTime;
    }

    const startTime = currentTime;
    const endTime = startTime + p.burstTime;
    const waitingTime = startTime - p.arrivalTime;
    const responseTime = waitingTime;
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
    currentTime = endTime;
  });

  return { solved, gantt };
}
