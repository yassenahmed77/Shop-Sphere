import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router";
import "./searchBox.css";

function SearchBox() {
    const [searchTerm, setSearchTerm] = useState("");
    const [suggestion,setSuggestion] = useState([]);
    const navigate = useNavigate();
    const [highlightIndex, setHighlightIndex] = useState(-1);
    // For Responsive
    const [showSearch, setShowSearch] = useState(false);
    // onSubmit Func
    function handleSubmit(e){
        e.preventDefault();
        if(searchTerm){
            navigate(`/search?q=${encodeURIComponent(searchTerm.trim().toLowerCase())}`);
            setSearchTerm("");
            setSuggestion([]);
            setShowSearch(false)
        }
    }
    // Handle KeyBoard Arrows
    function handleKeyDown(e) {
    if (suggestion.length === 0) return;
    if (e.key === "ArrowDown") {
        setHighlightIndex(prev => (prev + 1) % suggestion.length);
    } else if (e.key === "ArrowUp") {
        setHighlightIndex(prev => (prev - 1 + suggestion.length) % suggestion.length);
    } else if (e.key === "Enter") {
        if (highlightIndex >= 0) {
            navigate(`/products/${suggestion[highlightIndex].id}`);
            setSearchTerm("");
            setSuggestion([]);
            setHighlightIndex(-1);
        }
    }
    }
    // Fetch search suggestions from API
    async function fetchSuggestions() {
        try{
            let res = await fetch(`https://dummyjson.com/products/search?q=${searchTerm.trim()}`);
            let data = await res.json();
            setSuggestion(data.products.slice(0,5) || []);
        } catch(error){
            setSuggestion([]);
        }
    }
    // Debounce search input to reduce API calls
    useEffect(() => {
        const debounce = setTimeout(() => {
            if(searchTerm) {
                fetchSuggestions();
            } else {
                setSuggestion([]);
            }
        }, 300);
        return () => clearTimeout(debounce);
    },[searchTerm]);
    // Focus On Search
    useEffect(() => {
        if (showSearch) {
            document.getElementById("search")?.focus();
        }
    }, [showSearch]);
    return (
        <>
        <div className="mobile-search-icon">
            <FaSearch onClick={() => !setShowSearch(prev => !prev)} />
        </div>
        <div className={`search ${showSearch ? "active" : ""}`}>
            <form onSubmit={handleSubmit} className="search-box">
                <input type="text" placeholder="Search For Products" name="search" id="search" onKeyDown={handleKeyDown} value={searchTerm} autoComplete="off" onChange={(e) => setSearchTerm(e.target.value)} />
                <button type="submit"><FaSearch/></button>
            </form>
            {showSearch && (<span className="close-search" onClick={() => setShowSearch(false)}>✕</span>)}
            {suggestion.length > 0 ? (
                <ul className="suggestion">
                    {suggestion.map((item , index) => {
                        return (
                            <li key={item.id} className={index === highlightIndex ? "active" : ""} onClick={() => {
                                navigate(`/products/${item.id}`);
                                setSearchTerm("");
                                setSuggestion([]);
                                setHighlightIndex(-1);
                            }}>
                                    <img src={item.images[0]} alt="" />
                                    <h5>{item.title}</h5>
                            </li>
                            
                        )
                    })}
                </ul>
            ) : ""}
        </div>
        </>
    )
}

export default SearchBox 