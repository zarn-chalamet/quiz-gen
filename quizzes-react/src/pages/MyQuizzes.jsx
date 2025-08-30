import React, { useState, useEffect } from "react";
import PageLayout from "../layout/PageLayout";
import { Search, BookOpen, Layers, Eye, MoreVertical, Plus, Filter, FileText, Clock, Edit, Trash2 } from "lucide-react";
import test from "../assets/test.jpg";

const MyQuizzes = () => {
  const [activeTab, setActiveTab] = useState("quizzes");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("recent");
  const [openMenuId, setOpenMenuId] = useState(null);
  const [editingItem, setEditingItem] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  // Mock data matching your DTO structure
  const [quizzes, setQuizzes] = useState([
    {
      id: "1",
      title: "Java Basics",
      img: test,
      clerkId: "123",
      questions: [
        {
          id: 1,
          text: "What is the default value of a boolean variable in Java?",
          options: [
            { id: 1, label: "A", text: "true", isCorrect: false },
            { id: 2, label: "B", text: "false", isCorrect: true },
            { id: 3, label: "C", text: "null", isCorrect: false },
            { id: 4, label: "D", text: "0", isCorrect: false }
          ]
        },
        {
          id: 2,
          text: "Which keyword is used to inherit a class in Java?",
          options: [
            { id: 1, label: "A", text: "implements", isCorrect: false },
            { id: 2, label: "B", text: "extends", isCorrect: true },
            { id: 3, label: "C", text: "inherits", isCorrect: false },
            { id: 4, label: "D", text: "super", isCorrect: false }
          ]
        }
      ]
    },
    {
      id: "2",
      title: "React Fundamentals",
      img: test,
      clerkId: "123",
      questions: [
        {
          id: 1,
          text: "What is JSX?",
          options: [
            { id: 1, label: "A", text: "A JavaScript extension", isCorrect: true },
            { id: 2, label: "B", text: "A template language", isCorrect: false },
            { id: 3, label: "C", text: "A state management library", isCorrect: false },
            { id: 4, label: "D", text: "A testing framework", isCorrect: false }
          ]
        }
      ]
    }
  ]);

  const [flashcards, setFlashcards] = useState([
    {
      id: "f1",
      title: "Data Structures",
      description: "Learn key DS concepts",
      img: test,
      clerkId: "123",
      cards: [
        { id: 1, question: "What is a linked list?", answer: "A linear data structure where elements are stored in nodes" },
        { id: 2, question: "What is the time complexity of accessing an element in an array?", answer: "O(1)" }
      ]
    },
    {
      id: "f2",
      title: "Networking",
      description: "Important networking flashcards",
      img: test,
      clerkId: "123",
      cards: [
        { id: 1, question: "What is TCP?", answer: "Transmission Control Protocol" },
        { id: 2, question: "What is the purpose of DNS?", answer: "To translate domain names to IP addresses" }
      ]
    }
  ]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setOpenMenuId(null);
    };
    
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  // Filter based on search
  const filteredQuizzes = quizzes.filter((q) =>
    q.title.toLowerCase().includes(search.toLowerCase())
  );
  const filteredFlashcards = flashcards.filter((f) =>
    f.title.toLowerCase().includes(search.toLowerCase())
  );

  // Handle delete item
  const handleDelete = (type, id) => {
    if (type === "quiz") {
      setQuizzes(quizzes.filter(quiz => quiz.id !== id));
    } else {
      setFlashcards(flashcards.filter(flashcard => flashcard.id !== id));
    }
    setDeleteConfirm(null);
  };

  // Handle edit item
  const handleEdit = (type, item) => {
    setEditingItem({ type, ...item });
  };

  // Save edited item
  const handleSaveEdit = () => {
    if (editingItem.type === "quiz") {
      setQuizzes(quizzes.map(quiz => 
        quiz.id === editingItem.id ? editingItem : quiz
      ));
    } else {
      setFlashcards(flashcards.map(flashcard => 
        flashcard.id === editingItem.id ? editingItem : flashcard
      ));
    }
    setEditingItem(null);
  };

  return (
    <PageLayout>
      <div className="px-4 py-6 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">My Learning Materials</h1>
          <p className="text-gray-600 mt-2">Manage your quizzes and flashcards</p>
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
            
            <button className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg shadow-sm hover:bg-blue-700 transition-all">
              <Plus className="w-4 h-4" />
              New
            </button>
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

        {/* Edit Modal */}
        {editingItem && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-6 w-full max-w-md">
              <h2 className="text-xl font-bold mb-4">Edit {editingItem.type === "quiz" ? "Quiz" : "Flashcard"}</h2>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  value={editingItem.title}
                  onChange={(e) => setEditingItem({...editingItem, title: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                />
              </div>
              {editingItem.type === "flashcard" && (
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    value={editingItem.description}
                    onChange={(e) => setEditingItem({...editingItem, description: e.target.value})}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    rows="3"
                  />
                </div>
              )}
              <div className="flex justify-end gap-3">
                <button 
                  onClick={() => setEditingItem(null)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleSaveEdit}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {deleteConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-6 w-full max-w-md">
              <h2 className="text-xl font-bold mb-4">Confirm Delete</h2>
              <p className="text-gray-600 mb-6">Are you sure you want to delete "{deleteConfirm.title}"? This action cannot be undone.</p>
              <div className="flex justify-end gap-3">
                <button 
                  onClick={() => setDeleteConfirm(null)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => handleDelete(deleteConfirm.type, deleteConfirm.id)}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}

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
                    openMenuId={openMenuId}
                    setOpenMenuId={setOpenMenuId}
                    onEdit={() => handleEdit("quiz", quiz)}
                    onDelete={() => setDeleteConfirm({ type: "quiz", id: quiz.id, title: quiz.title })}
                  />
                ))
              : filteredFlashcards.map((flashcard) => (
                  <FlashcardCard
                    key={flashcard.id}
                    flashcard={flashcard}
                    openMenuId={openMenuId}
                    setOpenMenuId={setOpenMenuId}
                    onEdit={() => handleEdit("flashcard", flashcard)}
                    onDelete={() => setDeleteConfirm({ type: "flashcard", id: flashcard.id, title: flashcard.title })}
                  />
                ))}
          </div>
        )}
      </div>
    </PageLayout>
  );
};

