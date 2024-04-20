const quiz = {
    topic: 'Javascript',
    level: 'Beginner',
    totalQuestions: 10,
    perQuestionScore: 5,
    questions: [
      {
        question: 'Which lifecycle method is invoked immediately after a component is inserted into the DOM in React?',
        choices: ['componentDidMount()', 'componentWillUnmount()', 'componentWillMount()', 'render()'],
        type: 'MCQs',
        correctAnswer: 'componentDidMount()',
      },
      {
        question: 'What function is used to change the state in React?',
        choices: ['setState()', 'changeState()', 'modifyState()', 'updateState()'],
        type: 'MCQs',
        correctAnswer: 'setState()',
      },
      {
        question: 'What does JSX stand for in React?',
        choices: ['JavaScript XML', 'Java Syntax Extension', 'JavaScript Extension', 'JavaScript and XML'],
        type: 'MCQs',
        correctAnswer: 'JavaScript XML',
      },
      {
        question: 'Which of the following is NOT a core concept of React?',
        choices: ['State', 'Props', 'Methods', 'Components'],
        type: 'MCQs',
        correctAnswer: 'Methods',
      },
      {
        question: 'What is used to pass data to a component from outside in React?',
        choices: ['Props', 'State', 'Variables', 'Methods'],
        type: 'MCQs',
        correctAnswer: 'Props',
      },
      {
        question: 'Which method in a React component should be used to render the component?',
        choices: ['render()', 'display()', 'show()', 'update()'],
        type: 'MCQs',
        correctAnswer: 'render()',
      },
      {
        question: 'In React, what is used to render multiple components in a single container?',
        choices: ['Fragment', 'ComponentGroup', 'Container', 'Wrapper'],
        type: 'MCQs',
        correctAnswer: 'Fragment',
      },
      {
        question: 'Which React hook is used to handle side effects in functional components?',
        choices: ['useEffect()', 'useState()', 'useContext()', 'useReducer()'],
        type: 'MCQs',
        correctAnswer: 'useEffect()',
      },
      {
        question: 'What is the main purpose of the React Router library?',
        choices: ['Client-side routing', 'Server-side routing', 'Data fetching', 'State management'],
        type: 'MCQs',
        correctAnswer: 'Client-side routing',
      },
      {
        question: 'Which of the following is a popular state management library for React?',
        choices: ['Redux', 'Axios', 'React Router', 'Jest'],
        type: 'MCQs',
        correctAnswer: 'Redux',
      },
    ],
  }
  export default quiz;