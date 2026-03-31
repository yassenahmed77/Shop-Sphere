import TopHeader from "./Components/header/TopHeader.jsx";
import BottomHeader from "./Components/header/BottomHeader.jsx";
import Home from "./Pages/Home.jsx";
import ProductDetails from "./Pages/Product-Details/ProductDetails.jsx";
import { Route , Routes } from "react-router";
import Cart from "./Components/Cart/Cart.jsx";
import { Toaster } from "react-hot-toast";
import ScrollToTop from "./Components/ScrollToTop.jsx";
import { AnimatePresence } from "framer-motion";
import Category from "./Pages/Categroy/Category.jsx";
import SearchPage from "./Pages/Searched-Products/SearchPage.jsx";
import Favourite from "./Favourites/Favourite.jsx";

function App() {
  return (
    <>
      <header>
        <TopHeader />
        <BottomHeader />
      </header>
      <Toaster
        position="bottom-right"
        reverseOrder={false}
      />
      <ScrollToTop/>
      <AnimatePresence mode="wait">
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path='/products/:id' element={<ProductDetails/>}/>
        <Route path='/category/:cat' element={<Category/>}/>
        <Route path='/search' element={<SearchPage/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/favourites' element={<Favourite/>}/>
      </Routes>
      </AnimatePresence>
    </>
  );
}

export default App;
