import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/about" element={<About/>}/>
            <Route path="/contact" element={<Contact/>} />
            <Route path="/login" element={<Login/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
