export function Priority(processes) {
  // 1. Create a deep copy of processes to track 'remainingTime' without modifying the original input
  let workingProcesses = processes.map((p) => ({
    ...p,
    remainingTime: p.burstTime, // Track how much work is left
    isStarted: false, // Track if it has started for Response Time
    firstStartTime: -1,
  }));

  const solved = [];
  const gantt = [];
  let currentTime = 0;
  let completed = 0;

  // 2. Loop until all processes are completed
  while (completed < workingProcesses.length) {
    // 3. Find processes that have arrived (arrivalTime <= currentTime) AND are not finished
    const available = workingProcesses.filter(
      (p) => p.arrivalTime <= currentTime && p.remainingTime > 0
    );

    // 4. If no process has arrived, move time forward
    if (available.length === 0) {
      currentTime++;
      continue;
    }

    // 5. Sort available processes by Priority (Ascending: 1 is highest priority)
    // If priorities are equal, use Arrival Time as a tie-breaker
    available.sort((a, b) => {
      if (a.priority !== b.priority) {
        return a.priority - b.priority;
      }
      return a.arrivalTime - b.arrivalTime;
    });

    // Pick the highest priority process
    const currentProcess = available[0];

    // 6. Handle Response Time (First time the CPU touches this process)
    if (!currentProcess.isStarted) {
      currentProcess.isStarted = true;
      currentProcess.firstStartTime = currentTime;
    }

    // 7. Execute for 1 unit of time
    // Add to Gantt Chart (Merge with previous if it's the same process)
    if (
      gantt.length > 0 &&
      gantt[gantt.length - 1].processId === currentProcess.id
    ) {
      gantt[gantt.length - 1].endTime++;
    } else {
      gantt.push({
        processId: currentProcess.id,
        startTime: currentTime,
        endTime: currentTime + 1,
      });
    }

    currentProcess.remainingTime--;
    currentTime++;

    // 8. Check if process is finished
    if (currentProcess.remainingTime === 0) {
      completed++;
      const endTime = currentTime;
      const turnaroundTime = endTime - currentProcess.arrivalTime;
      const waitingTime = turnaroundTime - currentProcess.burstTime;
      const responseTime =
        currentProcess.firstStartTime - currentProcess.arrivalTime;

      solved.push({
        ...currentProcess,
        startTime: currentProcess.firstStartTime,
        endTime,
        waitingTime,
        responseTime,
        turnaroundTime,
      });
    }
  }

  return { solved, gantt };
}
