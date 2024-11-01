import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import Booking from './components/Booking';
import CardDetails from './components/CardDetails';
import AboutUs from './components/AboutUs';
import TopPicks from './components/TopPicks';
import NewsPage from './components/NewsPage';
import { AuthProvider } from '../context/AuthContext';
import CardCreation from './components/CardCreation';
import CardDetailView from './components/CardDetailView';
import TransactionHistory from './components/TransactionHistory';

function App() {
  return (
    <div>
      <AuthProvider>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/booking' element={<Booking />} />
          <Route path='/card-details' element={<CardDetails />} />
          <Route path='/about-us' element={<AboutUs />} />
          <Route path='/top-picks' element={<TopPicks />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/account-creation" element={<CardCreation />} />
          <Route path="/cards/:id" element={<CardDetailView />} />
          <Route path="/transaction/history" element={<TransactionHistory />} />
        </Routes>
      </Router>
      </AuthProvider> 
    </div>
  );
}

export default App;
