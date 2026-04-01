import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Favorites context
const FavoritesContext = createContext();

// Initial state
const initialState = {
  items: [],
  itemCount: 0
};

// Action types
const FAVORITES_ACTIONS = {
  ADD_FAVORITE: 'ADD_FAVORITE',
  REMOVE_FAVORITE: 'REMOVE_FAVORITE',
  LOAD_FAVORITES: 'LOAD_FAVORITES',
  CLEAR_FAVORITES: 'CLEAR_FAVORITES'
};

// Reducer function
const favoritesReducer = (state, action) => {
  switch (action.type) {
    case FAVORITES_ACTIONS.ADD_FAVORITE: {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      
      if (existingItem) {
        return state; // Item already in favorites
      } else {
        return {
          ...state,
          items: [...state.items, { ...action.payload }],
          itemCount: state.itemCount + 1
        };
      }
    }

    case FAVORITES_ACTIONS.REMOVE_FAVORITE: {
      const updatedItems = state.items.filter(item => item.id !== action.payload);
      return {
        ...state,
        items: updatedItems,
        itemCount: updatedItems.length
      };
    }

    case FAVORITES_ACTIONS.CLEAR_FAVORITES: {
      return initialState;
    }

    case FAVORITES_ACTIONS.LOAD_FAVORITES: {
      return {
        ...state,
        ...action.payload
      };
    }

    default:
      return state;
  }
};

// Favorites provider component
export const FavoritesProvider = ({ children }) => {
  const [state, dispatch] = useReducer(favoritesReducer, initialState);

  // Load favorites from localStorage on mount
  useEffect(() => {
    const savedFavorites = localStorage.getItem('glowify-favorites');
    if (savedFavorites) {
      try {
        const parsedFavorites = JSON.parse(savedFavorites);
        dispatch({ type: FAVORITES_ACTIONS.LOAD_FAVORITES, payload: parsedFavorites });
      } catch (error) {
        console.error('Error loading favorites from localStorage:', error);
      }
    }
  }, []);

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('glowify-favorites', JSON.stringify({
      items: state.items,
      itemCount: state.itemCount
    }));
  }, [state.items, state.itemCount]);

  // Action creators
  const addFavorite = (product) => {
    dispatch({ type: FAVORITES_ACTIONS.ADD_FAVORITE, payload: product });
  };

  const removeFavorite = (productId) => {
    dispatch({ type: FAVORITES_ACTIONS.REMOVE_FAVORITE, payload: productId });
  };

  const clearFavorites = () => {
    dispatch({ type: FAVORITES_ACTIONS.CLEAR_FAVORITES });
  };

  const isFavorite = (productId) => {
    return state.items.some(item => item.id === productId);
  };

  const value = {
    ...state,
    addFavorite,
    removeFavorite,
    clearFavorites,
    isFavorite
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};

// Custom hook to use favorites context
export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};

export { FAVORITES_ACTIONS };
