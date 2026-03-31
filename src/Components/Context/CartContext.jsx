import {createContext, useEffect, useState } from "react"
export const CartContext = createContext(); 

function CartProvider({children}) {
    const [cartItems,setCartItems] = useState(() => {
        try {
            const items = localStorage.getItem("cartItems");
            if (!items || items === "undefined") return [];
            return JSON.parse(items);
        } catch {
            return [];
        }
    });
    // Main Func
    function addToCart(item){
        setCartItems((prevItems) => {
            const exist = prevItems.find(i => i.id === item.id);
            if(exist) {
                return(
                    prevItems.map((i) => {
                        return(
                            i.id === item.id ? {...i, quantity: i.quantity + 1} : i
                        )
                    })
                )
            }else{
                return(
                    [...prevItems , {...item, quantity: 1}]
                )
            }
    });
    }
    // Helper Functions
    function increaseQuantity(id){
        setCartItems((prevItems) => {
            return(
                prevItems.map((item) => {
                    return(
                        item.id === id ? {...item , quantity: item.quantity + 1} : item
                    );
                })
            );
        });
    };

        function decreaseQuantity(id){
        setCartItems((prevItems) => {
            return(
                prevItems.map((item) => {
                    return(
                        item.id === id ? {...item , quantity: item.quantity - 1} : item
                    );
                }).filter(item => item.quantity > 0)
            )
        })
    }

    function removeItem(id){
        setCartItems((prevItems) => {
            return(
                prevItems.filter(item => item.id !== id)
            );
        });
    };
    // Set Items In Local Storage
    useEffect(() => {
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
    },[cartItems]);
return (
    <CartContext.Provider value={{cartItems, addToCart, increaseQuantity, decreaseQuantity, removeItem}}>
        {children}
    </CartContext.Provider>
)
}

export default CartProvider