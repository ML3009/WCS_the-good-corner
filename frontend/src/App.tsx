
import { Outlet } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer";

import './App.css'
import './index.css';

function App() {


  return (
    <>
        <Header/>
        <Outlet/>
        <Footer />
    </>
  )
}

export default App
