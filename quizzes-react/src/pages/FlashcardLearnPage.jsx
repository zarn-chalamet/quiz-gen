import React, { useState } from "react";
import PageLayout from "../layout/PageLayout";
import { motion, AnimatePresence } from "framer-motion";

const FlashcardLearnPage = () => {
  const flashcardData = {
    id: "1",
    title: "React Basics",
    description: "Learn the fundamentals of React.js step by step.",
    img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c",
    cards: [
      { id: 1, question: "What is React?", answer: "A JavaScript library for building user interfaces, particularly single-page applications where data changes over time." },
      { id: 2, question: "What is JSX?", answer: "A syntax extension that lets you write HTML-like code in JavaScript, which React then transforms into actual JavaScript function calls." },
      { id: 3, question: "What are hooks?", answer: "Functions that let you use state and lifecycle features in functional components, introduced in React 16.8." },
      { id: 4, question: "What is Virtual DOM?", answer: "A programming concept where a virtual representation of the UI is kept in memory and synced with the real DOM by a library such as ReactDOM." },
    ],
  };

  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [direction, setDirection] = useState(0); // 0: next, 1: prev
  const [completed, setCompleted] = useState(false);

  const handleNext = () => {
    if (currentIndex < flashcardData.cards.length - 1) {
      setDirection(0);
      setCurrentIndex(prev => prev + 1);
      setFlipped(false);
    } else {
      setCompleted(true);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setDirection(1);
      setCurrentIndex(prev => prev - 1);
      setFlipped(false);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setFlipped(false);
    setCompleted(false);
  };

  const isFinished = currentIndex >= flashcardData.cards.length;
  const currentCard = flashcardData.cards[currentIndex];
  const progress = ((currentIndex + 1) / flashcardData.cards.length) * 100;

  // Card flip variants for animation
  const cardVariants = {
    front: { rotateY: 0 },
    back: { rotateY: 180 }
  };

  // Card transition variants for navigation
  const transitionVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      x: direction > 0 ? -300 : 300,
      opacity: 0
    })
  };

  return (
    <PageLayout>
      <div className="min-h-150 bg-gradient-to-br from-indigo-50 to-purple-50  flex items-center justify-center">
        <div className="max-w-3xl w-full mx-auto my-auto">
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-4"
          >
            <h1 className="text-3xl font-bold text-gray-800 mb-2 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              {flashcardData.title}
            </h1>
            <p className="text-gray-600 text-md max-w-2xl mx-auto">
              {flashcardData.description}
            </p>
          </motion.div>

          {/* Progress Section */}
          {!completed && !isFinished && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-4"
            >
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">
                  Progress
                </span>
                <span className="text-sm font-medium text-gray-700">
                  {currentIndex + 1} / {flashcardData.cards.length}
                </span>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full"
                  initial={{ width: "0%" }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                />
              </div>
            </motion.div>
          )}

          {/* Flashcard Content */}
          <div className="relative h-64 mb-4">
            <AnimatePresence custom={direction} mode="wait">
              {!completed && !isFinished ? (
                <motion.div
                  key={currentIndex}
                  custom={direction}
                  variants={transitionVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0 flex justify-center items-center"
                >
                  <motion.div 
                    className="w-full max-w-md h-60 cursor-pointer perspective-1000"
                    onClick={() => setFlipped(!flipped)}
                    variants={cardVariants}
                    animate={flipped ? "back" : "front"}
                    transition={{ duration: 0.6 }}
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    {/* Front of Card */}
                    <div className="absolute inset-0 bg-white rounded-xl shadow-lg p-4 flex flex-col items-center justify-center backface-hidden border-2 border-indigo-100">
                      <div className="text-center">
                        <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-3">
                          <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
                          </svg>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">Question</h3>
                        <p className="text-gray-700 text-md">{currentCard.question}</p>
                      </div>
                      <div className="mt-4 text-xs text-indigo-600 font-medium flex items-center">
                        <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        Click to reveal answer
                      </div>
                    </div>

                    {/* Back of Card */}
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 to-purple-700 text-white rounded-xl shadow-lg p-4 flex flex-col items-center justify-center backface-hidden"
                         style={{ transform: "rotateY(180deg)" }}>
                      <div className="text-center">
                        <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-3">
                          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                          </svg>
                        </div>
                        <h3 className="text-lg font-semibold mb-2">Answer</h3>
                        <p className="text-white text-md">{currentCard.answer}</p>
                      </div>
                      <div className="mt-4 text-xs text-indigo-200 font-medium flex items-center">
                        <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        Click to see question again
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              ) : (
                <motion.div
                  key="completed"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 flex flex-col items-center justify-center text-center"
                >
                  <div className="w-24 h-24 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">Congratulations!</h2>
                  <p className="text-gray-600 text-lg mb-1">You've completed all flashcards</p>
                  <p className="text-gray-500 text-sm mb-4">Keep practicing to reinforce your knowledge</p>
                  <button
                    onClick={handleRestart}
                    className="px-6 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium rounded-lg hover:from-indigo-600 hover:to-purple-700 transition-all shadow-md hover:shadow-lg text-sm"
                  >
                    Start Again
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Navigation Buttons */}
          {!completed && !isFinished && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex justify-center space-x-3"
            >
              <button
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className="flex items-center px-4 py-2 bg-white text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-all shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed text-sm"
              >
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                </svg>
                Previous
              </button>
              
              <button
                onClick={handleNext}
                className="flex items-center px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium rounded-lg hover:from-indigo-600 hover:to-purple-700 transition-all shadow-sm hover:shadow-md text-sm"
              >
                {currentIndex + 1 < flashcardData.cards.length ? "Next" : "Finish"}
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </PageLayout>
  );
};

export default FlashcardLearnPage;