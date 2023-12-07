import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './components/useAuth/useAuth';
import { FilterContextProvider } from './contexts/FilterContext/FilterContextProvider';
import { CartProvider } from './contexts/CartContext/CartContext';
import { ReviewProvider } from './contexts/ReviewContext/ReviewContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <AuthProvider>
    <FilterContextProvider>
     <CartProvider>
     <ReviewProvider>
      <App />
     </ReviewProvider>
     </CartProvider>
    </FilterContextProvider>
    </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
