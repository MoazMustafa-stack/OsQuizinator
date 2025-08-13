export interface Question {
  q: string;
  module: string;
  options: string[];
  a: number; 
}

export const QUESTIONS: Question[] = [
  { q: "An operating system is best described as:", module: "Module 1", options: ["A collection of user applications", "A program acting as an intermediary between user and hardware", "Only the GUI shell on a computer", "A compiler for system programs"], a: 1},
  { q: "Which OS structure moves most services into user space and uses message passing between modules?", module: "Module 1", options: ["Monolithic", "Layered", "Microkernel", "Modular"], a: 2},
  { q: "Which of the following is not an OS service?", module: "Module 1", options: ["File-system manipulation", "CPU scheduling", "Program compilation", "Error detection"], a: 2},
  { q: "Dual-mode operation distinguishes:", module: "Module 1", options: ["User mode and kernel mode", "Batch mode and interactive mode", "Preemptive and non-preemptive modes", "Single and multi-threaded modes"], a: 0},
  { q: "The guiding principle of protection that says give the minimum privileges required is:", module: "Module 1", options: ["Principle of maximum privilege", "Need-to-know", "Principle of least privilege", "Domain switching"], a: 2},
  { q: "Which OS structuring model is exemplified by traditional UNIX (kernel + system programs)?", module: "Module 1", options: ["Simple structure (MS-DOS)", "Microkernel", "Monolithic with system programs separated (traditional UNIX)", "Layered strictly separated"], a: 2},
  { q: "Which of these is a detriment of microkernel systems?", module: "Module 1", options: ["Easier to port", "More secure", "Performance overhead due to user↔kernel messaging", "Less code in kernel"], a: 2},
  { q: "An access matrix represents protection by rows = ____ and columns = ____.", module: "Module 1", options: ["Users, permissions", "Objects, domains", "Domains, objects", "Rights, users"], a: 2},
  { q: "Which is a correct method of passing parameters to a system call?", module: "Module 2", options: ["Only via stack", "Registers, block (memory), or stack", "Only via a global variable", "Only via files on disk"], a: 1},
  { q: "The fork() system call in UNIX:", module: "Module 2", options: ["Replaces the current process image with a new program", "Creates a child process as a duplicate of the parent", "Terminates the parent process", "Allocates a new file descriptor"], a: 1},
  { q: "Which of the following is part of the PCB (Process Control Block)?", module: "Module 2", options: ["Program counter, registers, scheduling info, open files", "Only program code text", "Only user-visible file names", "Compiler settings"], a: 0},
  { q: "A process in the ready state is:", module: "Module 2", options: ["Waiting for an I/O event", "Running on CPU", "Ready and waiting to be assigned to a processor", "Terminated and awaiting cleanup"], a: 2},
  { q: "Which thread model maps each user-level thread to a kernel thread (one-to-one)?", module: "Module 2", options: ["Many-to-One", "One-to-One", "Many-to-Many", "Two-level"], a: 1},
  { q: "Which of the following is not a stated benefit of multithreading?", module: "Module 2", options: ["Responsiveness", "Resource sharing", "Reduced concurrency", "Scalability"], a: 2},
  { q: "Which API is a POSIX standard for threads?", module: "Module 2", options: ["Win32 threads", "Pthreads", ".NET threads", "JavaScript workers"], a: 1},
  { q: "If a parent process terminates without wait() and child stays, child becomes:", module: "Module 2", options: ["Zombie", "Orphan", "Daemon", "Swap process"], a: 1},
  { q: "System calls are typically accessed via:", module: "Module 2", options: ["Hardware interrupts only", "High-level APIs / runtime libraries (e.g., C library calling write)", "Direct binary hacking", "Compiler directives"], a: 1},
  { q: "Which of these is not a system call category?", module: "Module 2", options: ["Process control", "File management", "Device management", "Image rendering API"], a: 3},
  { q: "Which scheduler selects which process should be executed next and is invoked frequently?", module: "Module 3", options: ["Long-term scheduler", "Medium-term scheduler", "Short-term (CPU) scheduler", "Priority scheduler only"], a: 2},
  { q: "FCFS scheduling suffers from which effect when a long process arrives first?", module: "Module 3", options: ["Starvation", "Convoy effect", "Aging", "Thrashing"], a: 1},
  { q: "SJF (Shortest Job First) is optimal in minimizing:", module: "Module 3", options: ["Maximum turnaround time", "Average waiting time (for a given set)", "Context switch overhead", "Memory usage"], a: 1},
  { q: "In Round Robin scheduling, what happens if time quantum q is too small relative to context switch time?", module: "Module 3", options: ["Throughput increases dramatically", "Overhead dominates; poor performance", "System becomes non-preemptive", "Starvation of short jobs"], a: 1},
  { q: "Which scheduling algorithm can cause starvation of low-priority processes unless aging is used?", module: "Module 3", options: ["Round Robin", "Priority scheduling", "FCFS", "SJF"], a: 1},
  { q: "The four necessary conditions for deadlock include all except:", module: "Module 3", options: ["Mutual exclusion", "Hold and wait", "Preemption", "Circular wait"], a: 2},
  { q: "The Banker's algorithm is used for:", module: "Module 3", options: ["Deadlock detection only", "Deadlock avoidance (safety)", "File allocation", "Page replacement"], a: 1},
  { q: "Which scheduling policy partitions the ready queue into separate queues and may permanently assign a process to a queue?", module: "Module 3", options: ["Multilevel queue scheduling", "Round robin", "SJF", "Priority with aging"], a: 0},
  { q: "If 80% of CPU bursts are shorter than q (time quantum), RR behaves similar to:", module: "Module 3", options: ["FIFO / FCFS (if q large)", "Priority scheduling", "SJF (if q small)", "Real-time scheduling"], a: 0},
  { q: "Processor affinity refers to:", module: "Module 3", options: ["A process preferring a particular processor/core to improve cache performance", "A hardware device affinity for DMA", "Memory allocation policy in NUMA only", "Queue ordering in multilevel queues"], a: 0},
  { q: "In a layered operating system, the main advantage is:", module: "Module 1", options: ["Simplicity of design and debugging", "No overhead", "Direct hardware access from all layers", "Random execution order"], a: 0},
  { q: "What is the main disadvantage of FCFS scheduling?", module: "Module 3", options: ["Starvation of long processes", "Convoy effect", "High context switch time", "Requires knowing burst time"], a: 1},
  { q: "Which scheduling algorithm is most suitable for time-sharing systems?", module: "Module 3", options: ["FCFS", "SJF", "Round Robin", "Priority"], a: 2},
  { q: "What is a safe state in deadlock avoidance?", module: "Module 3", options: ["A state where deadlock is impossible", "A state with no mutual exclusion", "A state where all processes are blocked", "A state where processes hold no resources"], a: 0},
  { q: "What is the purpose of the medium-term scheduler?", module: "Module 3", options: ["Selects which process to execute next", "Swaps processes out of memory to reduce degree of multiprogramming", "Loads programs into memory", "Manages CPU registers"], a: 1},
  { q: "Which type of system call deals with changing file attributes?", module: "Module 2", options: ["Process control", "File management", "Device management", "Information maintenance"], a: 3},
  { q: "In the context of process synchronization, what does 'busy waiting' mean?", module: "Module 3", options: ["A process waits actively in a loop checking a condition", "A process is waiting for user input", "A process is in I/O wait state", "A process is queued for CPU"], a: 0},
  { q: "Which scheduling algorithm is prone to the convoy effect?", module: "Module 3", options: ["FCFS", "SJF", "Priority", "Round Robin"], a: 0},
  { q: "In demand paging, what is a 'page fault'?", module: "Module 3", options: ["An error due to corrupt page data", "A page not present in main memory when referenced", "A page with invalid permissions", "A hardware malfunction"], a: 1}
];
