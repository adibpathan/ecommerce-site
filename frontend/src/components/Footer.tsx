import { IoRocketOutline } from "react-icons/io5";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa6";
import { FaFacebookF } from "react-icons/fa6";
import { CiYoutube } from "react-icons/ci";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div>
      <footer className="bg-slate-800 h-24 text-white flex justify-around items-center">
        <div className="left-footer">
          <div className="heading flex justify-center items-center">
          <IoRocketOutline className="text-5xl pr-3 text-yellow-500 animate-bounce"/>
            <h1 className="capitalize font-semibold text-2xl">sign up for newsletter</h1>
          </div>
        </div>
        <div className="right-footer-search">
          <div className="footer-search">
          <input
              type="text"
              placeholder="Your Email Address"
              className="w-96 text-gray-600 p-2 font-semibold text-base tracking-wide rounded-tl-md rounded-bl-md outline-none"
            />
            <button
              id="search"
              className="bg-yellow-600 p-2 font-semibold rounded-tr-md rounded-br-md"
            >
              subscribe
            </button>
          </div>
          </div>
      </footer>
      <hr/>
      <footer className="bg-slate-800 h-96 flex justify-center items-center p-52">
        <div className="footer-middle grid grid-cols-4 gap-6 font-semibold text-sm tracking-wide place-items-center">
          <div className="contact-us flex flex-col">
            <h4 className="text-white font-semibold capitalize">contact us</h4>
            <br />
            <address className="text-gray-300">
              H.no: 422, Room no: 203, Sector-19, Koperkhariane, Navi Mumbai: 400709
            </address>
            <span className="text-yellow-600">+91-8104400127</span><br />
            <h3 className="text-gray-300">adibpathan41833@gmail.com</h3>
            <br />
            <div className="social-icons flex gap-3">
              <div className="twitter border rounded-full p-2"><a href="" className="text-xl text-gray-300"><FaXTwitter /></a></div>
              <div className="facebook border rounded-full p-2"><a href="" className="text-xl text-gray-300"><FaFacebookF  /></a></div>
              <div className="twitter border rounded-full p-2"><a href="" className="text-xl text-gray-300"><FaInstagram /></a></div>
              <div className="instagram border rounded-full p-2"><a href="" className="text-xl text-gray-300"><CiYoutube /></a></div>
            </div>
          </div>
          <div className="information capitalize">
            <h4 className="text-white">information</h4>
            <div className="links flex flex-col text-gray-400 pt-3 gap-4">
              <Link>privacy policy</Link>
              <Link>refund policy</Link>
              <Link>shipping policy</Link>
              <Link>terms of service</Link>
              <Link>blogs</Link>
            </div>
          </div>
          <div className="account capitalize">
            <h4 className="text-white">account</h4>
            <div className="links flex flex-col text-gray-400 pt-3 gap-4">
              <Link>search</Link>
              <Link>about us</Link>
              <Link>faq</Link>
              <Link>contact</Link>
              <Link>size chart</Link>
            </div>
          </div>
          <div className="quick-links capitalize">
            <h4 className="text-white">quick links</h4>
            <div className="links flex flex-col text-gray-400 pt-3 gap-4">
              <Link>accessories</Link>
              <Link>laptops</Link>
              <Link>headphones</Link>
              <Link>smart watches</Link>
              <Link>tablets</Link>
            </div>
          </div>
        </div>
      </footer>
      <hr />
      <footer className="bg-slate-800 h-24">
        <div className="copyright">;
          <p className="text-white text-center capitalize">&copy; {new Date().getFullYear()} powered by <span className="font-semibold text-base text-yellow-500">@codeByAdib</span></p>
        </div>
      </footer>
    </div>
  )
}

export default Footer
