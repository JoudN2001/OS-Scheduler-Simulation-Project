# **Web-Based CPU Scheduling Algorithms Simulation**

A comprehensive, interactive simulation tool designed to visualize the behavior of various CPU scheduling algorithms in a multitasking operating system. This project was developed as part of the **Operating Systems** course at **WISE University** to demonstrate process management, CPU utilization, and performance metrics analysis.

## **📖 Project Overview**

CPU scheduling is a critical OS function that determines which process runs when multiple processes compete for the CPU. This web-based simulator allows users to input custom process data, execute different scheduling algorithms, and analyze the results through dynamic visualizations and detailed metrics.

### **Key Objectives**

- **Visualize Execution:** Dynamic Gantt charts showing the precise timing of process execution.
- **Analyze Performance:** Automatically calculate and compare Turnaround Time (TAT), Waiting Time (WT), and Response Time (RT).
- **Compare Strategies:** Detailed summary dashboard to evaluate algorithm efficiency based on average metrics.

## **🚀 Features**

- **Supported Algorithms:**
  1. **FCFS (First-Come, First-Served):** Non-preemptive. Serves processes in the exact order of arrival.
  2. **SJF (Shortest Job First):** Non-preemptive. Prioritizes the process with the smallest burst time to minimize waiting time.
  3. **Round Robin (RR):** Preemptive. Allocates a fixed Time Quantum to each process, ensuring fair CPU sharing.
  4. **Priority Scheduling:** Preemptive. Executes the highest priority process available, switching immediately if a more urgent process arrives.
- **Interactive Input:**
  - Dynamic addition of processes.
  - Configuration for Arrival Time, Burst Time, and Priority.
  - Adjustable Time Quantum slider for Round Robin.
- **Mobile-First Design:** A responsive, dark-themed UI optimized for both desktop and mobile devices.

## **👥 Team Members**

| Name                  | Student ID | Role                                    |
| :-------------------- | :--------- | :-------------------------------------- |
| **Joud Kayyali**      | 3230601030 | Lead Architect (Logic & Verification)   |
| **Ibraheem Abdullah** | 3230605046 | Systems Integrator (DOM & Events)       |
| **Alnader Ahmad**     | 3230601029 | UI/UX Engineer (Visualization & Layout) |

**Instructor:** Dr. Abdullah Al Zaqebah

## **🛠️ Technology Stack**

- **Core Logic:** Vanilla JavaScript (ES6+) \- Simulates the OS Kernel and Process Control Blocks (PCB).
- **Interface:** HTML5 & CSS3 \- Custom "Mobile-First" layout using Flexbox and Grid.
- **Dependencies:** None (Zero external frameworks used).

## **📂 Project Structure**

```
/
├── docs/               # Project documentation (Proposals, Phase Reports)
├── src/                # Source Code
│   ├── css/            # Stylesheets (style.css, normalize.css)
│   ├── js/             # Simulation Logic
│   │   ├── FCFS.js     # First-Come, First-Served Implementation
│   │   ├── SJF.js      # Shortest Job First Implementation
│   │   ├── RR.js       # Round Robin Implementation
│   │   ├── Priority.js # Priority Scheduling Implementation
│   │   └── script.js   # Main Controller
│   └── index.html      # Application Entry Point
└── README.md           # Project Documentation
```

## **🏁 How to Run**

### **Live Demo**

**👉 [Launch Simulator](https://joudn2001.github.io/OS-Scheduler-Simulation-Project)**

### **Local Installation**

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/JoudN2001/OS-Scheduler-Simulation-Project.git
   ```
2. **Navigate to the folder:**

   ```
   cd OS-Scheduler-Simulation-Project
   ```

3. **Launch the Simulator:**
   - Open the `src/index.html` file in any modern web browser (Chrome, Edge, Firefox).

**Note for GitHub Pages:** If viewing online, ensure the deployment source is set to the correct directory or use the direct link to `src/index.html`.

## **📊 Metrics Definitions**

The simulation calculates the following for every process:

- **Turnaround Time (TAT):** Completion Time \- Arrival Time
- **Waiting Time (WT):** Turnaround Time \- Burst Time
- **Response Time (RT):** Time of First Execution \- Arrival Time

© 2026 Faculty of Information Technology, WISE University.