// Quiz Card Component
const QuizCard = ({ quiz, openMenuId, setOpenMenuId, onEdit, onDelete }) => {
  const { title, img, questions } = quiz;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all overflow-hidden group">
      <div className="relative">
        <img
          src={img}
          alt={title}
          className="w-full h-40 object-cover"
        />
        <div className="absolute top-3 right-3">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              setOpenMenuId(openMenuId === quiz.id ? null : quiz.id);
            }}
            className="p-1.5 bg-white rounded-lg shadow-sm hover:bg-gray-100 transition-colors"
          >
            <MoreVertical className="w-4 h-4 text-gray-600" />
          </button>
          
          {openMenuId === quiz.id && (
            <div className="absolute right-0 top-full mt-1 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10">
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit();
                  setOpenMenuId(null);
                }}
                className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <Edit className="w-4 h-4" />
                Edit
              </button>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete();
                  setOpenMenuId(null);
                }}
                className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
      
      <div className="p-5">
        <h3 className="font-semibold text-gray-900 mb-3 line-clamp-1">{title}</h3>
        
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
          <div className="flex items-center gap-1">
            <FileText className="w-4 h-4" />
            <span>{questions.length} questions</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{Math.ceil(questions.length * 0.8)} min</span>
          </div>
        </div>
        
        <button className="w-full flex items-center justify-center gap-1.5 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors">
          <Eye className="w-4 h-4" />
          View Quiz
        </button>
      </div>
    </div>
  );
};

// Flashcard Card Component
const FlashcardCard = ({ flashcard, openMenuId, setOpenMenuId, onEdit, onDelete }) => {
  const { title, img, description, cards } = flashcard;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all overflow-hidden group">
      <div className="relative">
        <img
          src={img}
          alt={title}
          className="w-full h-40 object-cover"
        />
        <div className="absolute top-3 right-3">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              setOpenMenuId(openMenuId === flashcard.id ? null : flashcard.id);
            }}
            className="p-1.5 bg-white rounded-lg shadow-sm hover:bg-gray-100 transition-colors"
          >
            <MoreVertical className="w-4 h-4 text-gray-600" />
          </button>
          
          {openMenuId === flashcard.id && (
            <div className="absolute right-0 top-full mt-1 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10">
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit();
                  setOpenMenuId(null);
                }}
                className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                <Edit className="w-4 h-4" />
                Edit
              </button>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete();
                  setOpenMenuId(null);
                }}
                className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
      
      <div className="p-5">
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-1">{title}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{description}</p>
        
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
          <div className="flex items-center gap-1">
            <FileText className="w-4 h-4" />
            <span>{cards.length} cards</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{Math.ceil(cards.length * 0.5)} min</span>
          </div>
        </div>
        
        <button className="w-full flex items-center justify-center gap-1.5 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors">
          <Eye className="w-4 h-4" />
          Study Now
        </button>
      </div>
    </div>
  );
};

export default MyQuizzes;