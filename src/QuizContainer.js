import React, { useState, useEffect } from 'react';
import FullScreenBlocker from './FullScreenBlocker';
import ViolationCount from './ViolationCount';
import QuestionDisplay from './QuestionDisplay';
import ResultDisplay from './ResultDisplay';
import quiz from './utils/quizData';
import './quiz.css';

const QuizContainer = () => {
  const [activeQuestion, setActiveQuestion] = useState(() => {
    if (!localStorage.getItem('isInitialized')) {
      localStorage.setItem('isInitialized', true);
      return 0;
    }
    const storedQuestion = localStorage.getItem('activeQuestion');
    return storedQuestion ? parseInt(storedQuestion) : 0;
  });
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
  const [result, setResult] = useState({
    score: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
  });
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isFullScreenSupported, setIsFullScreenSupported] = useState(false);
  const [attemptAllowed, setAttemptAllowed] = useState(false);
  const [violationCount, setViolationCount] = useState(() => {
    const storedViolationCount = localStorage.getItem('violationCount');
    return storedViolationCount ? parseInt(storedViolationCount) : 0;
  });

  const { questions } = quiz;
  const { question, choices, correctAnswer } = questions[activeQuestion];

  useEffect(() => {
    document.addEventListener('visibilitychange', handleVisibilityChange);
    document.addEventListener('fullscreenchange', handleFullScreenChange);

    setIsFullScreenSupported(!!document.fullscreenEnabled || !!document.webkitFullscreenEnabled || !!document.msFullscreenEnabled);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      document.removeEventListener('fullscreenchange', handleFullScreenChange);
    };
  }, []);

  useEffect(() => {
    if (isFullScreen && isFullScreenSupported) {
      setAttemptAllowed(true);
    } else {
      setAttemptAllowed(false);
    }
  }, [isFullScreen, isFullScreenSupported]);

  useEffect(() => {
    const storedState = JSON.parse(localStorage.getItem('quizState'));
    if (storedState) {
      setActiveQuestion(storedState.activeQuestion);
      setSelectedAnswer(storedState.selectedAnswer);
      setShowResult(storedState.showResult);
      setSelectedAnswerIndex(storedState.selectedAnswerIndex);
      setResult(storedState.result);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      'quizState',
      JSON.stringify({
        activeQuestion,
        selectedAnswer,
        showResult,
        selectedAnswerIndex,
        result,
      })
    );
  }, [activeQuestion, selectedAnswer, showResult, selectedAnswerIndex, result]);

  useEffect(() => {
    localStorage.setItem('violationCount', violationCount);
  }, [violationCount]);

  const onClickNext = () => {
    if (!attemptAllowed) return;
    setSelectedAnswerIndex(null);
    setResult((prev) =>
      selectedAnswer
        ? {
            ...prev,
            score: prev.score + 5,
            correctAnswers: prev.correctAnswers + 1,
          }
        : { ...prev, wrongAnswers: prev.wrongAnswers + 1 }
    );
    if (activeQuestion !== questions.length - 1) {
      setActiveQuestion((prev) => prev + 1);
      localStorage.setItem('activeQuestion', activeQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  const onAnswerSelected = (answer, index) => {
    if (!attemptAllowed) return;
    setSelectedAnswerIndex(index);
    if (answer === correctAnswer) {
      setSelectedAnswer(true);
    } else {
      setSelectedAnswer(false);
    }
  };

  const handleVisibilityChange = () => {
    if (document.visibilityState === 'hidden') {
      setViolationCount((prevCount) => prevCount + 1);
    }
  };

  const handleFullScreenChange = () => {
    setIsFullScreen(!!document.fullscreenElement);
    if (!!document.fullscreenElement) {
      setAttemptAllowed(true);
    }
  };

  const enterFullScreen = () => {
    const elem = document.documentElement;
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) {
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
      elem.msRequestFullscreen();
    }
  };

  const restartQuiz = () => {
    localStorage.removeItem('activeQuestion');
    localStorage.removeItem('violationCount');
    setActiveQuestion(0);
    setViolationCount(0);
    setShowResult(false);
    setResult({
      score: 0,
      correctAnswers: 0,
      wrongAnswers: 0,
    });
  };

  return (
    <div className={`quiz-container ${attemptAllowed ? '' : 'blocked'}`}>
      {!isFullScreenSupported && <FullScreenBlocker message="Full-screen mode is not supported in this browser. Please try another browser." />}
      {!isFullScreen && isFullScreenSupported && (
        <FullScreenBlocker message="Please switch to full-screen mode to continue the quiz." onClick={enterFullScreen} buttonText="Switch to Full Screen" />
      )}
      <ViolationCount count={violationCount} />
      {!showResult ? (
        <QuestionDisplay
          questionNo={activeQuestion + 1}
          totalQuestions={questions.length}
          question={question}
          choices={choices}
          correctAnswer={correctAnswer}
          selectedAnswerIndex={selectedAnswerIndex}
          onSelectAnswer={onAnswerSelected}
          onClickNext={onClickNext}
          attemptAllowed={attemptAllowed}
        />
      ) : (
        <ResultDisplay
          totalQuestions={questions.length}
          score={result.score}
          correctAnswers={result.correctAnswers}
          wrongAnswers={result.wrongAnswers}
          onRestartQuiz={restartQuiz}
        />
      )}
    </div>
  );
};

export default QuizContainer;
