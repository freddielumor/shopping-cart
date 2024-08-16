import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ItemList from './components/ItemList/ItemList';
import Checkout from './components/Checkout/Checkout';
import { CartProvider } from './context/CartContext';
import Container from './components/Container/Container';

const App: React.FC = () => {
  return (
    <CartProvider>
      <Container>
        <Router>
          <Routes>
            <Route path="/" element={<ItemList />} />
            <Route path="/checkout" element={<Checkout />} />
          </Routes>
        </Router>
      </Container>
    </CartProvider>
  );
};

export default App;
