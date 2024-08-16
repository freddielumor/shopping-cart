import React, { ReactNode } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, RenderOptions } from '@testing-library/react';
import { CartProvider } from '../context/CartContext';
import '@testing-library/jest-dom';

interface TestWrapperProps {
  children: ReactNode;
}

const TestWrapper: React.FC<TestWrapperProps> = ({ children }) => {
  return (
  <>
    <CartProvider>
      <Router>
        { children } 
      </Router>
    </CartProvider>
  </>)

};

const testRender = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: TestWrapper, ...options });

export * from '@testing-library/react';
export { testRender as render };
