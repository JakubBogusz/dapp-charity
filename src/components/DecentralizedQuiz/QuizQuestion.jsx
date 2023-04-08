import React from 'react';

const QuizQuestion = ({ question, options, handleSelect }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-medium">{question}</h3>
      <div className="space-y-2">
        {options.map((option, index) => (
          <div key={index} className="flex items-center">
            <input
              type="radio"
              name={question}
              value={option.score}
              onChange={(e) => handleSelect(e, index)}
              className="mr-2 appearance-none"
            />
            <label className="text-gray-700">{option.text}</label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuizQuestion;
