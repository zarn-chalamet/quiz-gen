import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/clerk-react';
import './App.css'
import ProjectOutLine from './ProjectOutLine';
import Dashboard from './pages/Dashboard';
import MyQuizzes from "./pages/MyQuizzes"

function App() {

   return (
    <BrowserRouter>
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
