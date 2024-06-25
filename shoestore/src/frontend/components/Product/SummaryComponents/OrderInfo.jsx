import React from 'react'
import { FaUserAlt } from "react-icons/fa";
const OrderInfo = () => {
    return (
        <div style={{ padding: "2rem" }}>
            <div className="row " style={{ backgroundColor: "#e5fee9" }}>
                <div className="col-md-4">
                    <div className="row" >
                        <div class="col-md-4  killua mx-3 my-3 " style={{ backgroundColor: "lightgrey", height: "4rem", width: "4rem", borderRadius: "50%" }}><FaUserAlt size={40} style={{ marginTop: "10px" }} /></div>
                        <div className="col-md-8 my-3">
                            <div className="d-block" style={{ textAlign: "start" }}>
                                <p>Customer</p>
                                <p>Suraj Gohan</p>
                                <p style={{ overflowWrap: "break-word" }}>chanderveesinghchauhan08@gmail.com</p>
                            </div>
                        </div>
                    </div>
                    {/* <div className="userLogo">
                <FaUserAlt size={40} />
            </div> */}
                </div>
                <div className="col-md-4">
                    col2
                </div>
                <div className="col-md-4">
                    col3
                </div>
            </div>
        </div>
    )
}

export default OrderInfo