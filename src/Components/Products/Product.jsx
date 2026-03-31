import { useContext } from "react";
import { FaCheck, FaRegStar, FaStar  , FaStarHalfAlt   } from "react-icons/fa";
import { FaShoppingCart , FaRegHeart } from "react-icons/fa";
import { FaShare } from "react-icons/fa";
import {Link} from "react-router";
import { CartContext } from "../Context/CartContext";
import toast from 'react-hot-toast';
import { FavContext } from "../Context/FavouriteContext";
function Product({product}) {
  // Rating Stars
  const fullStars = Math.floor(product.rating || 0);
  const halfStar = product.rating % 1 >= 0.5 ? 1 : 0;
  const emptyStars = 5 - fullStars - halfStar;
  const {cartItems , addToCart} = useContext(CartContext);
  const {toggleFavourite , favouriteItems} = useContext(FavContext);
  // Check If Items Are Already In Cart Or Favourites
  const isInCart = cartItems.some(item => item.id === product.id);
  const isInFavourites = favouriteItems.some(item => item.id === product.id);
  // Add To (Cart,Favourites) And Their Notification
  function handleAddToCart(){
    addToCart(product);
    toast.success(
      <div className="incart-notify">
        <img src={product.images[0]} alt="" />
        <div className="content">
          <h4>{product.title}</h4>
          <p>added to cart.</p>
          <Link to={"/cart"} className="view">View Cart</Link>
        </div>
      </div>
      ,{duration: 1500}
    )
  }
  function handleFavourites(){
    toggleFavourite(product);
    toast.success(
      <div className="favourite-notify">
        <div className="content">
          {isInFavourites ? <h4>{product.title} removed from favourites.</h4> : <h4>{product.title} added to favourites.</h4>}
        </div>
      </div>
  ,{duration: 1500}
)
  }
  return (
    <>
    <div className={`card ${isInCart ? 'in-cart' : ''}`}>
      <Link to={`/products/${product.id}`}>
      <span className="status-cart"><FaCheck /> In Cart</span>
        <div className="image">
            <img src={product.images[0]} alt="" />
        </div>
        <p className="name">{product.title}</p>
      </Link>
        <div className="stars">
        {[...Array(fullStars)].map((_, i) => (
          <FaStar key={`full-${i}`} />
        ))}
        {halfStar === 1 && <FaStarHalfAlt />}
        {[...Array(emptyStars)].map((_, i) => (
          <FaRegStar key={`empty-${i}`} />
        ))}
        </div>
        <div className="price"><span>${product.price}</span></div>
        <div className="icons">
            <span className="add" onClick={handleAddToCart}><FaShoppingCart /></span>
            <span className={isInFavourites ? "added" : ''} onClick={handleFavourites}><FaRegHeart /></span>
            <span><FaShare /></span>
        </div>
    </div>
    </>
  )
}

export default Product