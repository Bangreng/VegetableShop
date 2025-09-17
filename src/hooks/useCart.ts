import { useContext } from 'react';
import { CartContext } from '../features/cart/CartContext';

export const useCart = () => {
  const context = useContext(CartContext);
  return context!;
};