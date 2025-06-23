'use client';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { 
  addToCart as addToCartAction, 
  removeFromCart as removeFromCartAction, 
  updateQuantity, 
  clearCart, 
  openCartDrawer as openCartDrawerAction, 
  closeCartDrawer as closeCartDrawerAction, 
  toggleCartDrawer as toggleCartDrawerAction,
  addCustomerName as addCustomerNameAction,
  setCurrentCustomerName as setCurrentCustomerNameAction,
  removeCustomerName as removeCustomerNameAction,
  CartItem
} from '@/redux/features/cartSlice';

export const useCart = () => {
  const dispatch = useDispatch();
  const { items, isOpen, customerNames, currentCustomerName } = useSelector((state: RootState) => state.cart);
  
  // Calcular el total del carrito
  const cartTotal = items.reduce((total, item) => {
    const price = item.discount 
      ? item.price - (item.price * (item.discount / 100)) 
      : item.price;
    return total + (price * item.quantity);
  }, 0);
  
  // Calcular el número total de items en el carrito
  const itemCount = items.reduce((count, item) => count + item.quantity, 0);
  
  // Añadir un item al carrito
  const addToCart = (item: CartItem) => {
    dispatch(addToCartAction(item));
  };
  
  // Eliminar un item del carrito
  const removeFromCart = (id: string) => {
    dispatch(removeFromCartAction(id));
  };
  
  // Actualizar la cantidad de un item
  const updateItemQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      dispatch(removeFromCartAction(id));
    } else {
      dispatch(updateQuantity({ id, quantity }));
    }
  };
  
  // Vaciar el carrito
  const emptyCart = () => {
    dispatch(clearCart());
  };
  
  // Controlar la visibilidad del carrito
  const openCartDrawer = () => {
    dispatch(openCartDrawerAction());
  };
  
  const closeCartDrawer = () => {
    dispatch(closeCartDrawerAction());
  };
  
  const toggleCartDrawer = () => {
    dispatch(toggleCartDrawerAction());
  };
  
  // Funciones para manejar nombres de clientes
  const addCustomerName = (name: string) => {
    dispatch(addCustomerNameAction(name));
  };
  
  const setCustomerName = (name: string) => {
    dispatch(setCurrentCustomerNameAction(name));
  };
  
  const removeCustomerName = (name: string) => {
    dispatch(removeCustomerNameAction(name));
  };
  
  return {
    items,
    isOpen,
    cartTotal,
    itemCount,
    customerNames,
    currentCustomerName,
    addToCart,
    removeFromCart,
    updateItemQuantity,
    emptyCart,
    openCartDrawer,
    closeCartDrawer,
    toggleCartDrawer,
    addCustomerName,
    setCustomerName,
    removeCustomerName,
  };
};
