import { UserButton } from '@clerk/clerk-react';
import { Sparkles, Zap, Menu, X, BookOpen, BarChart3, Home, ChevronDown, Plus } from "lucide-react";
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import CreateModal from "../modal/CreateModal"; 

const PageLayout = ({ children }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState(null); 
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigationItems = [
    { name: "Dashboard", icon: <BarChart3 size={18} />, path: "/dashboard" },
    { name: "My Quizzes", icon: <BookOpen size={18} />, path: "/my-quizzes" },
  ];

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Enhanced Modern Navbar */}
      <header className={`w-full transition-all duration-300 sticky top-0 z-50 ${isScrolled ? 'bg-white shadow-sm py-2' : 'bg-white py-3 border-b border-gray-100'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          {/* Logo */}
          <button 
            onClick={() => navigate("/")}
            className="flex items-center gap-2 group"
          >
            <div className="p-1.5 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg shadow-sm group-hover:shadow-md transition-shadow">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              QuizzGen AI
            </h1>
          </button>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navigationItems.map((item) => (
              <button
                key={item.name}
                onClick={() => navigate(item.path)}
                className={`flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                  isActive(item.path) 
                    ? ' text-blue-600 border border-blue-100 shadow-sm' 
                    : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                }`}
              >
                
                {item.name}
                {isActive(item.path) && (
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 "></div>
                )}
              </button>
            ))}
            
            <div className="mx-2 h-6 w-px bg-gray-200"></div>
            
            {/* Create Button with Dropdown */}
            <div className="relative">
              <button 
                onClick={() => setActiveDropdown(activeDropdown === 'create' ? null : 'create')}
                className="flex items-center gap-1.5 px-4 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-sm font-medium rounded-lg shadow-sm hover:shadow-md transition-all duration-200 hover:from-blue-600 hover:to-indigo-700"
              >
                <Zap className="w-4 h-4" />
                Create
                <ChevronDown className="w-4 h-4 transition-transform duration-200" style={{ transform: activeDropdown === 'create' ? 'rotate(180deg)' : 'none' }} />
              </button>
              
              {activeDropdown === 'create' && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10">
                  <button 
                    onClick={() => {
                      setModalType("quiz");
                      setModalOpen(true);
                      setActiveDropdown(null);
                    }}
                    className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                    <Plus className="w-4 h-4" />
                    New Quiz
                  </button>
                  <button 
                    onClick={() => {
                      setModalType("flashcard");
                      setModalOpen(true);
                      setActiveDropdown(null);
                    }}
                    className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                    <Plus className="w-4 h-4" />
                    New Flashcards
                  </button>
                </div>
              )}
            </div>
            
            <div className="ml-2 pl-3 border-l border-gray-200">
              <UserButton appearance={{ 
                elements: { 
                  avatarBox: "w-9 h-9 border-2 border-white shadow-sm",
                  rootBox: "ml-1"
                } 
              }} />
            </div>
          </nav>
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        
        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 shadow-lg">
            <div className="px-4 py-3 space-y-1">
              <button
                onClick={() => {
                  navigate("/");
                  setMobileMenuOpen(false);
                }}
                className={`flex items-center gap-3 w-full px-4 py-3 text-left rounded-lg transition-colors ${
                  isActive("/") 
                    ? 'bg-blue-50 text-blue-600 border border-blue-100' 
                    : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                }`}
              >
                <Home size={18} />
                Home
              </button>
              
              {navigationItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => {
                    navigate(item.path);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex items-center gap-3 w-full px-4 py-3 text-left rounded-lg transition-colors ${
                    isActive(item.path) 
                      ? 'bg-blue-50 text-blue-600 border border-blue-100' 
                      : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
                  }`}
                >
                  {item.icon}
                  {item.name}
                </button>
              ))}
              
              <div className="pt-2">
                <button className="flex items-center gap-3 w-full px-4 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg shadow-sm">
                  <Zap className="w-4 h-4" />
                  Create New Quiz
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1 p-4 sm:p-6 overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>

    {/* modal */}
    {
      modalOpen && 
      <CreateModal 
        type={modalType}
        onClose={() => setModalOpen(false)}
      >
      </CreateModal>
    }
    </div>

    
  );
};

export default PageLayout;