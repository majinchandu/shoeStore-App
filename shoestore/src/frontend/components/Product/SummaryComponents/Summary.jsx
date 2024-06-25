import React from 'react'
import ShippingDetails from './ShippingDetails'
import Cart from '../Cart'
import FinalProducts from './FinalProducts'
import PlaceOrder from './PlaceOrder'
import CreditDebitCard from '../PaymentMethods/CreditDebitCard'

const Summary = (props) => {
  const method = localStorage.getItem("method");
  return (
    <div className='container' >
        <div className="shippingDetails">
          <ShippingDetails />
        </div>
        <br />
        <div className="row">
          <div className="col-md-8">
           <FinalProducts quantities = {props.quantities}  setQuantities = {props.setQuantities} />
          </div>
          <div className="col-md-4">
            <PlaceOrder quantities = {props.quantities}  setQuantities = {props.setQuantities}  />
          </div>
        </div>
        {/* {
          method == "card"?
          <div className="cardDetails" style={{paddingBottom:"1rem"}}> 
            <CreditDebitCard />
          </div>
          :
          <div>

          </div>
        } */}
    </div>
  )
}

export default Summary