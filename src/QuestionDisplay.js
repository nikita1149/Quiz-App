import React from 'react';
import './quiz.css';

const QuestionDisplay = ({
  questionNo,
  totalQuestions,
  question,
  choices,
  correctAnswer,
  selectedAnswerIndex,
  onSelectAnswer,
  onClickNext,
  attemptAllowed,
}) => {
  const addLeadingZero = (number) => (number > 9 ? number : `0${number}`);

  return (
    <div>
      <div>
        <span className="active-question-no">{addLeadingZero(questionNo)}</span>
        <span className="total-question">/{addLeadingZero(totalQuestions)}</span>
      </div>
      <h2>{question}</h2>
      <ul>
        {choices.map((answer, index) => (
          <li
            onClick={() => onSelectAnswer(answer, index)}
            key={answer}
            className={selectedAnswerIndex === index ? 'selected-answer' : null}
          >
            {answer}
          </li>
        ))}
      </ul>
      <div className="flex-right">
        <button onClick={onClickNext} disabled={!attemptAllowed || selectedAnswerIndex === null}>
          {questionNo === totalQuestions ? 'Finish' : 'Next'}
        </button>
      </div>
    </div>
  );
};

export default QuestionDisplay;
