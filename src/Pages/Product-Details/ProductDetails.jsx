import { useEffect, useState } from 'react';
import {useParams } from 'react-router'
import "./productDetails.css"
import SliderProducts from '../../Components/Products/SliderProducts';
import ProductImgs from './ProductImgs';
import ProductContent from './ProductContent';
import PageTransition from "../../Components/PageTransition";
import ErrorHandle from '../../Components/Error-Handling/ErrorHandle';
import ProductDetailsLoading from './ProductDetailsLoading';
import SliderProductsLoading from '../../Components/Products/SliderProductsLoading';

function ProductDetails() {
    // Clicked Product Id
    const {id} = useParams();
    const [productDetails , setProductDetails] = useState({});
    const [isLoading,setIsLoading] = useState(true);
    const [relatedProducts , setRelatedProducts] = useState([]);
    const [relatedIsLoading,setRelatedIsLoading] = useState(true);
    // Error Messages
    const [relatedError, setRelatedError] = useState("");
    const [error, setError] = useState("");
    async function getProductsDetails() {
        try{
            setIsLoading(true);
            setError("");
            let res = await fetch(`https://dummyjson.com/products/${id}`);
            if (!res.ok) {
                throw new Error("Failed to fetch product");
            }
            let data = await res.json();
                setProductDetails(data);
        } 
        catch(error){
            setError(error.message || "Something went wrong");
        } finally{
            setIsLoading(false);
        }
    }
    useEffect(() =>{
        getProductsDetails();
    },[id]);
    // Fetch Same Category Products
    async function getRelatedProducts() {
        if(!productDetails.category) return;
        try{
            setRelatedIsLoading(true);
            setRelatedError("");
            let res = await fetch(`https://dummyjson.com/products/category/${productDetails.category}`);
            if (!res.ok) {
                    throw new Error("Failed to fetch product");
            }
            let data = await res.json();
            setRelatedProducts(data.products);
            } catch(error){
                setRelatedError(error.message || "Something went wrong")
            } finally{
                setRelatedIsLoading(false);
            }
        }
    useEffect(() => {
        getRelatedProducts();
    },[productDetails?.category]);
    return (
        <PageTransition key={id}>
            <div>
                {/* Categories Loading */}
                {isLoading && <ProductDetailsLoading/>}
                {/* Error */}
                {!isLoading && error && <ErrorHandle message={error} onRetry={getProductsDetails}/>}
                {/* Products */}
                {!isLoading && !error && (
                <div className='item-details'>
                    <div className="container">
                        <ProductImgs details={productDetails}/>
                        <ProductContent details={productDetails}/>
                    </div> 
                </div>
                ) }
                {/* Related Products Loading */}
                {relatedIsLoading && <SliderProductsLoading/>}
                {/* Error */}
                {!relatedIsLoading && relatedError && <ErrorHandle message={relatedError} onRetry={getRelatedProducts}/>}
                {/* Related Products */}
                {!relatedIsLoading && !relatedError && productDetails?.category && relatedProducts.length > 0 && (<SliderProducts title = {productDetails?.category?.replaceAll("-"," ")} data={relatedProducts}/>)}
            </div>
        </PageTransition>
    )
}

export default ProductDetails