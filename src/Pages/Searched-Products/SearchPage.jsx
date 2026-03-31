import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import SliderProducts from "../../Components/Products/SliderProducts";
import PageTransition from "../../Components/PageTransition";
import ErrorHandle from "../../Components/Error-Handling/ErrorHandle";
import SliderProductsLoading from "../../Components/Products/SliderProductsLoading";

function SearchPage() {
    const query = new URLSearchParams(useLocation().search).get("q") || "";
    const [products,setProducts] = useState([]);
    const [isLoading,setIsLoading] = useState(true);
    const [title,setTitle] = useState("");
    const [error, setError] = useState("");
    async function getSearchedProducts(){
        try{
            setIsLoading(true);
            setError("");
            let res = await fetch(`https://dummyjson.com/products/search?q=${query.trim()}`);
            if(!res.ok) throw new Error("Failed to fetch search results");
            let data = await res.json();
            setProducts(data.products || []);
            setTitle(`Results For : ${query}`)
        } catch(err){
            setError(err.message || "Something went wrong");
        } finally{
            setIsLoading(false);
        }
    }
    useEffect(() => {
        if(query) getSearchedProducts();
    },[query])
    return (
        <div>
            <PageTransition key={query}>
                {/* Loading */}
                {isLoading && <SliderProductsLoading/>}
                {/* Error */}
                {!isLoading && error && <ErrorHandle message={error} onRetry={getSearchedProducts} />}
                {/* Products */}
                {!isLoading && !error && (
                    products.length === 0 ? (
                        <p style={{marginTop: "20px" , paddingLeft:"10px" }}>No Products Found.</p>
                    ) : (
                        <SliderProducts title={title} data={products}/>
                    )
                )}
            </PageTransition>
        </div>
    )
}

export default SearchPage