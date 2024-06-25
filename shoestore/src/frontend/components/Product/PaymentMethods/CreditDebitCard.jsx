import React, { useState } from 'react'
import validator from 'validator'
const CreditDebitCard = () => {

    const [errorMessage, setErrorMessage] = useState('') 
    
    const validateCreditCard = (value) => { 
      console.log(value);
      console.log(validator);
      console.log(value.length);
      if (validator.isCreditCard(value)) { 
        setErrorMessage('Valid CreditCard Number') 
      } else { 
        setErrorMessage('Enter valid CreditCard Number!') 
      } 
    } 

    return (
        <div className='creditCardPage'> 
            <div class="container itach2 p-0">
                <div class="card itachi px-4">
                    <p style={{margin:"0px"}} class="h8 itachi3 py-3">Payment Details</p>
                    <div class="row gx-3">
                        <div class="col-12">
                            <div class="d-flex flex-column">
                                <p style={{margin:"0px"}} class="text itachi6 mb-1">Person Name</p>
                                <input class="form-control itachi5 mb-3" type="text" placeholder="Name" />
                            </div>
                        </div>
                        <div class="col-12">
                            <div class="d-flex flex-column">
                                <p style={{margin:"0px"}} class="text itachi6 mb-1">Card Number</p>
                                <input class="form-control itachi5 mb-3" type="text" placeholder="1234 5678 435678"  onChange={(e) => validateCreditCard(e.target.value)} />
                                <p>{errorMessage}</p>
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="d-flex flex-column">
                                <p style={{margin:"0px"}} class="text itachi6 mb-1">Expiry</p>
                                <input class="form-control itachi5 mb-3" type="text" placeholder="MM/YYYY" />
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="d-flex flex-column">
                                <p style={{margin:"0px"}} class="text itachi6 mb-1">CVV/CVC</p>
                                <input class="form-control itachi5 mb-3 pt-2 " type="password" placeholder="***" />
                            </div>
                        </div>
                        <div class="col-12">
                            <div class="btn btn-primary mb-3 itachi4">
                                <span class="" style={{marginLeft:"auto",marginRight:"auto"}}>Continue</span>
                                <span class="fas fa-arrow-right"></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default CreditDebitCard