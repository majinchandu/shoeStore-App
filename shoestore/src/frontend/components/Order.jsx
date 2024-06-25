// import React, { useEffect, useState } from 'react'
// const Order = (props) => {

//     // const [cartProducts, setCartProducts] = useState({});
//     // const [products, setProducts] = useState([]);
//     // const [totalCost, settotalCost] = useState(0);
//     // const [loading, setloading] = useState(false)
//     // const auth = localStorage.getItem("user")
//     // const userId = auth ? JSON.parse(auth)._id : null; // Check if auth exists before accessing its properties
//     // const [date, setdate] = useState("")
//     // const [orderId, setorderId] = useState("")
//     // const [orders, setorders] = useState([])
//     // let productDetails = [];
//     // let productIdsOfOrders = [];
//     const [orders, setOrders] = useState([]);
//     const [productsByOrder, setProductsByOrder] = useState({});
//     const [loading, setLoading] = useState(false);
//     const auth = localStorage.getItem("user");
//     const userId = auth ? JSON.parse(auth)._id : null;
//     const [totalCost, settotalCost] = useState(0)
//     useEffect(() => {
//         async function getCartItems() {
//             try {
//                 setLoading(true);
//                 let result = await fetch(`http://localhost:5000/userOrder/${userId}`);
//                 result = await result.json();
//                 setOrders(result);
//             } catch (error) {
//                 console.error('Error fetching cart items:', error);
//             } finally {
//                 setLoading(false);
//             }
//         }

//         if (userId) {
//             getCartItems();
//         }
//     }, [userId]);

//     // useEffect(() => {
//     //     // setCartProducts([])
//     //     getCartItems();
//     // }, []);




//     // useEffect(() => {
//     //     setorders({});
//     // }, [], userId);
//     // useEffect(() => {
//     //     // setCartProducts([])
//     //     getCartItems();
//     // }, [userId]);

//     // useEffect(() => {
//     //     async function fetchProducts() {
//     //         try {

//     //             for (let i = 0; i < productIdsOfOrders.length; i++) {
//     //                 const productIds = Object.keys(productIdsOfOrders[i]);

//     //                 console.log(typeof (productIds));
//     //                 console.log(productIds);
//     //                 const promises = productIds.map(async productId => {
//     //                     console.log(productId);
//     //                     let result = await fetch(`http://localhost:5000/product/${productId}`);
//     //                     result = await result.json();
//     //                     return result;
//     //                 });
//     //                 const productsData = await Promise.all(promises);
//     //                 console.log(productsData);
//     //                 let totalCost = 0; // Initialize total cost variable
//     //                 const totalCost2 = 0;
//     //                 const updatedProducts = productsData.map((product, index) => {
//     //                     // Access quantity for the corresponding product ID from cartProducts
//     //                     const quantity = productIdsOfOrders[i][productIds[index]];
//     //                     console.log(quantity);
//     //                     totalCost += product.price * quantity; // Accumulate total cost
//     //                     return product;
//     //                 });

//     //                 settotalCost(totalCost);
//     //                 setProducts(productsData);
//     //                 console.log(products);
//     //                 props.setQuantities(Object.values(productIdsOfOrders[i])); // Set quantities from cartProducts

//     //             }

//     //         } catch (error) {
//     //             console.error('Error fetching products:', error);
//     //         }
//     //     }

//     //     fetchProducts();

//     // }, [],userId);

//     // useEffect(() => {
//     //     settotalCost(totalCost);
//     // }, [totalCost]);

//     useEffect(() => {
//         async function fetchProducts() {
//             if (orders.length === 0) return;

//             const productsMap = {};
//             for (const order of orders) {
//                 const productIds = Object.keys(order.productIds); // Convert object keys to an array
//                 props.setQuantities(Object.values(order.productIds));
//                 let totalCost = 0;
//                 const promises = productIds.map(async (productId,index) => {
//                     let result = await fetch(`http://localhost:5000/product/${productId}`);
//                     // return await result.json();
//                     console.log(result);
//                     result = await result.json;
//                     console.log(result);
//                     // totalCost+=(result.price*props.quantitities[index]);
//                     return result;
//                 });
//                 // settotalCost(totalCost);
//                 productsMap[order._id] = await Promise.all(promises);
//             }


//             setProductsByOrder(productsMap);
//             console.log(productsByOrder);
//             console.log(productsMap);
//             console.log(typeof (productsByOrder));
           

//         }

//         fetchProducts();
//     }, [orders]);

//     if (loading) {
//         return <div>Loading...</div>;
//     }

