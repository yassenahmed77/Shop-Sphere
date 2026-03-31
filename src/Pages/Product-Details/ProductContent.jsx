import { useContext } from "react";
import { FaRegHeart, FaRegStar, FaShare, FaShoppingCart, FaStar  , FaStarHalfAlt   } from "react-icons/fa";
import { Link } from 'react-router';
import { CartContext } from "../../Components/Context/CartContext";
import toast from 'react-hot-toast';
import { FavContext } from "../../Components/Context/FavouriteContext";
function ProductDetailsContent({details}) {
const {addToCart} = useContext(CartContext);
const {toggleFavourite , favouriteItems} = useContext(FavContext);
const isInFavourites = favouriteItems.some(item => item.id === details.id);
const fullStars = Math.floor(details.rating);
const halfStar = details.rating % 1 >= 0.5 ? 1 : 0;
const emptyStars = 5 - fullStars - halfStar;
function handleAddToCart(){
    addToCart(details)
    toast.success(
        <div className="incart-notify">
        <img src={details.images[0]} alt="" />
        <div className="content">
            <h4>{details.title}</h4>
            <p>added to cart.</p>
            <Link to={"/cart"} className="view">View Cart</Link>
        </div>
        </div>
        ,{duration: 1500}
    )
}
return (
    <div className="details">
        <h1 className="name">{details.title}</h1>
        <div className="stars">
            {[...Array(fullStars)].map((_, i) => (
            <FaStar key={`full-${i}`} />
            ))}
            {halfStar === 1 && <FaStarHalfAlt />}
            {[...Array(emptyStars)].map((_, i) => (
            <FaRegStar key={`empty-${i}`} />
            ))}
        </div>
        <p className="price">${details.price}</p>
        <h5>Availability: <span>{details.availabilityStatus}</span></h5>
        <h5>Brand: <span>{details.brand}</span></h5>
        <p className="desc">{details.description}</p>
        <h3><span> Hurry Up! Only {details.stock} Products Left In Stock.</span></h3>
        <Link className='btn add' onClick={handleAddToCart}>Add To Cart <FaShoppingCart /></Link>
        <div className="icons">
            <span className={isInFavourites ? "added" : ''} onClick={() => toggleFavourite(details)}><FaRegHeart /></span>
            <span><FaShare /></span>
        </div>
    </div>
)
}

export default ProductDetailsContent