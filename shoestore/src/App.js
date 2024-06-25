import logo from './logo.svg';
import './App.css';
import Home from './frontend/Home';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './frontend/components/Navbar';
import Footer from './frontend/components/Footer';
import Register from './frontend/components/Register';
import Login from './frontend/components/Login';
import Product from './frontend/components/Product/Product';
import Cart from './frontend/components/Product/Cart';
import { useEffect, useState } from 'react';
import Address from './frontend/components/Product/Address';
import PaymentOption from './frontend/components/Product/PaymentOption';
import CreditDebitCard from './frontend/components/Product/PaymentMethods/CreditDebitCard';
import PaymentDecided from './frontend/components/Product/PaymentMethods/PaymentDecided';
import Protected2 from './frontend/components/Protected2';
import Order from './frontend/components/Order';
import Category from './frontend/components/Product/Category';
import Error404 from './frontend/Error404';


function App() {

  const [productIdForCart, setproductIdForCart] = useState("");
  const [optionSelected, setoptionSelected] = useState("")
  const [quantities, setQuantities] = useState([]);
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Routes >
          <Route path='/' element=<Home pageSize='12' /> />
          <Route path='/register' element=<Register /> />
          <Route path='/register/*' element=<Error404 /> />
          <Route path='/login' element=<Login /> />
          <Route path='/login/*' element=<Error404 /> />
          <Route path='/product/:id' element=<Product /> />
          <Route path='/product/*' element=<Error404 /> />
          {/* <Route path='/cart/:userId' element=<Cart quantities={quantities} setQuantities={setQuantities} /> />
          <Route path='/Address' element=<Address /> />
          <Route path='/paymentOption' element=<PaymentOption optionSelected={optionSelected} setoptionSelected={setoptionSelected} /> />
          <Route path='/creditDebitCard' element=<CreditDebitCard /> />
          <Route path='/paymentDecided' element=<PaymentDecided optionSelected={optionSelected} setoptionSelected={setoptionSelected} quantities={quantities} setQuantities={setQuantities} /> /> */}
          <Route path='/cart/:userId' element = {<Protected2 Component = {<Cart quantities={quantities} setQuantities={setQuantities}  />} />} />
          <Route path='/cart/:*' element = {<Protected2 Component = {<Error404/>} />} />
          <Route path='/Address' element = {<Protected2 Component = {<Address />} />} />
          <Route path='/paymentOption' element = {<Protected2 Component = {<PaymentOption optionSelected={optionSelected} setoptionSelected={setoptionSelected} />} />} />
          <Route path='/creditDebitCard' element = {<Protected2 Component = {<CreditDebitCard />} />} />
          <Route path='/paymentDecided' element = {<Protected2 Component = {<PaymentDecided optionSelected={optionSelected} setoptionSelected={setoptionSelected} quantities={quantities} setQuantities={setQuantities} /> } />} />
          <Route path='/order' element = {<Protected2 Component = {<Order  quantities={quantities} setQuantities={setQuantities}  />} />} />
          <Route path='/category/:categoryName' element = {<Category />} />
          <Route path='/category/*' element={<Error404 />} />
          <Route path='*' element = {<Error404 />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
