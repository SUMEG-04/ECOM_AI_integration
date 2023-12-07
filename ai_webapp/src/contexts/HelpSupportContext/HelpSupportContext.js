// HelpSupportContext.js
import React, { createContext, useReducer, useContext } from 'react';

// Define the initial state for help and support
const initialState = {
  helpSupportItems: [],
};

// Define action types
const ADD_HELP_SUPPORT_ITEM = 'ADD_HELP_SUPPORT_ITEM';

// Define the reducer function
const helpSupportReducer = (state, action) => {
  switch (action.type) {
    case ADD_HELP_SUPPORT_ITEM:
      return {
        ...state,
        helpSupportItems: [...state.helpSupportItems, action.payload],
      };
    default:
      return state;
  }
};

// Create the context
const HelpSupportContext = createContext();

// Create a custom hook to use the HelpSupportContext
const useHelpSupportContext = () => {
  const context = useContext(HelpSupportContext);
  if (!context) {
    throw new Error('useHelpSupportContext must be used within a HelpSupportProvider');
  }
  return context;
};

// Create the context provider component
const HelpSupportProvider = ({ children }) => {
  const [state, dispatch] = useReducer(helpSupportReducer, initialState);

  // Define actions
  const addHelpSupportItem = (item) => {
    dispatch({ type: ADD_HELP_SUPPORT_ITEM, payload: item });
  };

  // Provide the state and actions through the context
  const contextValue = {
    helpSupportItems: state.helpSupportItems,
    addHelpSupportItem,
  };

  return (
    <HelpSupportContext.Provider value={contextValue}>
      {children}
    </HelpSupportContext.Provider>
  );
};

export { HelpSupportProvider, useHelpSupportContext };
