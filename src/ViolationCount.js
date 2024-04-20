import React from 'react';
import './quiz.css';

const ViolationCount = ({ count }) => {
  return (
    <div className="violation-count">
      Violation count: {count}
    </div>
  );
};

export default ViolationCount;
