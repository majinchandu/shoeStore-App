import React,{useEffect} from 'react'
import CreditDebitCard from './CreditDebitCard'
import UPI from './UPI'
import Summary from '../SummaryComponents/Summary'

const PaymentDecided = (props) => {
    const method = localStorage.getItem("method");
   
  return (
    <div>
        {
            method == 'card'?<Summary quantities = {props.quantities} setQuantities = {props.setQuantities}  />:''
        }
        {
           method == 'upi'?<UPI />:''
        }
        {
            method == 'cod'?<Summary quantities = {props.quantities} setQuantities = {props.setQuantities}  />:''
        }
    </div>
  )
}

export default PaymentDecided