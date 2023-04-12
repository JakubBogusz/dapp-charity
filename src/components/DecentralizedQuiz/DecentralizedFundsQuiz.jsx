import React, { useState } from 'react';
import QuizQuestion from './QuizQuestion';
import quizData from "./logic";
import { Link } from 'react-router-dom';

const DecentralizedFundsQuiz = () => {
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [answers, setAnswers] = useState(Array(quizData.length).fill(null));

  const handleSelect = (e, index) => {
    const newAnswers = [...answers];
    newAnswers[index] = parseInt(e.target.value);
    setAnswers(newAnswers);
  };

  const getTitle = () => {
    const percentageScore = (score / quizData.length) * 100;
    if (!completed) {
      return "Not sure if you're ready to create your own decentralized charity project? Check our quiz and decide!";
    } else if (percentageScore >= 60) {
      return "Congratulations! You're ready to create your own decentralized charity project!";
    } else {
      return "It's okay! Keep learning about decentralized funds and cryptocurrencies.";
    }
  };

  const getRecommendation = () => {
    if (score >= quizData.length - 1) {
      return (
        <>
          <p>You seem quite advanced in the world of decentralized funds and cryptocurrencies!
            We recommend joining our platform and creating your own project with us.
          </p>
          <Link to="/">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
              Join Now
            </button>
          </Link>
        </>
      );
    } else {
      return (
        <>
          <p>
            It seems like you might still be a beginner in the world of cryptocurrencies and decentralized funds. We recommend learning more on websites like{' '}
            <a href="https://www.binance.com/" target="_blank" rel="noreferrer" className="text-blue-500 underline">
              Binance
            </a>
            .
          </p>
        </>
      );
    }
  };

  const handleSubmit = () => {
    if (answers.every((answer) => answer !== null)) {
      setScore(answers.reduce((a, b) => a + b, 0));
      setCompleted(true);
    } else {
      alert("Please mark the answers");
    }
  };

  return (
    <div id="decentralizedFundsQuiz" className="max-w-2xl mx-auto py-8 px-4 mt-8 mb-12 bg-white shadow-lg rounded-lg sm:mt-18">
      <h2 className="text-2xl font-semibold mb-4">
        {getTitle()}
      </h2>
      <div className="space-y-8">
        {!completed &&
          quizData.map((questionData, index) => (
            <QuizQuestion key={index} question={questionData.question} options={questionData.options} handleSelect={(e) => handleSelect(e, index)} />
          ))}
        {completed && <div className="mt-8">{getRecommendation()}</div>}
      </div>
      {!completed && (
        <button
          onClick={handleSubmit}
          className="w-2/3 mt-8 py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md
           hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 mx-auto block"
        >
          Submit
        </button>
      )}
    </div>
  );
};

export default DecentralizedFundsQuiz;
