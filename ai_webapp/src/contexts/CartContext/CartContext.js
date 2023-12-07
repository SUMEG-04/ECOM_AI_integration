import { createContext, useContext, useEffect, useReducer, useState } from "react";
import cartReducer from '../../reducer/CartReducer';
import axios from 'axios';
import { useAuth } from "../../components/useAuth/useAuth";

const CartContext = createContext();

const initialState = {
  cart: [],
  totalItems: 0,
  totalAmount: 0,
  shippingFee: 5000,
};

const CartProvider = ({ children }) => {
    const {user}=useAuth()
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const [total, setTotal] = useState(0);
  const [token,setToken]=useState("")
  useEffect(() => {
    // Fetch user's cart items from the server
    setToken(localStorage.getItem('authToken'))
    if(user){
      getAllCartItems(token)
    }
  }, [user]);

  const getAllCartItems = async (token) => {
    try {
      // Fetch the cart items
      const response = await fetch('http://localhost:3000/api/cart/items', {
        method: 'POST',
        credentials: 'include', // Include credentials to send cookies
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      });
  
      // Check if the response is successful (status 200-299)
      if (response.ok) {
        // Parse the JSON data from the response
        const cartItems = await response.json();
        // Dispatch an action to update the cart state in the reducer
        dispatch({ type: 'SET_CART_ITEMS', payload: cartItems });
      } else if (response.status === 404) {
        // Handle the case where no data is found (status 404)
        console.log('No data found');
      } else {
        // Handle other error cases
        console.error('Error fetching cart items:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching cart items:', error);
    }
  };
  

  const calculateTotal = (items) => {
    // Calculate the total amount based on cart items
    const totalAmount = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
    setTotal(totalAmount);
  };

  const addToCart = (id, color, quantity, product) => {
    // Update the server with the new item
        dispatch({ type: "ADD_TO_CART", payload: { id, color, quantity, product } });
    axios.post('http://localhost:3000/api/cart/add-to-cart', { userId:user._id, productId:id, quantity: quantity,color:color,product:product })
      .then(response => {
        dispatch({ type: "ADD_TO_CART", payload: { id, color, quantity, product } });
        getAllCartItems(token)
        //calculateTotal(response.data);
      })
      .catch(error => {
        console.error('Error adding item to cart:', error);
      });
  };

  const removeFromCart = (id) => {
    axios.delete(`http://localhost:3000/api/cart/remove-from-cart/${id}`, { data: { userId: user._id } })
      .then(response => {
       getAllCartItems(token)
        console.log(response)
      })
      .catch(error => {
        console.error('Error removing item from cart:', error);
      });
  };

  // Add other functions as needed

  return (
    <CartContext.Provider value={{ ...state, addToCart, removeFromCart,getAllCartItems }}>
      {children}
    </CartContext.Provider>
  );
};

const useCartContext = () => {
  return useContext(CartContext);
};

export { CartProvider, useCartContext };
