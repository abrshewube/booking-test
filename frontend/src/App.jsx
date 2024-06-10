import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import RegistrationForm from "./components/Auth/Register";
import VerifyAccount from "./components/Auth/Verify";
// import Home from "./components/Home/Home";
import LoginForm from "./components/Auth/Login";
import CreateBookForm from "./components/Book/CreateBook";
import GetBooks from "./components/Book/GetBookTable";
import Grbooks from "./components/Book/GetBookCard";
import EditBook from "./components/Book/EditBook";
import BookDetails from "./components/Book/BooksDetails";
import BooksLayout from "./components/Book/BooksLayout";
import Header from './components/Header/Header';
import authService from './services/authService';
import './App.css';

function App() {
  const [username, setUsername] = useState('');

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const fetchedUsername = await authService.getUsername();
        setUsername(fetchedUsername);
      } catch (error) {
        console.error('Error fetching username:', error);
      }
    };

    const token = localStorage.getItem('token');
    if (token) {
      fetchUsername();
    }
  }, []);

  const token = localStorage.getItem('token');

  return (
    <>
      <Header username={username} />
      <Routes>
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/login" element={<LoginForm />} />
        {/* Redirect to login if no token */}
        {!token && <Route path="*" element={<Navigate to="/login" />} />}

        {token && (
          <>
            <Route path="/verify/:token" element={<VerifyAccount />} />
            <Route path="/create-book" element={<CreateBookForm />} />
            <Route path="/edit-book/:id" element={<EditBook />} />
            <Route path="/book-details/:id" element={<BookDetails />} />
            <Route path="books" element={<BooksLayout />}>
              <Route index element={<GetBooks />} />
              <Route path="card" element={<Grbooks />} />
            </Route>
            <Route path="*" element={<Navigate to="/books" />} />
          </>
        )}
      </Routes>
    </>
  );
}

export default App;
