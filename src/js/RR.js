export function RR(processes, timeQuantum) {
  const sorted = [...processes].sort((a, b) => a.arrivalTime - b.arrivalTime);
  const n = sorted.length;

  const solved = [];
  const gantt = [];
  const readyQueue = [];
  let currentTime = 0;
  let completed = 0;
  let arrivalIndex = 0;

  let workingProcesses = sorted.map((p) => ({
    ...p,
    remainingTime: p.burstTime,
    firstStartTime: null, // To calculate Response Time later
    isCompleted: false,
  }));

  while (completed < n) {
    while (
      arrivalIndex < n &&
      workingProcesses[arrivalIndex].arrivalTime <= currentTime
    ) {
      readyQueue.push(workingProcesses[arrivalIndex]);
      arrivalIndex++;
    }

    if (readyQueue.length === 0) {
      if (arrivalIndex < n) {
        currentTime = workingProcesses[arrivalIndex].arrivalTime;
        continue;
      } else {
        break;
      }
    }

    const currentProcess = readyQueue.shift();

    if (currentProcess.firstStartTime === null) {
      currentProcess.firstStartTime = currentTime;
    }

    let timeSlice = Math.min(currentProcess.remainingTime, timeQuantum);
    let startTime = currentTime;
    let endTime = startTime + timeSlice;

    gantt.push({
      processId: currentProcess.id,
      startTime: startTime,
      endTime: endTime,
    });

    currentProcess.remainingTime -= timeSlice;
    currentTime = endTime;

    while (
      arrivalIndex < n &&
      workingProcesses[arrivalIndex].arrivalTime <= currentTime
    ) {
      readyQueue.push(workingProcesses[arrivalIndex]);
      arrivalIndex++;
    }

    if (currentProcess.remainingTime > 0) {
      readyQueue.push(currentProcess);
    } else {
      completed++;
      currentProcess.isCompleted = true;
      const finalEndTime = currentTime;

      const turnaroundTime = finalEndTime - currentProcess.arrivalTime;
      const waitingTime = turnaroundTime - currentProcess.burstTime;
      const responseTime =
        currentProcess.firstStartTime - currentProcess.arrivalTime;

      solved.push({
        ...currentProcess,
        startTime: currentProcess.firstStartTime,
        endTime: finalEndTime,
        waitingTime,
        responseTime,
        turnaroundTime,
        remainingTime: undefined,
        firstStartTime: undefined,
        isCompleted: undefined,
      });
    }
  }

  solved.sort((a, b) => a.id.localeCompare(b.id, undefined, { numeric: true }));

  return { solved, gantt };
}
