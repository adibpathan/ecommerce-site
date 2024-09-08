import { IoSearch } from "react-icons/io5";
import { PiCircleNotchLight } from "react-icons/pi";
import { CiUser } from "react-icons/ci";
import { CiHeart } from "react-icons/ci";
import { FaShopify } from "react-icons/fa";
import { NavLink, Link } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select"

const Header = () => {

  return (
    <div>
      <header className="bg-slate-900 text-white">
        <div className="container flex justify-around items-center w-full h-36">
          <div className="logo">
            <h1>Shreshkart</h1>
          </div>
          <div className="header-search flex justify-center items-center">
            <input
              type="text"
              placeholder="Search Product Here...."
              className="w-96 text-gray-600 p-2 font-semibold text-base tracking-wide rounded-tl-md rounded-bl-md outline-none shadow-xl"
            />
            <button
              id="search"
              className="text-2xl bg-yellow-500 p-2 font-semibold rounded-tr-md rounded-br-md"
            >
              <IoSearch className="text-gray-700"/>
            </button>
          </div>
          <div className="right-header flex justify-center items-center gap-9 font-semibold text-sm tracking-wide capitalize">
            <div className="compare-products">
              <Link className="flex items-center">
                <div className="compare-icon">
                  <PiCircleNotchLight className="text-2xl mr-1" />
                </div>
                <span className="tracking-wide">
                  compare <br />
                  products
                </span>
              </Link>
            </div>
            <div className="wishlist">
              <Link className="flex items-center">
                <div className="wishlist-icon">
                  <CiHeart className="text-2xl mr-1" />
                </div>
                <span className="tracking-wide">
                  favourite <br />
                  wishlist
                </span>
              </Link>
            </div>
            <div className="login">
              <Link className="flex items-center" to="/login">
                <div className="login-icon">
                  <CiUser className="text-2xl mr-1" />
                </div>
                <span className="tracking-wide">
                  log in <br />
                  my account
                </span>
              </Link>
            </div>
            <div className="shop">
              <Link className="flex items-center">
                <div className="shop-icon">
                  <FaShopify className="text-3xl mr-2 text-yellow-500 animate-bounce"/>
                </div>
                <div className="cart">
                  <span className="bg-white text-black" style={{backgroundColor: "white", padding: "2px 18px", borderRadius: "2px"}}>0</span>
                  <br />
                  <p className="mt-1">Rs 500</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </header>
      <div className="header-bottom flex justify-start items-center text-gray-300 pl-14 bg-slate-800 text-xs font-semibold tracking-wide h-12">
        <div className="dropdown-menu">
        <Select>
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="shop categories"/>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>shop categories</SelectLabel>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
          <SelectItem value="blueberry">Blueberry</SelectItem>
          <SelectItem value="grapes">Grapes</SelectItem>
          <SelectItem value="pineapple">Pineapple</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
        </div>
        <div className="menu-links flex justify-center items-center gap-14 uppercase ml-32">
          <NavLink to="/">home</NavLink>
          <NavLink to="/">our store</NavLink>
          <NavLink to="/">blogs</NavLink>
          <NavLink to="/contact">contact</NavLink>
        </div>
      </div>
    </div>
  );
};

export default Header;
