
import { createContext, useState, useContext, ReactNode } from 'react';

type CartItem = {
  sku: number;
  qty: number;
};

type CartContextType = {
  cart: CartItem[];
  addToCart: (sku: number, qty: number) => void;
  removeFromCart: (sku: number) => void;
};


const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (sku: number, qty: number) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.sku === sku);
      if (existingItem) {
        return prevCart.map(item =>
          item.sku === sku ? { ...item, qty: item.qty + qty } : item
        );
      }
      return [...prevCart, { sku, qty }];
    });
  };

  const removeFromCart = (sku: number) => {
    setCart(prevCart =>
      prevCart.map(item =>
        item.sku === sku ? { ...item, qty: Math.max(item.qty - 1, 0) } : item
      )
    );
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