//     return (
//         orders.length ? (
//             <div className='reus1' style={{ minHeight: "100vh" }}>
//                 {orders.map((order, index) => (
//                     <div className="card reus2" key={index}>
//                         <div className="reus3">Purchase Receipt</div>
//                         <div className="info reus5">
//                             <div className="row">
//                                 <div className="col-7">
//                                     <span id="heading" className="reus6">Date</span><br />
//                                     <span id="resu4">{order.Date ? order.Date.substring(0, 10) : 'N/A'}</span>
//                                 </div>
//                                 <div className="col-5 pull-right">
//                                     <span id="heading" className="reus6">Order ID</span><br />
//                                     <span id="resu4">{order._id}</span>
//                                 </div>
//                             </div>
//                         </div>
//                         <div className="resu7">
//                             {productsByOrder[order._id]?.map((product, index) => (
//                                 <>
//                                     <div className="row">
//                                         <div className="col-7">
//                                             <span id="name">{product.name}</span>
//                                         </div>
//                                         <div className="col-5">
//                                             <span id="price">Rs {product.price}</span>
//                                         </div>
//                                     </div>
//                                     <div className="row">
//                                         <div className="col-7">
//                                             <span className='mx-5' id="name">Shipping</span>
//                                         </div>
//                                         <div className="col-5">
//                                             <span id="price">&pound;33.00</span>
//                                         </div>
//                                     </div>
//                                     <div className="row">
//                                         <div className="col-7">
//                                             <span className='mx-5' id="quantity">Quantity</span>
//                                         </div>
//                                         <div className="col-5">
//                                             <span id="price">{props.quantities[index]}</span>
//                                         </div>
//                                     </div>
//                                 </>
//                             ))}
//                         </div>
//                         <div className="reus8">
//                             <div className="row">
//                                 <div className="col-9">Grand Total</div>
//                                 <div className="col-3"><big>Rs {totalCost }</big></div>
//                             </div>
//                         </div>
//                         <div className="tracking">
//                             <div className="title">Tracking Order</div>
//                         </div>
//                         <div className="progress-track">
//                             <ul id="reus10" style={{ color: "rgb(42, 186, 23)" }}>
//                                 <li className="step0 active" id="step1">Ordered</li>
//                                 <li className="step0 active text-center" id="step2">Shipped</li>
//                                 <li className="step0 active text-right" id="step3">On the way</li>
//                                 <li className="step0 text-right" id="step4">Delivered</li>
//                             </ul>
//                         </div>
//                         <div className="footer reus9">
//                             <div className="row">
//                                 <div className="col-2">
//                                     <img className="img-fluid" src="https://i.imgur.com/YBWc55P.png" alt="logo" />
//                                 </div>
//                                 <div className="col-10">
//                                     Want any help? Please &nbsp;<a href="#">contact us</a>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 ))}
//             </div>

//         ) :
//             <>
//                 <div className="noOrderImg">

//                 </div>
//                 {/* <h1 style={{
//                 fontFamily: 'Arial, sans-serif',
//                 fontSize: '36px',
//                 fontWeight: 'bold',
//                 color: '#FF5733',
//                 textAlign: 'center',
//                 textTransform: 'uppercase',
//                 letterSpacing: '2px',
//                 marginTop: '50px',
//                 marginBottom: '20px',
//                 backgroundColor: '#f0f0f0',
//                 padding: '20px',
//                 border: '2px solid #ccc',
//                 borderRadius: '10px',
//                 boxShadow: '2px 2px 10px rgba(0, 0, 0, 0.1)'
//             }}>
//                 NO ORDERS PLACED
//             </h1> */}
//                 <h1 style={{
//                     fontFamily: 'Comic Sans MS, cursive, sans-serif',
//                     fontSize: '48px',
//                     fontWeight: 'bold',
//                     color: 'rgb(226 217 216)',  // Tomato color
//                     textAlign: 'center',
//                     textTransform: 'uppercase',
//                     letterSpacing: '4px',
//                     marginTop: '50px',
//                     marginBottom: '20px',
//                     backgroundColor: 'rgb(82 78 57)',  // Gold color
//                     padding: '20px',
//                     border: '3px dashed #8A2BE2',  // BlueViolet color
//                     borderRadius: '15px',
//                     boxShadow: '5px 5px 20px rgba(0, 0, 0, 0.3)',  // Deeper shadow
//                     textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',  // Text shadow
//                     width: "82vw",
//                     marginLeft: "auto",
//                     marginRight: "auto"
//                 }}>
//                     NO ORDERS PLACED
//                 </h1>
//             </>
//     );

// }

// export default Order

import React, { useEffect, useState } from 'react';

