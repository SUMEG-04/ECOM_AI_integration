// CartReducer.js
const cartReducer = (state, action) => {
    switch (action.type) {
      case "SET_CART_ITEMS":
        const cartItems  = action.payload;
      // Calculate total items and total amount based on cart items
      const totalItems = cartItems ? cartItems.reduce((total, item) => total + item.quantity, 0) : 0;
      const totalAmount = cartItems ? cartItems.reduce((total, item) => total + item.quantity * item.product.price, 0) : 0;
      return {
        ...state,
        cart: cartItems,
        totalItems,
        totalAmount,
      };
      case "ADD_TO_CART":
        const { id, color, quantity, product } = action.payload;
        const existingItem = state.cart.find((item) => item.id === id && item.color === color);
  
        if (existingItem) {
          // If the item with the same id and color already exists, update the quantity
          return {
            ...state,
            cart: state.cart.map((item) =>
              item.id === id && item.color === color
                ? { ...item, quantity: item.quantity + quantity }
                : item
            ),
            totalItems: state.totalItems + quantity,
            totalAmount: state.totalAmount + quantity*product.price,
          };
        } else {
          // If it's a new item, add it to the cart
          return {
            ...state,
            cart: [...state.cart, { id, color, quantity, product }],
            totalItems: state.totalItems + quantity,
            totalAmount: state.totalAmount + quantity*product.price,
          };
        }
  
      case "REMOVE_FROM_CART":
        const { removedId, removedColor,productamount } = action.payload;
        const removedItem = state.cart.find((item) => item.id === removedId && item.color === removedColor);
  
        if (removedItem) {
          return {
            ...state,
            cart: state.cart.filter((item) => !(item.id === removedId && item.color === removedColor)),
            totalItems: state.totalItems - removedItem.quantity,
            totalAmount: state.totalAmount - productamount,
          };
        } else {
          return state;
        }
  
      // Add other cases as needed
  
      default:
        return state;
    }
  };
  
  export default cartReducer;
  