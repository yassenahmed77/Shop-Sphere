import { createContext, useEffect, useState } from "react"
export const FavContext = createContext();

function FavouriteProvider({children}) {
    const [favouriteItems, setFavouriteItems] = useState(() => {
        try {
            const items = localStorage.getItem("favItems");
            if (!items || items === "undefined") return [];
            return JSON.parse(items);
        } catch {
            return [];
        }
    });
    // Removing Exists Items & Adding Non Exists
    function toggleFavourite(item){
        setFavouriteItems((prevItems) => {
            const exists = prevItems.some(i => i.id === item.id); 
            if(exists){
                return prevItems.filter(i => i.id !== item.id);
            }else{
                return [...prevItems, item]
            }
        });
    }
    // Set Items In Local Storage
    useEffect(() => {
        localStorage.setItem("favItems" , JSON.stringify(favouriteItems));
    },[favouriteItems])
    return (
        <FavContext.Provider value={{toggleFavourite , favouriteItems}}>
            {children}
        </FavContext.Provider>
    )
}

export default FavouriteProvider