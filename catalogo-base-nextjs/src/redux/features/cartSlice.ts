import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  discount?: number | null;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  customerNames: string[];
  currentCustomerName: string;
  lastUpdated: number;
}

// Función para cargar el estado desde localStorage
const loadState = (): CartState => {
  try {
    const serializedState = localStorage.getItem('cartState');
    if (!serializedState) return getDefaultState();
    
    const state = JSON.parse(serializedState);
    
    // Verificar si el carrito ha expirado (1 día = 86400000 ms)
    const now = Date.now();
    if (now - state.lastUpdated > 86400000) {
      // Si expiró, mantener solo los nombres de clientes
      return {
        ...getDefaultState(),
        customerNames: state.customerNames || [],
      };
    }
    
    return state;
  } catch (err) {
    return getDefaultState();
  }
};

// Estado por defecto
const getDefaultState = (): CartState => ({
  items: [],
  isOpen: false,
  customerNames: [],
  currentCustomerName: '',
  lastUpdated: Date.now(),
});

const initialState: CartState = loadState();

// Función para guardar el estado en localStorage
const saveState = (state: CartState) => {
  try {
    const serializedState = JSON.stringify({
      ...state,
      lastUpdated: Date.now() // Actualizar timestamp cada vez que guardamos
    });
    localStorage.setItem('cartState', serializedState);
  } catch (err) {
    // Ignorar errores de escritura
  }
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
      
      // Abrir el carrito automáticamente cuando se agrega un item
      state.isOpen = true;
      state.lastUpdated = Date.now();
      saveState(state);
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      state.lastUpdated = Date.now();
      saveState(state);
    },
    updateQuantity: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
      const { id, quantity } = action.payload;
      const item = state.items.find(item => item.id === id);
      
      if (item) {
        item.quantity = quantity;
      }
      state.lastUpdated = Date.now();
      saveState(state);
    },
    clearCart: (state) => {
      state.items = [];
      state.lastUpdated = Date.now();
      saveState(state);
    },
    openCartDrawer: (state) => {
      state.isOpen = true;
      saveState(state);
    },
    closeCartDrawer: (state) => {
      state.isOpen = false;
      saveState(state);
    },
    toggleCartDrawer: (state) => {
      state.isOpen = !state.isOpen;
      saveState(state);
    },
    addCustomerName: (state, action: PayloadAction<string>) => {
      const name = action.payload.trim();
      if (!name) return;
      
      // Si el nombre ya existe, no lo agregamos de nuevo
      if (!state.customerNames.includes(name)) {
        state.customerNames.push(name);
      }
      state.currentCustomerName = name;
      saveState(state);
    },
    setCurrentCustomerName: (state, action: PayloadAction<string>) => {
      state.currentCustomerName = action.payload;
      saveState(state);
    },
    removeCustomerName: (state, action: PayloadAction<string>) => {
      state.customerNames = state.customerNames.filter(name => name !== action.payload);
      if (state.currentCustomerName === action.payload) {
        state.currentCustomerName = state.customerNames[0] || '';
      }
      saveState(state);
    },
  },
});

export const { 
  addToCart, 
  removeFromCart, 
  updateQuantity, 
  clearCart, 
  openCartDrawer, 
  closeCartDrawer, 
  toggleCartDrawer,
  addCustomerName,
  setCurrentCustomerName,
  removeCustomerName
} = cartSlice.actions;

export default cartSlice.reducer;