const Order = (props) => {
    const [orders, setOrders] = useState([]);
    const [productsByOrder, setProductsByOrder] = useState({});
    const [loading, setLoading] = useState(false);
    const [totals, setTotals] = useState({});

    const auth = localStorage.getItem("user");
    const userId = auth ? JSON.parse(auth)._id : null;

    useEffect(() => {
        async function getCartItems() {
            try {
                setLoading(true);
                let result = await fetch(`http://localhost:5000/userOrder/${userId}`);
                result = await result.json();
                setOrders(result);
            } catch (error) {
                console.error('Error fetching cart items:', error);
            } finally {
                setLoading(false);
            }
        }

        if (userId) {
            getCartItems();
        }
    }, [userId]);

    useEffect(() => {
        async function fetchProducts() {
            if (orders.length === 0) return;

            const productsMap = {};
            const totalsMap = {};

            for (const order of orders) {
                const productIds = Object.keys(order.productIds);
                const quantities = Object.values(order.productIds);

                let totalCost = 0;
                const promises = productIds.map(async (productId, index) => {
                    let result = await fetch(`http://localhost:5000/product/${productId}`);
                    result = await result.json();
                    totalCost += result.price * quantities[index];
                    return result;
                });

                productsMap[order._id] = await Promise.all(promises);
                totalsMap[order._id] = totalCost;
            }

            setProductsByOrder(productsMap);
            setTotals(totalsMap);
        }

        fetchProducts();
    }, [orders]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        orders.length ? (
            <div className='reus1' style={{ minHeight: "100vh" }}>
                {orders.map((order, index) => (
                    <div className="card reus2 my-3" key={index}>
                        <div className="reus3">Purchase Receipt</div>
                        <div className="info reus5">
                            <div className="row">
                                <div className="col-7">
                                    <span id="heading" className="reus6">Date</span><br />
                                    <span id="resu4">{order.Date ? order.Date.substring(0, 10) : 'N/A'}</span>
                                </div>
                                <div className="col-5 pull-right">
                                    <span id="heading" className="reus6">Order ID</span><br />
                                    <span id="resu4">{order._id}</span>
                                </div>
                            </div>
                        </div>
                        <div className="resu7">
                            {productsByOrder[order._id]?.map((product, index) => (
                                <React.Fragment key={index}>
                                    <div className="row">
                                        <div className="col-7">
                                            <span id="name">{product.name}</span>
                                        </div>
                                        <div className="col-5">
                                            <span id="price">Rs {product.price}</span>
                                        </div>
                                    </div>
                                    {/* <div className="row">
                                        <div className="col-7">
                                            <span className='mx-5' id="name">Shipping</span>
                                        </div>
                                        <div className="col-5">
                                            <span id="price">&pound;33.00</span>
                                        </div>
                                    </div> */}
                                    <div className="row">
                                        <div className="col-7">
                                            <span className='mx-5' id="quantity">Quantity</span>
                                        </div>
                                        <div className="col-5">
                                            <span id="price">{order.productIds[product._id]}</span>
                                        </div>
                                    </div>
                                </React.Fragment>
                            ))}
                        </div>
                        <div className="reus8">
                            <div className="row">
                                <div className="col-7">Tax</div>
                                <div className="col-5"><big>Rs {(totals[order._id]*0.05) }</big></div>
                            </div>
                        </div>
                        <div className="reus8">
                            <div className="row">
                                <div className="col-7">Grand Total</div>
                                <div className="col-5"><big>Rs {totals[order._id] + (totals[order._id]*0.05) }</big></div>
                            </div>
                        </div>
                        <div className="tracking">
                            <div className="title">Tracking Order</div>
                        </div>
                        <div className="progress-track">
                            <ul id="reus10" style={{ color: "rgb(42, 186, 23)" }}>
                                <li className="step0 active" id="step1">Ordered</li>
                                <li className="step0 active text-center" id="step2">Shipped</li>
                                <li className="step0 active text-right" id="step3">On the way</li>
                                <li className="step0 text-right" id="step4">Delivered</li>
                            </ul>
                        </div>
                        {/* <div className="footer reus9">
                            <div className="row">
                                <div className="col-2">
                                    <img className="img-fluid" src="https://i.imgur.com/YBWc55P.png" alt="logo" />
                                </div>
                                <div className="col-10">
                                    Want any help? Please &nbsp;<a href="#">contact us</a>
                                </div>
                            </div>
                        </div> */}
                    </div>
                ))}
            </div>
        ) : (
            <>
                <div className="noOrderImg"></div>
                <h1 style={{
                    fontFamily: 'Comic Sans MS, cursive, sans-serif',
                    fontSize: '48px',
                    fontWeight: 'bold',
                    color: 'rgb(226 217 216)',
                    textAlign: 'center',
                    textTransform: 'uppercase',
                    letterSpacing: '4px',
                    marginTop: '50px',
                    marginBottom: '20px',
                    backgroundColor: 'rgb(82 78 57)',
                    padding: '20px',
                    border: '3px dashed #8A2BE2',
                    borderRadius: '15px',
                    boxShadow: '5px 5px 20px rgba(0, 0, 0, 0.3)',
                    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
                    width: "82vw",
                    marginLeft: "auto",
                    marginRight: "auto"
                }}>
                    NO ORDERS PLACED
                </h1>
            </>
        )
    );
}

export default Order;
