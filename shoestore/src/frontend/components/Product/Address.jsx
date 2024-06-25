import React from 'react';
import { useState, useMemo, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
const Address = () => {
  const Navigate = useNavigate()
  const auth = localStorage.getItem("user");
  const userId = auth ? JSON.parse(auth)._id : null;
  const [Address, setAddress] = useState("");
  const [City, setCity] = useState("");
  const [Country, setCountry] = useState("");
  const [Pincode, setPincode] = useState(null);
  const [Phone, setPhone] = useState(null)
  async function getUserAddress() {
    try {
      let result = await fetch(`http://localhost:5000/user/${userId}`);
      result = await result.json();
      // setCartProducts(result.productIds || []);
      setAddress(result.Address);
      setCity(result.City);
      setCountry(result.Country);
      setPincode(result.Pincode);
      setPhone(result.Phone)
    } catch (error) {
      console.error('Error fetching cart items:', error);
    }
  }

  useEffect(() => {
    getUserAddress()
  }, [])
  
  // Update the state when the component mounts
  useEffect(() => {
    setAddress(Address || ""); // Update Address state with the autofilled value if it exists
    setCity(City || ""); // Update City state with the autofilled value if it exists
    setCountry(Country || ""); // Update Country state with the autofilled value if it exists
    setPincode(Pincode || null); // Update Pincode state with the autofilled value if it exists
    setPhone(Phone || null);
  }, [Address, City, Country, Pincode,Phone]); // Run whenever these state variables change
  

  async function updateAddress() {
    console.log(Address , City , Country , Pincode,Phone);

    if(Address && City && Country && Pincode && Phone ){
      let result12 = await fetch(`http://localhost:5000/userAddress/${userId}`, {
        method: "PUT",
        headers: { "Content-type": "application/json; charset=UTF-8" },
        body: JSON.stringify({ Address, City, Country, Pincode,Phone })
      });
      result12 = await result12.json()
      console.log(result12);
      // alert("updated changes")
      Navigate('/paymentOption')
    }
    else{
      alert("enter valid details")
    }
  }

  const validate = (e) => { // dont let first character to be a space 
    if (/^\s/.test(e.target.value))
      e.target.value = '';
  };

  return (
    <div className='Address' style={{ height: "100vh" }}>
      <div className="container">
        <div class="card shishmaru" style={{ height: "80vh", marginLeft: "auto", marginRight: "auto", marginTop: "60px", padding: "30px", boxShadow: "8px 8px 8px" }}>
          <ul class="list-group list-group-flush" style={{ listStyle: "none", height: "inherit", justifyContent: "space-evenly" }}>
            <li><h3>Delivery Address</h3></li>
            <li><input type="text" placeholder='Enter Address' style={{ width: "80%", height: "3rem", borderRadius: "10px" }} value={Address} onChange={(e) => setAddress(e.target.value)} onInput={validate} /></li>
            <li><input type="text" placeholder='Enter City' style={{ width: "80%", height: "3rem", borderRadius: "10px" }} value={City} onChange={(e) => setCity(e.target.value)} onInput={validate} /></li>
            <li><input type="number" placeholder='Enter Pincode' style={{ width: "80%", height: "3rem", borderRadius: "10px" }} value={Pincode} onChange={(e) => setPincode(e.target.value)} onInput={validate} /></li>
            <li><input type="number" placeholder='Enter Phone' style={{ width: "80%", height: "3rem", borderRadius: "10px" }} value={Phone} onChange={(e) => setPhone(e.target.value)} onInput={validate} /></li>
            <li><input type="text" placeholder='Enter Country' style={{ width: "80%", height: "3rem", borderRadius: "10px" }} value={Country} onChange={(e) => setCountry(e.target.value)} onInput={validate} /></li>
            <li><button type="submit" className='btn btn-success btn-lg' style={{ width: "72%", height: "4rem", backgroundColor: "rgb(28, 184, 3)" }} onClick={updateAddress} >Continue</button></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Address;
