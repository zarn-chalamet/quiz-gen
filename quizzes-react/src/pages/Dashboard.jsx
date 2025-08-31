import React, { useState, useEffect } from "react";
import PageLayout from "../layout/PageLayout";
import { Search, BookOpen, Layers, Eye, MoreVertical, Plus, Filter, FileText, Clock } from "lucide-react";
import test from "../assets/test.jpg";
import toast from "react-hot-toast";
import { useAuth } from "@clerk/clerk-react";
import axios from "axios";
import { apiEndpoints } from "../api/apiEndpoints";
import defaultImage from "../assets/test.jpg"
import { useNavigate } from "react-router-dom";

const Dashboard = () => {

  const [activeTab, setActiveTab] = useState("quizzes");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("recent");
  const {getToken} = useAuth();

  const navigate = useNavigate();

  // Mock data matching your DTO structure
  const [quizzes, setQuizzes] = useState([]);

  const [flashcards, setFlashcards] = useState([]);

  const fetchQuizzes = async () => {
    try {
      const token = await getToken();
      const response = await axios.get(apiEndpoints.FETCH_QUIZZES,
        {
          headers: {Authorization: `Bearer ${token}`}
        }
      );
      console.log(response.data);
      if(response.status === 200) {
        setQuizzes(response.data);
      }
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  }

  const fetchFlashcards = async () => {
    try {
      const token = await getToken();
      const response = await axios.get(apiEndpoints.FETCH_FLASHCARDS,
        {
          headers: {Authorization: `Bearer ${token}`}
        }
      );
      console.log(response.data);
      if(response.status === 200) {
        setFlashcards(response.data);
      }
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  }

  useEffect(()=> {
    if(activeTab === 'quizzes'){
      fetchQuizzes();
    } else{
      fetchFlashcards();
    }

  },[activeTab]);

  // Filter based on search
  const filteredQuizzes = quizzes.filter((q) =>
    q.title.toLowerCase().includes(search.toLowerCase())
  );
  const filteredFlashcards = flashcards.filter((f) =>
    f.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <PageLayout>
      <div className="px-4 py-6 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Learning Materials</h1>
          <p className="text-gray-600 mt-2">Learn quizzes and flashcards</p>
        </div>

        {/* Filter Tabs and Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div className="flex gap-1 bg-gray-100 p-1 rounded-lg w-fit">
            <button
              onClick={() => setActiveTab("quizzes")}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                activeTab === "quizzes"
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              <BookOpen className="w-4 h-4" />
              Quizzes
            </button>
            <button
              onClick={() => setActiveTab("flashcards")}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                activeTab === "flashcards"
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-gray-600 hover:text-gray-800"
              }`}
            >
              <Layers className="w-4 h-4" />
              Flashcards
            </button>
          </div>

          <div className="flex gap-3">
            <div className="relative">
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-lg pl-4 pr-10 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="recent">Most Recent</option>
                <option value="title">Title</option>
                <option value="questions">Questions</option>
              </select>
              <Filter className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="relative mb-8">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder={`Search ${activeTab}...`}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Empty State */}
        {(activeTab === "quizzes" && filteredQuizzes.length === 0) || 
         (activeTab === "flashcards" && filteredFlashcards.length === 0) ? (
          <div className="bg-white rounded-xl border border-dashed border-gray-300 p-8 text-center">
            <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              {activeTab === "quizzes" ? (
                <BookOpen className="w-8 h-8 text-blue-600" />
              ) : (
                <Layers className="w-8 h-8 text-blue-600" />
              )}
            </div>
            <h3 className="font-medium text-gray-900 mb-1">No {activeTab} yet</h3>
            <p className="text-gray-600 mb-4">Create your first {activeTab.slice(0, -1)} to get started</p>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
              Create {activeTab === "quizzes" ? "Quiz" : "Flashcards"}
            </button>
          </div>
        ) : (
          /* List */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {activeTab === "quizzes"
              ? filteredQuizzes.map((quiz) => (
                  <QuizCard
                    key={quiz.id}
                    quiz={quiz}
                    navigate={navigate}
                  />
                ))
              : filteredFlashcards.map((flashcard) => (
                  <FlashcardCard
                    key={flashcard.id}
                    flashcard={flashcard}
                    navigate={navigate}
                  />
                ))}
          </div>
        )}
      </div>
    </PageLayout>
  );
};

// Quiz Card Component
const QuizCard = ({ quiz, navigate }) => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all overflow-hidden group">
    <div className="relative">
      <img
        src={quiz && quiz.img ? quiz.img : defaultImage}
        alt={quiz && quiz.title}
        className="w-full h-40 object-cover"
      />
      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
        <button className="p-1.5 bg-white rounded-lg shadow-sm hover:bg-gray-100 transition-colors">
          <MoreVertical className="w-4 h-4 text-gray-600" />
        </button>
      </div>
    </div>
    
    <div className="p-5">
      <h3 className="font-semibold text-gray-900 mb-3 line-clamp-1">{quiz && quiz.title}</h3>
      
      <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
        <div className="flex items-center gap-1">
          <FileText className="w-4 h-4" />
          <span>{quiz && quiz.questions.length} questions</span>
        </div>
        <div className="flex items-center gap-1">
          <Clock className="w-4 h-4" />
          <span>{Math.ceil(quiz && quiz.questions.length * 0.8)} min</span>
        </div>
      </div>
      
      <button 
        onClick={() => navigate("/quizzes/"+ quiz.id)}
        className="w-full flex items-center justify-center gap-1.5 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors">
        <Eye className="w-4 h-4" />
        View Quiz
      </button>
    </div>
  </div>
);

// Flashcard Card Component
const FlashcardCard = ({ flashcard, navigate }) => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all overflow-hidden group">
    <div className="relative">
      <img
        src={flashcard && flashcard.img ? flashcard.img : defaultImage}
        alt={flashcard && flashcard.title}
        className="w-full h-40 object-cover"
      />
      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
        <button className="p-1.5 bg-white rounded-lg shadow-sm hover:bg-gray-100 transition-colors">
          <MoreVertical className="w-4 h-4 text-gray-600" />
        </button>
      </div>
    </div>
    
    <div className="p-5">
      <h3 className="font-semibold text-gray-900 mb-2 line-clamp-1">{flashcard && flashcard.title}</h3>
      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{flashcard && flashcard.description}</p>
      
      <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
        <div className="flex items-center gap-1">
          <FileText className="w-4 h-4" />
          <span>{flashcard && flashcard.cards.length} cards</span>
        </div>
        <div className="flex items-center gap-1">
          <Clock className="w-4 h-4" />
          <span>{Math.ceil(flashcard && flashcard.length * 0.5)} min</span>
        </div>
      </div>
      
      <button 
        onClick={() => navigate("/flashcards/" + flashcard.id)}
        className="w-full flex items-center justify-center gap-1.5 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors">
        <Eye className="w-4 h-4" />
        Study Now
      </button>
    </div>
  </div>
);

export default Dashboard;