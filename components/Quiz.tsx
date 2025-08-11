'use client';
import { getSubjectColor } from '@/lib/utils';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';

interface QuizProps {
  messages: SavedMessage[];
  subject: string;
  name: string;
  onClose: () => void;
}

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const Quiz = ({ messages, subject, name, onClose }: QuizProps) => {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);

  // Generate quiz questions from assistant messages
  const generateQuestions = () => {
    const assistantMessages = messages.filter(msg => msg.role === 'assistant');
    
    if (assistantMessages.length === 0) return [];

    const generatedQuestions: QuizQuestion[] = [];
    
    // Sample question templates based on assistant responses
    assistantMessages.forEach((message, index) => {
      if (message.content.length > 50 && generatedQuestions.length < 5) {
        const content = message.content;
        
        // Generate different types of questions
        const questionTypes = [
          {
            question: `According to ${name}, what was discussed about ${subject}?`,
            correctOption: content.substring(0, 80) + "...",
            wrongOptions: [
              "This topic was not covered in detail",
              "The discussion focused on different concepts",
              "No specific information was provided"
            ]
          },
          {
            question: `What key point did ${name} mention regarding this topic?`,
            correctOption: content.split('.')[0] + ".",
            wrongOptions: [
              "No key points were highlighted",
              "The focus was on practical applications only",
              "Only theoretical aspects were discussed"
            ]
          }
        ];

        const selectedType = questionTypes[Math.floor(Math.random() * questionTypes.length)];
        const options = [selectedType.correctOption, ...selectedType.wrongOptions];
        
        // Shuffle options
        const shuffledOptions = [...options].sort(() => Math.random() - 0.5);
        const correctIndex = shuffledOptions.indexOf(selectedType.correctOption);

        generatedQuestions.push({
          id: index,
          question: selectedType.question,
          options: shuffledOptions,
          correctAnswer: correctIndex,
          explanation: `This was mentioned by ${name} during your conversation about ${subject}.`
        });
      }
    });

    return generatedQuestions.slice(0, 3); // Limit to 3 questions
  };

  useEffect(() => {
    const generated = generateQuestions();
    setQuestions(generated);
  }, [messages]);

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer !== null) {
      const newUserAnswers = [...userAnswers, selectedAnswer];
      setUserAnswers(newUserAnswers);
      
      if (selectedAnswer === questions[currentQuestion].correctAnswer) {
        setScore(score + 1);
      }

      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setShowResult(false);
      } else {
        setQuizCompleted(true);
      }
    }
  };

  const handleShowResult = () => {
    setShowResult(true);
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setQuizCompleted(false);
    setUserAnswers([]);
  };

  if (questions.length === 0) {
    return (
      <div className='bg-white rounded-xl shadow-lg p-6 max-w-2xl mx-auto'>
        <div className='text-center'>
          <div className='w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4'>
            <svg className='w-8 h-8 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z' />
            </svg>
          </div>
          <h3 className='text-xl font-bold text-gray-800 mb-2'>No Quiz Available</h3>
          <p className='text-gray-600 mb-6'>Have a longer conversation with {name} to generate quiz questions.</p>
          <button 
            onClick={onClose}
            className='px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors'
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  if (quizCompleted) {
    return (
      <div className='bg-white rounded-xl shadow-lg p-6 max-w-2xl mx-auto'>
        <div className='text-center'>
          <div 
            className='w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4'
            style={{backgroundColor: getSubjectColor(subject)}}
          >
            <svg className='w-10 h-10 text-white' fill='currentColor' viewBox='0 0 24 24'>
              <path d='M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z'/>
            </svg>
          </div>
          
          <h2 className='text-2xl font-bold text-gray-800 mb-2'>Quiz Completed!</h2>
          <p className='text-gray-600 mb-6'>
            You scored <span className='font-bold text-blue-600'>{score}</span> out of <span className='font-bold'>{questions.length}</span>
          </p>
          
          <div className='flex gap-4 justify-center'>
            <button 
              onClick={restartQuiz}
              className='px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium'
            >
              Retake Quiz
            </button>
            <button 
              onClick={onClose}
              className='px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors font-medium'
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentQuestion];

  return (
    <div className='bg-white rounded-xl shadow-lg p-6 max-w-2xl mx-auto'>
      {/* Header */}
      <div className='flex items-center justify-between mb-6'>
        <div className='flex items-center gap-3'>
          <div 
            className='w-12 h-12 rounded-full flex items-center justify-center'
            style={{backgroundColor: getSubjectColor(subject)}}
          >
            <Image src={`/icons/${subject}.svg`} alt={subject} width={24} height={24} />
          </div>
          <div>
            <h2 className='text-xl font-bold text-gray-800'>Quiz by {name}</h2>
            <p className='text-sm text-gray-500'>Question {currentQuestion + 1} of {questions.length}</p>
          </div>
        </div>
        <button 
          onClick={onClose}
          className='text-gray-400 hover:text-gray-600 transition-colors'
        >
          <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
          </svg>
        </button>
      </div>

      {/* Progress Bar */}
      <div className='w-full bg-gray-200 rounded-full h-2 mb-6'>
        <div 
          className='h-2 rounded-full transition-all duration-300'
          style={{
            width: `${((currentQuestion + 1) / questions.length) * 100}%`,
            backgroundColor: getSubjectColor(subject)
          }}
        />
      </div>

      {/* Question */}
      <div className='mb-6'>
        <h3 className='text-lg font-semibold text-gray-800 mb-4'>
          {currentQ.question}
        </h3>

        {/* Options */}
        <div className='space-y-3'>
          {currentQ.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(index)}
              className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${
                selectedAnswer === index
                  ? showResult
                    ? index === currentQ.correctAnswer
                      ? 'border-green-500 bg-green-50 text-green-800'
                      : 'border-red-500 bg-red-50 text-red-800'
                    : 'border-blue-500 bg-blue-50'
                  : showResult && index === currentQ.correctAnswer
                    ? 'border-green-500 bg-green-50 text-green-800'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              }`}
              disabled={showResult}
            >
              <div className='flex items-center gap-3'>
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  selectedAnswer === index
                    ? showResult
                      ? index === currentQ.correctAnswer
                        ? 'border-green-500 bg-green-500'
                        : 'border-red-500 bg-red-500'
                      : 'border-blue-500 bg-blue-500'
                    : showResult && index === currentQ.correctAnswer
                      ? 'border-green-500 bg-green-500'
                      : 'border-gray-300'
                }`}>
                  {(selectedAnswer === index || (showResult && index === currentQ.correctAnswer)) && (
                    <svg className='w-4 h-4 text-white' fill='currentColor' viewBox='0 0 24 24'>
                      <path d='M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z'/>
                    </svg>
                  )}
                </div>
                <span className='text-sm'>{option}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Explanation */}
      {showResult && (
        <div className='mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200'>
          <p className='text-sm text-blue-800'>
            <span className='font-semibold'>Explanation: </span>
            {currentQ.explanation}
          </p>
        </div>
      )}

      {/* Action Buttons */}
      <div className='flex gap-4'>
        {!showResult ? (
          <button
            onClick={handleShowResult}
            disabled={selectedAnswer === null}
            className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
              selectedAnswer === null
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-blue-500 text-white hover:bg-blue-600 transform hover:scale-105'
            }`}
          >
            Check Answer
          </button>
        ) : (
          <button
            onClick={handleNextQuestion}
            className='px-6 py-3 rounded-lg font-medium bg-green-500 text-white hover:bg-green-600 transition-all duration-200 transform hover:scale-105'
          >
            {currentQuestion < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
          </button>
        )}
      </div>

      {/* Score Display */}
      <div className='mt-4 text-center'>
        <p className='text-sm text-gray-500'>
          Current Score: <span className='font-semibold text-gray-700'>{score}/{currentQuestion + (showResult ? 1 : 0)}</span>
        </p>
      </div>
    </div>
  );
};

export default Quiz;