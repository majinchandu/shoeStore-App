import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const PlaceOrder = (props) => {
    const [cartProducts, setCartProducts] = useState([]);
    const [products, setProducts] = useState([]);
    const [totalCost, setTotalCost] = useState(0);
    const [tax, settax] = useState(totalCost * 0.05)
    const auth = localStorage.getItem("user");
    const userId = auth ? JSON.parse(auth)._id : null;
    const Navigate = useNavigate();
    const method = localStorage.getItem("method");

    const getCartItems = async () => {
        try {
            let result = await fetch(`http://localhost:5000/userCart/${userId}`);
            result = await result.json();
            setCartProducts(result.productIds);
        } catch (error) {
            console.error('Error fetching cart items:', error);
        }
    };

    useEffect(() => {
        getCartItems();
    }, [userId]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const productIds = Object.keys(cartProducts);
                const promises = productIds.map(async productId => {
                    let result = await fetch(`http://localhost:5000/product/${productId}`);
                    return await result.json();
                });
                const productsData = await Promise.all(promises);

                let totalCost = 0;
                productsData.forEach((product, index) => {
                    const quantity = cartProducts[productIds[index]];
                    totalCost += product.price * quantity;
                });

                setTotalCost(totalCost);
                setProducts(productsData);
                settax(totalCost * 0.05);
                props.setQuantities(Object.values(cartProducts));
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        if (Object.keys(cartProducts).length > 0) {
            fetchProducts();
        }
    }, [cartProducts]);
    const handlePayment = async () => {
        // updatedQuantities();
        if (method == "cod") {
            try {          
                let resultt = await fetch(`http://localhost:5000/place-order/${userId}`, { // connecting frontend with backend
                    method: 'POST',// method post hai
                    headers: {
                        'Content-Type': 'application/json'// ratlo
                    }
                });
                resultt = await resultt.json()//converting result to json format
                
            } catch (error) {
                console.error('Order placement error: ', error.response ? error.response.data : error.message);
            }
        }
        else {
            try {
                const order = await axios.post('http://localhost:5000/createOrder', {
                    amount: (totalCost + tax) * 100,
                    currency: 'INR',
                    receipt: 'order_rcptid_11'
                });

                const options = {
                    key: 'rzp_test_0ErATENXeQ3oRB',
                    amount: order.data.amount,
                    currency: order.data.currency,
                    name: 'Merchant Name',
                    description: 'Test Transaction',
                    order_id: order.data.id,
                    handler: function (response) {
                        alert(response.razorpay_payment_id);
                        alert(response.razorpay_order_id);
                        alert(response.razorpay_signature);
                    },
                    prefill: {
                        name: 'Your Name',
                        email: 'your.email@example.com',
                        contact: '7838569610'
                    }
                };

                const rzp1 = new window.Razorpay(options);
                rzp1.open();
            } catch (error) {
                console.error('Payment error: ', error.response ? error.response.data : error.message);
            }
        }

    };

    

    return (
        <div style={{ marginTop: "4rem" }}>
            <table className="table table-bordered table-secondary">
                <tbody>
                    <tr>
                        <td><strong>Products</strong></td>
                        <td>Rs:{totalCost}</td>
                    </tr>
                    <tr>
                        <td><strong>Shipping</strong></td>
                        <td>Rs:0.00</td>
                    </tr>
                    <tr>
                        <td><strong>Tax</strong></td>
                        <td>Rs:{tax}</td>
                    </tr>
                    <tr>
                        <td><strong>Total</strong></td>
                        <td>Rs:{totalCost + tax}</td>
                    </tr>
                </tbody>
            </table>
            <div id="orderCompleteModal" class="modal fade" tabindex="-1">
                <div class="modal-dialog modal-confirm ">
                    <div class="modal-content">
                        <div class="modal-header justify-content-center">
                            <div class="icon-box" style={{ marginLeft: "auto", marginRight: "auto" }}>
                                <i class="material-icons">&#xE876;</i>
                            </div>
                            {/* <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button> */}
                        </div>
                        <div class="modal-body text-center">
                            <h4>Great!</h4>
                            <p>Your order has been placed successfully.</p>
                            <button onClick={() => Navigate('/')} class="btn btn-success" data-bs-dismiss="modal">
                                <span>Explore More</span>
                                <i class="material-icons">&#xE5C8;</i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>


            {
                method === "card" ?
                    <button onClick={handlePayment} type="submit" className="btn btn-success btn-lg" style={{ width: "100%", height: "4rem", backgroundColor: "red" }}>
                        Place Order
                    </button>
                    :
                    <button onClick={handlePayment} type="button" className="btn btn-success btn-lg" style={{ width: "100%", height: "4rem", backgroundColor: "red" }} data-bs-toggle="modal" data-bs-target="#orderCompleteModal">
                        Place Order
                    </button>
            }


        </div>
    );
};

export default PlaceOrder;
