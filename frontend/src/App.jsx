// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Todo from './pages/Todo';

function App() {
  // Petite logique simple pour vérifier si l'utilisateur est connecté
  const isAuthenticated = !!localStorage.getItem('userId');

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Route protégée : si pas connecté, redirection vers Login */}
        <Route
          path="/todo"
          element={isAuthenticated ? <Todo /> : <Navigate to="/" />}
        />
      </Routes>
    </Router>
  );
}

export default App;