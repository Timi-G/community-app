import logo from './logo.svg';
import './App.css';

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Register from "./pages/Register";
import Feed from "./pages/Feed";
import Group from "./pages/Group";
import GroupDetail from './pages/GroupDetail';
import Login from "./pages/Login";
import Header from './components/Header';


function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/group" element={<Group />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/groups/:groupId" element={<GroupDetail />} />
        <Route path="/" element={<Navigate to="/feed" replace />} />
        <Route path="*" element={<Navigate to="/feed" replace />} />
      </Routes>
  </Router>
  );
}

export default App;
