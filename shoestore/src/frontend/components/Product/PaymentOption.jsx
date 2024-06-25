
import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';

const PaymentOption = (props) => {
    // const [optionSelected, setoptionSelected] = useState("")
    const method = localStorage.getItem("method")
    const [cardCheck, setcardCheck] = useState(false);
    const [codCheck, setcodCheck] = useState(false);
    async function Card() {
        await localStorage.setItem("method","card");
        setcardCheck(true);
        setcodCheck(false);
    }
    async function cod() {
        await localStorage.setItem("method","cod");
        setcodCheck(true);
        setcardCheck(false);
    }
    return (
        <div  className = "mt-5" style={{ height:"100vh", display: "flex", justifyContent: "center"}}>
            <div className="card " style={{ height:"min-content" }}>
                <div className="card-header">
                    <h4 className="mb-0">Select Payment Method</h4>
                </div>
                <ul className="list-group list-group-flush">
                    <li className='list-group-item d-flex align-items-center my-4'>     {/*onClick={()=>props.setoptionSelected("card")} */}
                        <div className="form-check" onClick={Card} >
                            <input  className="form-check-input" type="radio" name="paymentMethod" id="creditCard"  style={{border:"black solid"}} />
                            <label className="form-check-label d-flex align-items-center ml-2 mb-0" htmlFor="creditCard">
                                <span className="mr-2"><i className="fas fa-credit-card"></i></span>
                                <span>Credit Card</span>
                            </label>
                        </div>
                    </li>
                    {/* <li className='list-group-item d-flex align-items-center my-4'>
                        <div className="form-check" onClick={()=>props.setoptionSelected("upi")}>
                            <input className="form-check-input" type="radio" name="paymentMethod" id="upi" style={{border:"black solid"}} />
                            <label className="form-check-label d-flex align-items-center ml-2 mb-0" htmlFor="upi">
                                <span className="mr-2"><i className="fas fa-mobile-alt"></i></span>
                                <span>UPI</span>
                            </label>
                        </div>
                    </li> */}
                    <li className='list-group-item d-flex align-items-center my-4'>
                        <div className="form-check" onClick={cod}>
                            <input className="form-check-input" type="radio" name="paymentMethod" id="cod" style={{border:"black solid"}} />
                            {/* <input className="form-check-input" type="radio" name="paymentMethod" id="creditCard" style={{border: "black solid"}} checked={codCheck} /> */}
                            <label className="form-check-label d-flex align-items-center ml-2 mb-0" htmlFor="cod">
                                <span className="mr-2"><i className="fas fa-money-bill-alt"></i></span>
                                <span>COD/Cash On Delivery</span>
                            </label>
                        </div>
                    </li>
                    <li className='list-group-item d-flex align-items-center' >            
                        <Link to={`${method? '/paymentDecided' : ''}`} style={{ width: "100%", height: "4rem", backgroundColor: "rgb(28, 184, 3)",marginLeft:"auto",marginRight:"auto",textDecoration:"none" }}  ><p style={{color:"white", padding:"0.8rem",fontSize:"25px"}}>Continue</p></Link>
                    {/* paymentDecided */}
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default PaymentOption;
