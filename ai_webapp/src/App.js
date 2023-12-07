// App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProductPage from './pages/ProductPage/ProductPage';
import CartPage from './pages/CartPage/CartPage';
import CheckoutPage from './pages/CheckoutPage/CheckoutPage';
import UserAccountPage from './pages/UserAccountPage/UserAccountPage';
import './App.css';
import Home from './pages/Home/Home';
import Header from './components/Header/Header';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import Footer from './components/Footer/Footer';
import AboutUs from './components/AboutUs/AboutUs';
import Contact from './components/ContactUs/Contact';
import Profile from './pages/Profile/Profile';
import ProtectedRoute from './components/useAuth/ProtectedRoute';
import AuthComponent from './components/useAuth/AuhtComponent';
import NotFound from './pages/NotFound/NotFound';
import SingleProduct from './components/ProductList/SingleProduct';
import HelpSupportPage from './pages/HelpSupportPage/HelpSupportPage';


const App=()=> {

  
  return (
    <>
      <Header/>
      <>
        {/* The  should wrap both the Header and Routes */}
        <Routes>
          <Route path="/" element={<Home />} /> {/* Use "element" to render components */}
          <Route path="/home" element={<Home />} />
          <Route path="/products" element={<ProductPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/user-account" element={<UserAccountPage />} />
          <Route path="/login" element={<AuthComponent element={<Login/>} />} />
          <Route path="/signup" element={<AuthComponent element={<Signup/>} />} />
          <Route path="/contact" element={<Contact/>} />
          <Route path="/singleproduct/:id" element={<SingleProduct/>} />
          <Route path="/about" element={<AboutUs/>} />
          <Route path="/profile" element={<ProtectedRoute path="/profile" element={<Profile />} />} />
          <Route path='/help-support' element={<ProtectedRoute path="/help-support" element={<HelpSupportPage/>}/>}/>
          <Route path="/*" element={<NotFound/>}/>
          {/* Define other routes here if needed */}
        </Routes>
      </>
      <Footer/>
    </>
  );
}

export default App;
