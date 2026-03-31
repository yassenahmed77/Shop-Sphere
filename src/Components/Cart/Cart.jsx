import { useContext } from "react"
import { CartContext } from "../Context/CartContext";
import { FaTrash } from "react-icons/fa6";
import "./cart.css";
function Cart() {
    const {cartItems, increaseQuantity, decreaseQuantity, removeItem} = useContext(CartContext);
    const totalPrice = cartItems.reduce((acc, item) => acc + (item.price * item.quantity),0);
    return(
        <div className="checkout">
            <div className="order">
                <h1>Order Summary</h1>
                <div className="items">
                    {cartItems.length === 0 ? <p className="empty">Your Cart Is Empty</p> : (
                        cartItems.map((item) => {
                            return(
                                <div className="item-cart" key={item.id}>
                                    <div className="container">
                                        <img src={item.thumbnail} alt={item.title} />
                                    <div className="content">
                                        <h4>{item.title}</h4>
                                        <p className="price">${item.price}</p>
                                        <div className="quantity">
                                            <button onClick={()=> decreaseQuantity(item.id)}>-</button>
                                            <span className="num">{item.quantity}</span>
                                            <button onClick={()=> increaseQuantity(item.id)}>+</button>
                                        </div>
                                    </div>
                                    </div>
                                    <button className="delete" onClick={()=> removeItem(item.id)}><FaTrash /></button>
                                </div>
                            )
                        })
                    )}
                </div>
                <div className="summary">
                    <p>Total:</p>
                    <span className="total-price">${totalPrice.toFixed(2)}</span>
                </div>
                <button className="submit" type="submit">Place Order</button>
            </div>
        </div>
    )
}

export default Cart