import { useEffect, useState } from "react";
import SliderProducts from "../Components/Products/SliderProducts";
import Slider from "../Components/Slider/Slider";
import PageTransition from "../Components/PageTransition";
import ErrorHandle from "../Components/Error-Handling/ErrorHandle";
import SliderProductsLoading from "../Components/Products/SliderProductsLoading";

const categories = [
  "smartphones",
  "mobile-accessories",
  "laptops",
  "tablets",
  "sunglasses",
  "sports-accessories",
];
function Home() {
  const [products,setProducts] = useState([]);
  const [isloading , setIsLoading] = useState(true);
  const [errorMessage,setErrorMessage] = useState("");
    async function getProducts() {
    try{
      setIsLoading(true)
      setErrorMessage("");
      const results = await Promise.all(categories.map(async (cat) =>{
        const res = await fetch(`https://dummyjson.com/products/category/${cat}`);
        if (!res.ok) {
          throw new Error(`Failed to fetch ${cat.replaceAll("-"," ")}`);
        }
        const data = await res.json();
        return({[cat] : data.products});
      }));
      const productsData = Object.assign({},...results);
      setProducts(productsData);
    } catch(error){
      setErrorMessage(error.message || "Something went wrong");
  } finally{
    setIsLoading(false);
  }
  }
  useEffect(() => {
    getProducts();
  },[]);
  return (
    <PageTransition>
      <div>
        <Slider />
        {/* Loading */}
        {isloading && <SliderProductsLoading/>}
        {/* Error */}
        {!isloading && errorMessage && <ErrorHandle message={errorMessage} onRetry={getProducts}/>}
        {/* Products */}
        {!isloading && !errorMessage && (
          categories.map((cat)=>{
          return(
            <SliderProducts key={cat} title={cat.replaceAll("-"," ")} data={products[cat]}/>
          )
        }))}
      </div>
    </PageTransition>
  );
}

export default Home;
