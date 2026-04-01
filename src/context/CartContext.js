import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Cart context
const CartContext = createContext();

// Initial state
const initialState = {
  items: [],
  total: 0,
  itemCount: 0,
  isOpen: false
};

// Action types
const CART_ACTIONS = {
  ADD_ITEM: 'ADD_ITEM',
  REMOVE_ITEM: 'REMOVE_ITEM',
  UPDATE_QUANTITY: 'UPDATE_QUANTITY',
  CLEAR_CART: 'CLEAR_CART',
  TOGGLE_CART: 'TOGGLE_CART',
  LOAD_CART: 'LOAD_CART'
};

// Reducer function
const cartReducer = (state, action) => {
  switch (action.type) {
    case CART_ACTIONS.ADD_ITEM: {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      
      if (existingItem) {
        const updatedItems = state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        return {
          ...state,
          items: updatedItems,
          itemCount: state.itemCount + 1,
          total: state.total + action.payload.price
        };
      } else {
        return {
          ...state,
          items: [...state.items, { ...action.payload, quantity: 1 }],
          itemCount: state.itemCount + 1,
          total: state.total + action.payload.price
        };
      }
    }

    case CART_ACTIONS.REMOVE_ITEM: {
      const itemToRemove = state.items.find(item => item.id === action.payload);
      if (!itemToRemove) return state;
      
      const updatedItems = state.items.filter(item => item.id !== action.payload);
      return {
        ...state,
        items: updatedItems,
        itemCount: state.itemCount - itemToRemove.quantity,
        total: state.total - (itemToRemove.price * itemToRemove.quantity)
      };
    }

    case CART_ACTIONS.UPDATE_QUANTITY: {
      const { id, quantity } = action.payload;
      const item = state.items.find(item => item.id === id);
      
      if (!item) return state;
      
      const quantityDiff = quantity - item.quantity;
      const updatedItems = state.items.map(item =>
        item.id === id ? { ...item, quantity } : item
      );
      
      return {
        ...state,
        items: updatedItems,
        itemCount: state.itemCount + quantityDiff,
        total: state.total + (item.price * quantityDiff)
      };
    }

    case CART_ACTIONS.CLEAR_CART:
      return initialState;

    case CART_ACTIONS.TOGGLE_CART:
      return {
        ...state,
        isOpen: !state.isOpen
      };

    case CART_ACTIONS.LOAD_CART:
      return {
        ...state,
        ...action.payload
      };

    default:
      return state;
  }
};

// Cart provider component
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('glowify-cart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        dispatch({ type: CART_ACTIONS.LOAD_CART, payload: parsedCart });
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('glowify-cart', JSON.stringify({
      items: state.items,
      total: state.total,
      itemCount: state.itemCount
    }));
  }, [state.items, state.total, state.itemCount]);

  // Action creators
  const addItem = (product) => {
    dispatch({ type: CART_ACTIONS.ADD_ITEM, payload: product });
  };

  const removeItem = (productId) => {
    dispatch({ type: CART_ACTIONS.REMOVE_ITEM, payload: productId });
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeItem(productId);
    } else {
      dispatch({ type: CART_ACTIONS.UPDATE_QUANTITY, payload: { id: productId, quantity } });
    }
  };

  const clearCart = () => {
    dispatch({ type: CART_ACTIONS.CLEAR_CART });
  };

  const toggleCart = () => {
    dispatch({ type: CART_ACTIONS.TOGGLE_CART });
  };

  const value = {
    ...state,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    toggleCart
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export { CART_ACTIONS };
