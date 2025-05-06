import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Signup from './Signup/Signup';
import Login from './Login/Login';
import Main from './Main/Main';
import { auth } from './firebase';
import SavedRecipe from './SavedRecipe/SavedRecipe';




function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(setUser);
    return () => unsubscribe();
  }, []);

  return (
    <Router>
     
      <Routes>
        <Route path="/" element={user ? <Main /> : <Navigate to="/login" />} />
        <Route path="/login" element={<Login onAuthSuccess={() => window.location.href = "/"} />} />
        <Route path="/signup" element={<Signup onAuthSuccess={() => window.location.href = "/"} />} />
        <Route path="/saved" element={<SavedRecipe />} />
      </Routes>
    </Router>
  );
}

export default App;
