import React from 'react';
import './quiz.css';

const ResultDisplay = ({ totalQuestions, score, correctAnswers, wrongAnswers, onRestartQuiz }) => {
  return (
    <div className="result">
      <h3>Result</h3>
      <p>
        Total Question: <span>{totalQuestions}</span>
      </p>
      <p>
        Total Score:<span> {score}</span>
      </p>
      <p>
        Correct Answers:<span> {correctAnswers}</span>
      </p>
      <p>
        Wrong Answers:<span> {wrongAnswers}</span>
      </p>
      <button onClick={onRestartQuiz}>Restart Quiz</button>
    </div>
  );
};

export default ResultDisplay;
