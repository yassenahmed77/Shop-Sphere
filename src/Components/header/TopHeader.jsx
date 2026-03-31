// Imports
import { Link } from "react-router";
import Logo from "../../Images/logo.png";
import { CiHeart } from "react-icons/ci";
import { TiShoppingCart } from "react-icons/ti";
import "./header.css";
import { useContext } from "react";
import { CartContext } from "../Context/CartContext";
import SearchBox from "./SearchBox";
import { FavContext } from "../Context/FavouriteContext";
function TopHeader() {
  // Hooks
  const {cartItems} = useContext(CartContext);
  const {favouriteItems} = useContext(FavContext);
  // Calculation
  const totalItems = cartItems.reduce((acc,item) => acc + item.quantity,0)
  return (
    <div className="top-header">
      <div className="container">
        <a><img className="logo" src={Logo} alt="Logo" /></a>
        <SearchBox/>
        <div className="header-icons">
          <div className="icon">
            <Link to={"/favourites"}>
            <CiHeart/>
            <span className="count">{favouriteItems.length}</span>
            </Link>
          </div>
          <div className="icon">
            <Link to="/cart">
            <TiShoppingCart/>
            <span className="count">{totalItems}</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TopHeader