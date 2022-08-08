import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { SearchProvider } from "./contexts/SearchContext/searchContext";

import Header from "./Components/Header/Header";
import Sidebar from "./Components/Sidebar/Sidebar";
import Home from "./pages/Home.jsx";
import Kanbans from "./pages/Kanbans";
import Orders from "./pages/Orders";
import Products from "./pages/Products";
import Requests from "./pages/Requests";

function App() {


  return (
    <SearchProvider>
    
    <>

    <Router>
      <Sidebar/>
    <Header />

    <div className="container">
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/kanbans" element={<Kanbans/>}/>
        <Route path="/products" element={<Products/>}/>
        <Route path="/orders" element={<Orders/>}/>
        <Route path="/requests" element={<Requests/>}/>
      </Routes>
    </div>
  </Router>
    </>
    </SearchProvider>
  );
}

export default App;
