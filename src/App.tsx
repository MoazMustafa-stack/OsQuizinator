import { useState, useEffect, useRef } from 'react';
import './App.css';

interface Question {
  q: string;
  module: string;
  options: string[];
  a: number;
}

const QUESTIONS: Question[] = [
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

function App() {
  const [current, setCurrent] = useState<number>(0);
  const [answers, setAnswers] = useState<(number | null)[]>(Array(QUESTIONS.length).fill(null));
  const [elapsed, setElapsed] = useState<number>(0);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const autoTimer = useRef<number | null>(null);

  useEffect(() => {
    let id: number | undefined;
    if (!submitted) {
      id = window.setInterval(() => {
        setElapsed((e) => e + 1);
      }, 1000);
    }
    return () => {
      if (id !== undefined) {
        window.clearInterval(id);
      }
    };
  }, [submitted]);

  useEffect(() => {
    return () => {
      if (autoTimer.current !== null) {
        window.clearTimeout(autoTimer.current);
        autoTimer.current = null;
      }
    };
  }, [current]);

  const fmtTime = (s: number): string => 
    `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

  

  const selectOption = (idx: number): void => {
    if (submitted) return;
    const updated = [...answers];
    updated[current] = idx;
    setAnswers(updated);

    if (autoTimer.current !== null) {
      window.clearTimeout(autoTimer.current);
      autoTimer.current = null;
    }

    autoTimer.current = window.setTimeout(() => {
      if (!submitted) {
        setCurrent((prev) => (prev < QUESTIONS.length - 1 ? prev + 1 : prev));
      }
      autoTimer.current = null;
    }, 2000);
  };

  const submitQuiz = (): void => {
    setSubmitted(true);
  };

  const calculateScore = (): number => {
    return answers.reduce((score: number, answer: number | null, idx: number) => {
      return answer !== null && answer === QUESTIONS[idx].a ? score + 1 : score;
    }, 0);
  };

  // const goToQuestion = (idx: number): void => {
  //   setCurrent(idx);
  // };

  const restartQuiz = (): void => {
    setCurrent(0);
    setAnswers(Array(QUESTIONS.length).fill(null));
    setElapsed(0);
    setSubmitted(false);
  };

  if (submitted) {
    const score = calculateScore();
    const percentage = Math.round((score / QUESTIONS.length) * 100);
    
    return (
      <div className="min-h-screen bg-light-bg flex items-center justify-center p-4">
        <div className="card p-8 w-full max-w-2xl">
          <div style={{ textAlign: 'center', color: 'var(--text-light)', marginBottom: '0.5rem' }}>
            Made by Moaz Mustafa —
            <a
              href="https://github.com/MoazMustafa-stack"
              target="_blank"
              rel="noopener noreferrer"
              style={{ marginLeft: 6, color: 'var(--primary-color)', fontWeight: 600 }}
            >
              GitHub
            </a>
          </div>
          <h1 className="text-center mb-6">Quiz Results</h1>
          <div className="text-center mb-8">
            <div className="text-5xl font-bold text-primary-color mb-2">{percentage}%</div>
            <p className="text-secondary-color">
              You got {score} out of {QUESTIONS.length} questions correct
            </p>
          </div>
          
          <div className="mb-8">
            <h2 className="mb-4">Review your answers:</h2>
            <div className="space-y-4">
              {QUESTIONS.map((q, idx) => (
                <div 
                  key={idx}
                  style={{
                    padding: '1rem',
                    borderRadius: '8px',
                    border: '1px solid var(--border-color)',
                    background: answers[idx] === q.a ? '#f0fdf4' : '#fef2f2',
                  }}
                >
                  <div style={{ fontWeight: 700, marginBottom: 4 }}>Q{idx + 1}. {q.q}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-light)', marginBottom: 8 }}>Module: {q.module}</div>
                  <div>
                    {q.options.map((opt, optIdx) => {
                      const isCorrect = optIdx === q.a;
                      const isUserPick = optIdx === answers[idx];
                      return (
                        <div
                          key={optIdx}
                          style={{
                            padding: '8px 10px',
                            borderRadius: 6,
                            marginBottom: 6,
                            color: isCorrect ? 'var(--success-color)' : 'var(--text-color)',
                            fontWeight: isCorrect ? 700 : 400,
                            background: isCorrect ? '#ecfdf5' : isUserPick && !isCorrect ? '#fee2e2' : '#f9fafb',
                          }}
                        >
                          {opt}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex justify-center">
            <button 
              onClick={restartQuiz}
              className="btn btn-primary"
            >
              Restart Quiz
            </button>
          </div>
        </div>
      </div>
    );
  }

  const currentQuestion = QUESTIONS[current];
  const progress = ((current + 1) / QUESTIONS.length) * 100;

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--light-bg)',
        padding: '1rem',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 720,
          background: 'var(--card-bg)',
          borderRadius: '12px',
          boxShadow: 'var(--shadow)',
          padding: '24px',
        }}
      >
        <div style={{ textAlign: 'center', color: 'var(--text-light)', marginBottom: 8 }}>
          Made by Moaz Mustafa —
          <a
            href="https://github.com/MoazMustafa-stack"
            target="_blank"
            rel="noopener noreferrer"
            style={{ marginLeft: 6, color: 'var(--primary-color)', fontWeight: 600 }}
          >
            GitHub
          </a>
        </div>
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1>OS Quiz</h1>
            <p className="text-secondary-color">Question {current + 1} of {QUESTIONS.length}</p>
          </div>
          <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
            Time: {fmtTime(elapsed)}
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
          <div 
            className="bg-primary-color h-2.5 rounded-full transition-all duration-300" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        {/* Question */}
        <div className="mb-6">
          <p className="text-secondary-color mb-1">{currentQuestion.module}</p>
          <h2 className="mb-6">{currentQuestion.q}</h2>
          
          <div style={{ maxWidth: 640, margin: '0 auto' }}>
            {currentQuestion.options.map((option, idx) => {
              const isSelected = answers[current] === idx;
              const isCorrect = idx === currentQuestion.a;
              // Reveal feedback as soon as user selects an option on this question
              const reveal = answers[current] !== null;
              const isIncorrectSelected = reveal && isSelected && !isCorrect;

              const optionStyle: React.CSSProperties = {
                padding: '1rem',
                borderRadius: '8px',
                cursor: submitted ? 'default' : 'pointer',
                transition: 'background-color .2s, border-color .2s, transform .1s',
                border: '2px solid',
                borderColor: reveal && isCorrect
                  ? 'var(--success-color)'
                  : isSelected
                  ? 'var(--primary-color)'
                  : 'var(--border-color)',
                backgroundColor: reveal && isCorrect
                  ? '#ecfdf5' /* green-50 */
                  : isSelected
                  ? '#eff6ff' /* blue-50 */
                  : 'white',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '12px',
              };

              const badgeStyle: React.CSSProperties = {
                width: 32,
                height: 32,
                borderRadius: '9999px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 600,
                border: '2px solid',
                borderColor: reveal && isCorrect
                  ? '#86efac' /* green-300 */
                  : isSelected
                  ? '#93c5fd' /* blue-300 */
                  : 'var(--border-color)',
                color: reveal && isCorrect
                  ? '#047857' /* green-700 */
                  : isSelected
                  ? '#1d4ed8' /* blue-700 */
                  : '#374151',
                background: reveal && isCorrect
                  ? '#dcfce7' /* green-100 */
                  : isSelected
                  ? '#dbeafe' /* blue-100 */
                  : 'transparent',
              };

              const rightLabelStyle: React.CSSProperties = {
                marginLeft: 'auto',
                fontWeight: 700,
                color: reveal && isCorrect
                  ? 'var(--success-color)'
                  : isIncorrectSelected
                  ? 'var(--error-color)'
                  : 'inherit',
              };

              return (
                <div
                  key={idx}
                  onClick={() => !submitted && selectOption(idx)}
                  style={optionStyle}
                >
                  <div style={badgeStyle}>{String.fromCharCode(65 + idx)}</div>
                  <span style={{ color: 'var(--text-color)' }}>{option}</span>
                  {reveal && isCorrect && (
                    <span style={rightLabelStyle}>✓ Correct</span>
                  )}
                  {isIncorrectSelected && (
                    <span style={rightLabelStyle}>✗ Incorrect</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 16,
            gap: 12,
          }}
        >
          <button
            onClick={() => setCurrent(prev => Math.max(0, prev - 1))}
            disabled={current === 0}
            style={{
              padding: '10px 16px',
              borderRadius: 8,
              border: '1px solid',
              borderColor: current === 0 ? 'var(--border-color)' : 'var(--primary-color)',
              background: current === 0 ? '#e5e7eb' : 'var(--primary-color)',
              color: current === 0 ? '#6b7280' : '#ffffff',
              cursor: current === 0 ? 'not-allowed' : 'pointer',
              fontWeight: 600,
            }}
          >
            ← Previous
          </button>

          <div style={{ color: 'var(--text-light)', fontSize: 14 }}>
            Question {current + 1} of {QUESTIONS.length}
          </div>

          <button
            onClick={submitQuiz}
            disabled={answers[current] === null}
            style={{
              padding: '10px 16px',
              borderRadius: 8,
              border: '1px solid',
              borderColor: answers[current] === null ? 'var(--border-color)' : 'var(--success-color)',
              background: answers[current] === null ? '#e5e7eb' : 'var(--success-color)',
              color: answers[current] === null ? '#6b7280' : '#ffffff',
              cursor: answers[current] === null ? 'not-allowed' : 'pointer',
              fontWeight: 700,
              minWidth: 110,
            }}
          >
            Submit
          </button>

          <button
            onClick={() => setCurrent(prev => Math.min(QUESTIONS.length - 1, prev + 1))}
            disabled={current === QUESTIONS.length - 1}
            style={{
              padding: '10px 16px',
              borderRadius: 8,
              border: '1px solid',
              borderColor: current === QUESTIONS.length - 1 ? 'var(--border-color)' : 'var(--primary-color)',
              background: current === QUESTIONS.length - 1 ? '#e5e7eb' : 'var(--primary-color)',
              color: current === QUESTIONS.length - 1 ? '#6b7280' : '#ffffff',
              cursor: current === QUESTIONS.length - 1 ? 'not-allowed' : 'pointer',
              fontWeight: 600,
            }}
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;