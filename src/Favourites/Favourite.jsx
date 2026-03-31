import { useContext } from "react";
import { FavContext } from "../Components/Context/FavouriteContext";
import "./favourite.css";
import Product from "../Components/Products/Product";

function Favourite() {
    const {favouriteItems} = useContext(FavContext);
    return (
        <div className="favourites">
            <div className="container">
                <div className="head">
                    <h2>Your Favourites.</h2>
                </div>
                {favouriteItems.length > 0 ? (
                                    <div className="products">
                {favouriteItems.map((item , i) => {
                    return(
                        <div className="product">
                            <Product key={i} product={item}/>
                        </div>
                    )
                })}
                </div>
                ) : <p className="no-items">No Favorites Products yet.</p>}
            </div>
        </div>
    )
}

export default Favourite