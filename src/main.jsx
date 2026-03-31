import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter} from "react-router";
import CartProvider from './Components/Context/CartContext.jsx';
import FavouriteProvider from './Components/Context/FavouriteContext.jsx';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <CartProvider>
      <FavouriteProvider>
        <App />
      </FavouriteProvider>
    </CartProvider>
    </BrowserRouter>
  </StrictMode>
)
