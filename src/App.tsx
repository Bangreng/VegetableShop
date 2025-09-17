
import '@mantine/core/styles.css';
import './App.css'
import {MantineProvider } from '@mantine/core';
import Header from './components/Header/Header'
import Main from './components/Main/Main';
import { CartProvider } from './features/cart/CartContext';

function App() {
  

  return (
    <CartProvider>
      <MantineProvider>
        <Header />
        <Main />
      </MantineProvider>
    </CartProvider>

  )
}

export default App
