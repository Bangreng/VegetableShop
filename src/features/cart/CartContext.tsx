import { createContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { Product } from '../../types/Product';

export type CartItem = Product & { quantity: number };

type CartContextType = {
  cart: CartItem[];
  totalItems: number;
  totalPrice: number;
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: string) => void;
};

export const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (product: Product, quantity: number) => {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      const newCart = cart.map(item => {
        if (item.id === product.id) {
          return { ...item, quantity: item.quantity + quantity };
        }
        return item;
      }).filter(item => item.quantity > 0);
      setCart(newCart);
    } else {
      if (quantity > 0) {
        setCart([...cart, { ...product, quantity }]);
      }
    }
  };

  const removeFromCart = (productId: string) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, totalItems, totalPrice, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
