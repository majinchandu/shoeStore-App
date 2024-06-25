import React, { useEffect } from 'react'
import { FaUserAlt } from "react-icons/fa";
import { FaTruck } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
const ShippingDetails = () => {

    const auth = localStorage.getItem("user")
    const method = localStorage.getItem("method");
    return (
        <div style={{ padding: "2rem",overflowY:"auto" }}>
            <div className="row " style={{ backgroundColor: "#e5fee9" }}>
                <div className="col-md-4">
                    <div className="row" >
                        <div class="col-md-4  killua mx-3 my-3 " style={{ backgroundColor: "lightgrey", height: "4rem", width: "4rem", borderRadius: "50%" }}><FaUserAlt size={40} style={{ marginTop: "10px" }} /></div>
                        <div className="col-md-8 my-3">
                            <div className="d-block" style={{ textAlign: "start" }}>
                                <p>Customer</p>
                                <p>({JSON.parse(auth).userName})</p>
                                <p style={{ overflowWrap: "break-word" }}>({JSON.parse(auth).email})</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="row" >
                        <div class="col-md-4  killua mx-3 my-3 " style={{ backgroundColor: "lightgrey", height: "4rem", width: "4rem", borderRadius: "50%" }}><FaTruck  size={40} style={{ marginTop: "10px" }} /></div>
                        <div className="col-md-8 my-3">
                            <div className="d-block" style={{ textAlign: "start" }}>
                                <p>Order Info</p>
                                <p>Shipping: {JSON.parse(auth).Country}</p>
                                <p style={{ overflowWrap: "break-word" }}>Pay Method: {method}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="row" >
                        <div class="col-md-4  killua mx-3 my-3 " style={{ backgroundColor: "lightgrey", height: "4rem", width: "4rem", borderRadius: "50%" }}><FaLocationDot  size={40} style={{ marginTop: "10px" }} /></div>
                        <div className="col-md-8 my-3">
                            <div className="d-block" style={{ textAlign: "start" }}>
                                <p>Deliver to</p>
                                {/* <p>Suraj Gohan</p> */}
                                <p style={{ overflowWrap: "break-word" }}>{JSON.parse(auth).Address}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ShippingDetails