import { useEffect, useState } from "react";
import { useParams } from "react-router";
import SliderProducts from "../../Components/Products/SliderProducts";
import ErrorHandle from "../../Components/Error-Handling/ErrorHandle";
import SliderProductsLoading from "../../Components/Products/SliderProductsLoading";

function Category() {
const {cat} = useParams();
const [categoryProducts, setCategoryProducts] = useState([]);
const [categoryProductsIsLoading, setCategoryProductsIsLoading] = useState(true);
const [categoryTitle , setCategoryTitle] = useState("");
const [error, setError] = useState("");
// Fetch Category Products
async function getCategoryProducts() {
    try{
        setCategoryProductsIsLoading(true);
        setError("");
        const res = await fetch(`https://dummyjson.com/products/category/${cat}`);
        if (!res.ok) throw new Error("Failed to fetch category products");
        const data = await res.json();
        setCategoryProducts(data.products);
        setCategoryTitle(`${cat.replaceAll("-"," ")} : ${data.limit}` )
    } catch(err){
        setError(err.message || "Something went wrong");
    } finally{
        setCategoryProductsIsLoading(false);
    }
    }
useEffect(() => {
    getCategoryProducts();
},[cat]);
    return (
    <>
    {/* Loading */}
    {categoryProductsIsLoading && <SliderProductsLoading/>}
    {/* Error */}
    {!categoryProductsIsLoading && error && <ErrorHandle message={error} onRetry={getCategoryProducts} />}
    {/* Products */}
    {!categoryProductsIsLoading && !error && <SliderProducts title={categoryTitle} data={categoryProducts} />}
    </>
    )
}

export default Category