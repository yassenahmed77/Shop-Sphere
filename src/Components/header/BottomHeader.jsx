import { useEffect, useState } from "react";
import { IoMdMenu } from "react-icons/io";
import { IoMdArrowDropdown } from "react-icons/io";
import { Link, useLocation } from "react-router";
import { PiSignInBold } from "react-icons/pi";
import { BsPersonFillAdd } from "react-icons/bs";
import { FaHome } from "react-icons/fa";
function BottomHeader() {
  // Header Sections
  const links = [
    {name:"Home",route:"/"},
    {name:"About",route:"/about"},
    {name:"Accessories",route:"/accessories"},
    {name:"Blog",route:"/blog"},
    {name:"Contact",route:"/contact"}
  ];
  const [linksState,setLinksState] = useState(false);
  const location = useLocation();
  const [catName,setCatName] = useState([]);
  // Fetching Categories
  useEffect(() => {
    async function getCategories(){
      const res = await fetch("https://dummyjson.com/products/categories");
      const data = await res.json();
      setCatName(data);
    }
    getCategories()
  },[]);
  // Handling Categories List
  useEffect(() => {
    setLinksState(false);
  },[location])
  return (
    <div className="bottom-header">
      <div className="container">
          <div className="cat-nav">
            <div className="cat-btn" onClick={() => setLinksState(!linksState)}>
              <IoMdMenu className="small-screen"/>
              <IoMdMenu />
              <p>Browse Category</p>
              <IoMdArrowDropdown />
            </div>
            <div className={`cat-list ${linksState ? "show" : ""}`}>
              {catName.map((cat) => {
                return(
                  <Link to={`category/${cat.slug}`} key={cat.slug}>{cat.name}</Link>
                )
              })}
            </div>
          </div>
            <li className="small-screen"><Link to="/"><FaHome  /></Link></li>
            <div className="nav-links">
              {links.map((link) => {
                return(
                  <li  key={link.route} className={`${location.pathname === link.route ? "active" : ""}`}><Link to={link.route}>{link.name}</Link></li>
                )
              })}
            </div>
            <div className="nav-icons">
              <PiSignInBold />
              <BsPersonFillAdd />
            </div>
      </div>
    </div>
  )
}

export default BottomHeader