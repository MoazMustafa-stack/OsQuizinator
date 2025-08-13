import { useState, useEffect, useRef } from 'react';
import './App.css';
import { QUESTIONS } from './data/questions';

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
            <p className="text-secondary-color">Attempted {answers.filter(a => a !== null).length} of {QUESTIONS.length}</p>
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

        {/* Submit*/}
        <div className="flex justify-end mb-4">
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