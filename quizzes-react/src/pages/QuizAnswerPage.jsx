import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PageLayout from "../layout/PageLayout";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import { useAuth } from "@clerk/clerk-react";
import axios from "axios";
import { apiEndpoints } from "../api/apiEndpoints";

const QuizAnswerPage = () => {
  const { id } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const {getToken} = useAuth();


  const fetchQuiz = async (id) => {
    try {
      const token = await getToken();
      const response = await axios.get(apiEndpoints.FETCH_QUIZ_BY_ID(id),
        {
          headers: {Authorization: `Bearer ${token}`}
        }
      );
      console.log(response.data);
      if(response.status === 200) {
        setQuiz(response.data);
      }
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  }
  // Mock fetch (replace with API call)
  useEffect(() => {
    fetchQuiz(id);
  }, [id]);

  const handleSelect = (opt) => {
    setSelectedOption(opt);
    setShowFeedback(true);
    
    if (opt.isCorrect) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    setShowFeedback(false);
    
    if (currentIndex + 1 < quiz.questions.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
    } else {
      setFinished(true);
    }
  };

  if (!quiz) return (
    <PageLayout>
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-pulse text-center">
          <div className="w-16 h-16 bg-blue-500 rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Loading quiz...</p>
        </div>
      </div>
    </PageLayout>
  );

  const currentQuestion = quiz.questions[currentIndex];
  const progress = ((currentIndex + 1) / quiz.questions.length) * 100;

  return (
    <PageLayout>
      <div className="min-h-150 bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full mx-auto my-auto">
          {!finished ? (
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.4 }}
              className="bg-white rounded-2xl shadow-xl overflow-hidden"
            >
              {/* Header with progress */}
              <div className="p-4 border-b border-gray-100">
                <div className="flex justify-between items-center mb-3">
                  <h1 className="text-xl font-bold text-gray-800">
                    {quiz.title}
                  </h1>
                  <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                    {currentIndex + 1}/{quiz.questions.length}
                  </span>
                </div>
                
                {/* Progress bar */}
                <div className="h-1.5 bg-gray-200 rounded-full">
                  <motion.div 
                    className="h-1.5 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full"
                    initial={{ width: "0%" }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  ></motion.div>
                </div>
              </div>
              
              {/* Question */}
              <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-800 mb-4 leading-relaxed">
                  <span className="text-blue-600">Q{currentIndex + 1}:</span> {currentQuestion.text}
                </h2>

                {/* Options */}
                <div className="space-y-3">
                  {currentQuestion.options.map((opt) => {
                    const isSelected = selectedOption?.id === opt.id;
                    const isCorrect = opt.isCorrect;
                    
                    let optionStyle = "";
                    if (selectedOption) {
                      if (isSelected && isCorrect) {
                        optionStyle = "bg-green-50 border-green-500 text-green-700";
                      } else if (isSelected && !isCorrect) {
                        optionStyle = "bg-red-50 border-red-500 text-red-700";
                      } else if (isCorrect) {
                        optionStyle = "bg-green-50 border-green-400 text-green-600";
                      } else {
                        optionStyle = "bg-gray-50 border-gray-200 text-gray-500";
                      }
                    } else {
                      optionStyle = "bg-white border-gray-200 hover:border-blue-300 hover:bg-blue-50 text-gray-800";
                    }

                    return (
                      <motion.button
                        key={opt.id}
                        onClick={() => !selectedOption && handleSelect(opt)}
                        disabled={!!selectedOption}
                        whileHover={!selectedOption ? { scale: 1.02 } : {}}
                        whileTap={!selectedOption ? { scale: 0.98 } : {}}
                        className={`w-full text-left p-3 border-2 rounded-lg font-medium transition-all flex items-start ${optionStyle}`}
                      >
                        <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full mr-2 flex-shrink-0 ${
                          !selectedOption 
                            ? "bg-blue-100 text-blue-700 text-xs" 
                            : isSelected && isCorrect 
                              ? "bg-green-500 text-white text-xs" 
                              : isSelected && !isCorrect 
                                ? "bg-red-500 text-white text-xs" 
                                : isCorrect
                                  ? "bg-green-500 text-white text-xs"
                                  : "bg-gray-200 text-gray-700 text-xs"
                        }`}>
                          {opt.label}
                        </span>
                        <span className="text-sm mt-0.5">{opt.text}</span>
                      </motion.button>
                    );
                  })}
                </div>

                {/* Feedback */}
                <AnimatePresence>
                  {showFeedback && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className={`mt-4 p-3 rounded-lg ${
                        selectedOption?.isCorrect 
                          ? "bg-green-50 border border-green-200" 
                          : "bg-red-50 border border-red-200"
                      }`}
                    >
                      <div className="flex items-start">
                        <div className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mr-2 ${
                          selectedOption?.isCorrect ? "bg-green-500" : "bg-red-500"
                        }`}>
                          {selectedOption?.isCorrect ? (
                            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                          ) : (
                            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                          )}
                        </div>
                        <p className={selectedOption?.isCorrect ? "text-green-700 text-sm" : "text-red-700 text-sm"}>
                          {selectedOption?.isCorrect 
                            ? "Correct! Well done." 
                            : "That's not quite right. Try again next time!"}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Next button */}
                {selectedOption && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mt-4 flex justify-end"
                  >
                    <button
                      onClick={handleNext}
                      className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium hover:from-blue-600 hover:to-indigo-700 transition-all shadow-sm hover:shadow text-sm"
                    >
                      {currentIndex + 1 < quiz.questions.length ? (
                        <span className="flex items-center">
                          Next Question
                          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                          </svg>
                        </span>
                      ) : (
                        "Finish Quiz"
                      )}
                    </button>
                  </motion.div>
                )}
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl shadow-xl p-6 text-center"
            >
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </motion.div>
              
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Quiz Completed!
              </h2>
              <p className="text-md text-gray-600 mb-2">
                You scored
              </p>
              <div className="text-3xl font-bold text-blue-600 mb-4">
                {score}<span className="text-gray-500">/{quiz.questions.length}</span>
              </div>
              
              <div className="mb-6">
                <div className="bg-gray-100 rounded-full h-2 mx-auto max-w-xs">
                  <div 
                    className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600" 
                    style={{ width: `${(score/quiz.questions.length)*100}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  {((score/quiz.questions.length)*100).toFixed(0)}% Correct
                </p>
              </div>
              
              <div className="flex justify-center space-x-3">
                <button
                  onClick={() => window.location.reload()}
                  className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium hover:from-blue-600 hover:to-indigo-700 transition-all shadow-sm hover:shadow text-sm"
                >
                  Retry Quiz
                </button>
                <button
                  onClick={() => console.log("Review answers")}
                  className="px-4 py-2 rounded-lg bg-gray-100 text-gray-800 font-medium hover:bg-gray-200 transition-all text-sm"
                >
                  Review Answers
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </PageLayout>
  );
};

export default QuizAnswerPage;