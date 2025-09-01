import React, { useEffect, useState } from "react";
import { X, Plus, Trash, Upload, FileText, Image as ImageIcon, ChevronDown, Check, BookOpen, Layers, LinkIcon } from "lucide-react";
import toast from "react-hot-toast";
import { useAuth } from "@clerk/clerk-react";
import axios from "axios";
import { apiEndpoints } from "../api/apiEndpoints";
import { useNavigate } from "react-router-dom";

const CreateModal = ({ onClose, type, editingItem }) => {
  const [activeTab, setActiveTab] = useState("manual");
  const [title, setTitle] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [description, setDescription] = useState("");
  const [questions, setQuestions] = useState([
    {
      text: "",
      options: [
        { label: "A", text: "", isCorrect: false },
        { label: "B", text: "", isCorrect: false },
        { label: "C", text: "", isCorrect: false },
        { label: "D", text: "", isCorrect: false },
      ],
    },
  ]);
  const [cards, setCards] = useState([{ question: "", answer: "" }]);
  const [studyFile, setStudyFile] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const [coverImageUrl, setCoverImageUrl] = useState("");
  const [quantity, setQuantity] = useState(1);
  const {getToken} = useAuth();
  const navigate = useNavigate();

  // Quiz helpers
  const addQuestion = () => {
    setQuestions((prev) => [
      ...prev,
      {
        text: "",
        options: [
          { label: "A", text: "", isCorrect: false },
          { label: "B", text: "", isCorrect: false },
          { label: "C", text: "", isCorrect: false },
          { label: "D", text: "", isCorrect: false },
        ],
      },
    ]);
  };

  const removeQuestion = (qIndex) => {
    setQuestions((prev) => prev.filter((_, i) => i !== qIndex));
  };

  const addOption = (qIndex) => {
    setQuestions((prev) => {
      const next = [...prev];
      const optionCount = next[qIndex].options.length;
      const nextLabel = String.fromCharCode(65 + optionCount);
      next[qIndex].options.push({ label: nextLabel, text: "", isCorrect: false });
      return next;
    });
  };

  const removeOption = (qIndex, oIndex) => {
    setQuestions((prev) => {
      const next = [...prev];
      next[qIndex].options.splice(oIndex, 1);
      next[qIndex].options = next[qIndex].options.map((opt, i) => ({
        ...opt,
        label: String.fromCharCode(65 + i),
      }));
      return next;
    });
  };

  const setCorrectOption = (qIndex, oIndex) => {
    setQuestions((prev) => {
      const next = [...prev];
      next[qIndex].options = next[qIndex].options.map((opt, i) => ({
        ...opt,
        isCorrect: i === oIndex,
      }));
      return next;
    });
  };

  // Flashcard helpers
  const addCard = () => setCards((prev) => [...prev, { question: "", answer: "" }]);
  const removeCard = (cIndex) => setCards((prev) => prev.filter((_, i) => i !== cIndex));

  const createQuiz = async (payload) => {
    try {
      const token = await getToken();
      const response = await axios.post(apiEndpoints.CREATE_QUIZ,payload,
        {
          headers: {Authorization: `Bearer ${token}`}
        }
      );
      console.log(response.data);
      if(response.status === 201) {
        navigate("/dashboard")
      }
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  }

  const createFlashcard = async (payload) => {
    try {
      const token = await getToken();
      const response = await axios.post(apiEndpoints.CREATE_FLASHCARD,payload,
        {
          headers: {Authorization: `Bearer ${token}`}
        }
      );
      console.log(response.data);
      if(response.status === 201) {
        navigate("/dashboard")
      }
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  }

  const generateQuiz = async (form) => {
    try {
      const token = await getToken();
      const response = await axios.post(apiEndpoints.GENERATE_QUIZ,form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`
          }
        }
      );
      console.log(response.data);
      if(response.status === 201) {
        navigate("/dashboard")
      }
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  }

  const generateFlashcard = async (form) => {
    try {
      const token = await getToken();
      const response = await axios.post(apiEndpoints.GENERATE_FLASHCARD,form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`
          }
        }
      );
      console.log(response.data);
      if(response.status === 201) {
        navigate("/dashboard")
      }
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  }

  // Submit handler
  const handleSubmit = () => {
    
    if (activeTab === "manual") {

      if (!title.trim()) {
        alert("Please provide a title");
        return;
      }
      if (type === "quiz") {
        const payload = {
          title,
          img: imgUrl || "",
          questions: questions.map((q, qi) => ({
            id: qi + 1,
            text: q.text,
            options: q.options.map((o, oi) => ({
              id: oi + 1,
              label: o.label,
              text: o.text,
              isCorrect: o.isCorrect,
            })),
          })),
        };
        console.log("QuizDto payload:", payload);

        if (editingItem) {
          console.log(editingItem);
          updateQuiz(editingItem.id, payload);
        } else {
          createQuiz(payload);
        }

      } else {
        const payload = {
          title,
          description,
          img: imgUrl || "",
          cards: cards.map((c, ci) => ({
            id: ci + 1,
            question: c.question,
            answer: c.answer,
          })),
        };
        console.log("FlashcardDto payload:", payload);

        if (editingItem) {
          updateFlashcard(editingItem.id, payload);
        } else {
          createFlashcard(payload);
        }

      }
    } else {

      if (!studyFile) {
        toast.error("Please upload a study file!");
        return;
      }

      if(type === "quiz"){
        
        const form = new FormData();
        form.append("file",studyFile);
        form.append("quantity",quantity);

        //will fix about the image next time

        generateQuiz(form);
        

      } else {
        const form = new FormData();
        form.append("file",studyFile);
        form.append("quantity",quantity);
        
        //will fix about the image next time

        generateFlashcard(form);

      }
      
    }

    onClose();
  };

  const updateQuiz = async (id, payload) => {
    try {
      const token = await getToken();
      const response = await axios.patch(apiEndpoints.UPDATE_QUIZ(id), payload, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      console.log(response);
      if(response.status === 200) {
        toast.success("Quizz updated!");
        navigate("/my-quizzes");
      }
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  };

const updateFlashcard = async (id, payload) => {
  try {
    const token = await getToken();
    const response = await axios.patch(apiEndpoints.UPDATE_FLASHCARD(id), payload, {
      headers: { Authorization: `Bearer ${token}` }
    });

    console.log(response);
    if(response.status === 200) {
      toast.success("Flashcard updated!");
      navigate("/my-quizzes");
    }
    
  } catch (error) {
    console.log(error);
    toast.error(error);
  }
};


  useEffect(() => {
    if (editingItem) {
      setTitle(editingItem.title || "");
      setImgUrl(editingItem.img || "");
      if (editingItem.type === "quiz") {
        setQuestions(editingItem.questions || []);
      } else {
        setDescription(editingItem.description || "");
        setCards(editingItem.cards || []);
      }
    }
  }, [editingItem]);


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-200 bg-opacity-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${type === 'quiz' ? 'bg-blue-100' : 'bg-purple-100'}`}>
              {type === "quiz" ? (
                <BookOpen className="w-5 h-5 text-blue-600" />
              ) : (
                <Layers className="w-5 h-5 text-purple-600" />
              )}
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                {editingItem ? `Edit ${type === "quiz" ? "Quiz" : "Flashcards"}` : `Create New ${type === "quiz" ? "Quiz" : "Flashcards"}`}
              </h2>
              <p className="text-sm text-gray-500">
                {type === "quiz"
                  ? "Build questions with options and mark the correct answer."
                  : "Add Q/A cards or generate from a file."}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Tabs */}
        {
          !editingItem && 
          <div className="px-6 pt-4">
            <div className="inline-flex bg-gray-100 p-1 rounded-lg">
              {[
                { key: "manual", label: "Create Manually", icon: Plus },
                { key: "upload", label: "Upload File", icon: Upload },
              ].map((tab) => {
                const IconComponent = tab.icon;
                return (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-all ${
                      activeTab === tab.key
                        ? "bg-white text-blue-600 shadow-sm"
                        : "text-gray-600 hover:text-gray-800"
                    }`}
                  >
                    <IconComponent className="w-4 h-4" />
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>
        }

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Shared fields */}
          <div className="grid md:grid-cols-2 gap-4 mb-6">

            {
              activeTab === "manual" && (

              <>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                  <input
                    type="text"
                    placeholder="Enter title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Cover Image URL</label>
                  <input
                    type="text"
                    placeholder="https://example.com/image.jpg"
                    value={imgUrl}
                    onChange={(e) => setImgUrl(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  />
                </div>
              </> )
            }
            
          </div>

          {/* Flashcard description */}
          {type === "flashcard" && activeTab === "manual" && (
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                placeholder="Enter a description for your flashcard set"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
            </div>
          )}

          {/* Manual creation content */}
          {activeTab === "manual" ? (
            type === "quiz" ? (
              <div className="space-y-4">
                {questions.map((q, qIndex) => (
                  <div key={qIndex} className="border border-gray-200 rounded-xl p-5 bg-white shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-medium text-gray-700">Question {qIndex + 1}</h3>
                      {questions.length > 1 && (
                        <button
                          onClick={() => removeQuestion(qIndex)}
                          className="p-1.5 rounded-md hover:bg-gray-100 text-gray-500 transition-colors"
                          aria-label="Remove question"
                        >
                          <Trash className="w-4 h-4" />
                        </button>
                      )}
                    </div>

                    <div className="mb-4">
                      <input
                        type="text"
                        placeholder="Enter your question"
                        value={q.text}
                        onChange={(e) => {
                          const next = [...questions];
                          next[qIndex].text = e.target.value;
                          setQuestions(next);
                        }}
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      />
                    </div>

                    <div className="space-y-3">
                      {q.options.map((opt, oIndex) => (
                        <div key={oIndex} className="flex items-center gap-3">
                          <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-md bg-gray-100 text-sm font-medium text-gray-700">
                            {opt.label}
                          </div>
                          <input
                            type="text"
                            placeholder={`Option ${opt.label}`}
                            value={opt.text}
                            onChange={(e) => {
                              const next = [...questions];
                              next[qIndex].options[oIndex].text = e.target.value;
                              setQuestions(next);
                            }}
                            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                          />
                          <button
                            onClick={() => setCorrectOption(qIndex, oIndex)}
                            className={`flex-shrink-0 w-9 h-9 flex items-center justify-center rounded-full border-2 ${
                              opt.isCorrect
                                ? "bg-blue-100 border-blue-500 text-blue-600"
                                : "border-gray-300 text-transparent hover:border-blue-400"
                            } transition-colors`}
                            aria-label="Mark as correct"
                          >
                            <Check className="w-5 h-5" />
                          </button>
                          {q.options.length > 2 && (
                            <button
                              onClick={() => removeOption(qIndex, oIndex)}
                              className="flex-shrink-0 w-9 h-9 flex items-center justify-center rounded-md hover:bg-gray-100 text-gray-500 transition-colors"
                              aria-label="Remove option"
                            >
                              <Trash className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      ))}
                    </div>

                    <button
                      onClick={() => addOption(qIndex)}
                      className="mt-4 flex items-center gap-2 text-blue-600 text-sm font-medium hover:text-blue-700 transition-colors"
                    >
                      <Plus className="w-4 h-4" /> Add Option
                    </button>
                  </div>
                ))}

                <button
                  onClick={addQuestion}
                  className="w-full py-3 border border-dashed border-gray-300 rounded-xl flex items-center justify-center gap-2 text-gray-600 hover:text-gray-800 hover:border-gray-400 transition-colors"
                >
                  <Plus className="w-5 h-5" />
                  Add Question
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {cards.map((c, cIndex) => (
                  <div key={cIndex} className="border border-gray-200 rounded-xl p-5 bg-white shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-medium text-gray-700">Card {cIndex + 1}</h3>
                      {cards.length > 1 && (
                        <button
                          onClick={() => removeCard(cIndex)}
                          className="p-1.5 rounded-md hover:bg-gray-100 text-gray-500 transition-colors"
                          aria-label="Remove card"
                        >
                          <Trash className="w-4 h-4" />
                        </button>
                      )}
                    </div>

                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Question</label>
                        <input
                          type="text"
                          placeholder="Enter question"
                          value={c.question}
                          onChange={(e) => {
                            const next = [...cards];
                            next[cIndex].question = e.target.value;
                            setCards(next);
                          }}
                          className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Answer</label>
                        <textarea
                          placeholder="Enter answer"
                          value={c.answer}
                          onChange={(e) => {
                            const next = [...cards];
                            next[cIndex].answer = e.target.value;
                            setCards(next);
                          }}
                          rows={3}
                          className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        />
                      </div>
                    </div>
                  </div>
                ))}

                <button
                  onClick={addCard}
                  className="w-full py-3 border border-dashed border-gray-300 rounded-xl flex items-center justify-center gap-2 text-gray-600 hover:text-gray-800 hover:border-gray-400 transition-colors"
                >
                  <Plus className="w-5 h-5" />
                  Add Card
                </button>
              </div>
            )
          ) : (
            // Upload tab
            <div className="space-y-5">
              {/* Quantity input */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">Quantity</label>
                <input
                  type="number"
                  min={1}
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="w-32 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* File + Image section */}
              <div className="grid md:grid-cols-2 gap-5">
                {/* Study File Upload */}
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-blue-400 transition-colors">
                  <label className="cursor-pointer block">
                    <input
                      type="file"
                      className="hidden"
                      accept=".pdf,.txt,.doc,.docx"
                      onChange={(e) => setStudyFile(e.target.files?.[0] || null)}
                    />
                    <div className="w-12 h-12 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-3">
                      <FileText className="w-6 h-6 text-blue-600" />
                    </div>
                    <p className="font-medium text-gray-700 mb-1">Study File</p>
                    <p className="text-sm text-gray-500 mb-3">PDF, DOC, TXT</p>
                    {studyFile ? (
                      <p className="text-sm text-blue-600 font-medium truncate">
                        {studyFile.name}
                      </p>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg">
                        <Upload className="w-4 h-4" />
                        Select File
                      </span>
                    )}
                  </label>
                </div>

                {/* Cover Image Upload OR URL */}
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-purple-400 transition-colors">
                  <div className="flex flex-col gap-3">
                    {/* Upload */}
                      <label className="cursor-pointer block">
                        <input
                          type="file"
                          className="hidden"
                          accept="image/*"
                          onChange={(e) => {
                            setCoverImage(e.target.files?.[0] || null);
                            setCoverImageUrl(""); // clear URL if uploading
                          }}
                        />
                        <div className="w-12 h-12 mx-auto bg-purple-100 rounded-full flex items-center justify-center mb-3">
                          <ImageIcon className="w-6 h-6 text-purple-600" />
                        </div>
                        <p className="font-medium text-gray-700 mb-1">Cover Image</p>
                        <p className="text-sm text-gray-500 mb-3">Upload (PNG, JPG, JPEG)</p>
                        {coverImage ? (
                          <p className="text-sm text-purple-600 font-medium truncate">
                            {coverImage.name}
                          </p>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-gray-200 text-gray-700 text-sm font-medium rounded-lg">
                            <ImageIcon className="w-4 h-4" />
                            Select Image
                          </span>
                        )}
                      </label>

                      {/* OR paste URL */}
                      <div>
                        <p className="text-sm text-gray-500 mb-2">Or paste image URL</p>
                        <div className="flex items-center gap-2">
                          <LinkIcon className="w-4 h-4 text-gray-400" />
                          <input
                            type="url"
                            placeholder="https://example.com/image.jpg"
                            value={coverImageUrl}
                            onChange={(e) => {
                              setCoverImageUrl(e.target.value);
                              setCoverImage(null); // clear file if entering URL
                            }}
                            className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              )}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 p-6 bg-gray-50 rounded-b-2xl">
          <div className="flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-5 py-2.5 rounded-lg text-white bg-gradient-to-r from-blue-600 to-blue-700 text-sm font-medium shadow-sm hover:from-blue-700 hover:to-blue-800 transition-all"
            >
              {editingItem 
                ? "Update" 
                : activeTab === "manual" 
                  ? "Create" 
                  : "Upload"
              }

            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateModal;