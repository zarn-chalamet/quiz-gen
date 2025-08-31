import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/clerk-react';
import './App.css'
import ProjectOutLine from './ProjectOutLine';
import Dashboard from './pages/Dashboard';
import MyQuizzes from "./pages/MyQuizzes"
import QuizAnswerPage from './pages/QuizAnswerPage';
import FlashcardLearnPage from './pages/FlashcardLearnPage';
import { Toaster } from 'react-hot-toast';

function App() {

   return (
    <BrowserRouter>
      <Toaster/>
      <Routes>
        <Route path='/' element={
          <>
            <SignedIn><ProjectOutLine /></SignedIn>
            <SignedOut><RedirectToSignIn/></SignedOut>
          </>
        }/>

        <Route path='/dashboard' element={
          <>
            <SignedIn><Dashboard /></SignedIn>
            <SignedOut><RedirectToSignIn/></SignedOut>
          </>
        }/>

        <Route path='/my-quizzes' element={
          <>
            <SignedIn><MyQuizzes /></SignedIn>
            <SignedOut><RedirectToSignIn/></SignedOut>
          </>
        }/>

        <Route path='/quizzes/:id' element={
          <>
            <SignedIn><QuizAnswerPage /></SignedIn>
            <SignedOut><RedirectToSignIn/></SignedOut>
          </>
        }/>

        <Route path='/flashcards/:id' element={
          <>
            <SignedIn><FlashcardLearnPage /></SignedIn>
            <SignedOut><RedirectToSignIn/></SignedOut>
          </>
        }/>
      </Routes>
    </BrowserRouter>
    // <header>
    //   <SignedOut>
    //     <SignInButton />
    //   </SignedOut>
    //   <SignedIn>
    //     <ProjectOutLine />
    //   </SignedIn>
    // </header>
  );
}

export default App
