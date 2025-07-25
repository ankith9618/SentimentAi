import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from "./HomePage/HomePage.jsx";
import './App.css';
import Dashboard from './DashBoard/DashBoard.jsx';
import Navbar from './Navbar/Navbar.jsx';
import CommentsAnalyzer from './Youtube/YoutubeCommentsAnalyzer.jsx';
import ProtectedRoute from './ProtectedRoute.jsx';

import AnalyzeComments from './Youtube/AnalyzeComments.jsx';
import Platform from './Components/Platform.jsx';


function App() {
  return (
    <Router>
      <Navbar />
      <Routes >
        <Route path="/" element={<HomePage />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/platform/youtube"
          element={
            <ProtectedRoute>
              <CommentsAnalyzer />
            </ProtectedRoute>
          }
        />

        <Route
          path="/platform/youtube/analyze"
          element={
            <ProtectedRoute>
              <AnalyzeComments />
            </ProtectedRoute>
          }
        />
        <Route  
          path="/platform"
          element={
            <ProtectedRoute>
                <Platform />
            </ProtectedRoute>
          }
        
        />

      </Routes>
    </Router>
  );
}

export default App;
