
import React, { useEffect, useState } from 'react';

const FinalProducts = (props) => {
    const [cartProducts, setCartProducts] = useState([]);
    const [products, setProducts] = useState([]);
    // const [totalCost, setTotalCost] = useState(0);
    const [totalCost, settotalCost] = useState(0);
    const auth = localStorage.getItem("user");
    const userId = auth ? JSON.parse(auth)._id : null;

    async function getCartItems() {

        try {
            let result = await fetch(`http://localhost:5000/userCart/${userId}`);
            result = await result.json();
            console.log(result);
            console.log(result.productIds);
            setCartProducts(result.productIds);
            console.log(cartProducts);
        } catch (error) {
            console.error('Error fetching cart items:', error);
        }
    }

    useEffect(() => {
        // setCartProducts([])
        getCartItems();
    }, []);
    useEffect(() => {
        console.log(cartProducts); // Log the updated state value of cartProducts
    }, [cartProducts]);



    useEffect(() => {
        setCartProducts({});
    }, [], userId);
    useEffect(() => {
        // setCartProducts([])
        getCartItems();
    }, [userId]);

    useEffect(() => {
        async function fetchProducts() {
            try {
                // Get an array of product IDs from the cartProducts object
                const productIds = Object.keys(cartProducts);

                const promises = productIds.map(async productId => {
                    console.log(productId);
                    let result = await fetch(`http://localhost:5000/product/${productId}`);
                    result = await result.json();
                    return result;
                });
                const productsData = await Promise.all(promises);

                let totalCost = 0; // Initialize total cost variable
                const updatedProducts = productsData.map((product, index) => {
                    // Access quantity for the corresponding product ID from cartProducts
                    const quantity = cartProducts[productIds[index]];
                    totalCost += product.price * quantity; // Accumulate total cost
                    return product;
                });
            
                settotalCost(totalCost);
                setProducts(productsData);
                console.log(products);
                props.setQuantities(Object.values(cartProducts)); // Set quantities from cartProducts
                // setlessQuantityCheck(Array(productsData.length).fill(1));
                // setgreaterQuantityCheck(Array(productsData.length).fill(1));
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        }

        fetchProducts();
    }, [cartProducts]);

    return (
        <div>
            <div className='container' style={{ minHeight: "100vh" }}>
                <div className="alert alert-info text-center mt-3">Total Cart Products <a className="text-success mx-2" href="/cart">({products.length})</a></div>
                <div className="productCartCard">
                    {products.length > 0 && products.map((product, index) => (
                        <div style={{ boxShadow: "0px 0px 3px" }} key={index}>
                            <div className="card rivaba rathiSabh">
                                <div className="row g-0 " style={{ marginBottom: "2rem" }}>
                                    <div className="col-md-3" style={{ height: "inherit" }}>
                                        <img style={{ height: "inherit", padding: "20px", width: "75%" }} src={product.pic1} className="img-fluid rounded-start" alt="Product" />
                                    </div>
                                    <div className="col-md-3" style={{ marginTop: "auto", marginBottom: "auto" }}>
                                        <strong>{product.Title}</strong>
                                    </div>
                                    <div className="col-md-2" style={{ marginTop: "auto", marginBottom: "auto" }}>
                                        {/* <strong style={{ marginTop: "auto", marginBottom: "auto" }}> Rs:{product.price}</strong> */}
                                        {/* Add a conditional check before accessing props.quantities */}
                                        {props.quantities && props.quantities[index] !== undefined ? (
                                            <>
                                                <p style={{fontWeight:"600"}}>Quantity</p>
                                                <span style={{fontWeight:"600"}} >{props.quantities[index]}</span>
                                                {/* <h6 style={{ position: "absolute", bottom: "0" }}> Total: {product.price * props.quantities[index]} Rs</h6> */}
                                            </>
                                        ) : (
                                            <span>No quantity available</span>
                                        )}
                                    </div>
                                    <div className="col-md-2" style={{ marginTop: "auto", marginBottom: "auto" }}>
                                        <p  style={{fontWeight:"600"}} >Price</p>
                                        <span  style={{fontWeight:"600"}} >Rs {product.price}</span>
                                    </div>
                                    <div className="col-md-2" style={{ marginTop: "auto", marginBottom: "auto" }}>
                                        <p style={{fontWeight:"600"}} >Subtotal</p>
                                        <span style={{fontWeight:"600"}} >Rs {product.price * props.quantities[index]}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                {/* <hr />
                <div className="cartFooter d-sm-flex ">
                    <div className="totalprice d-flex mb-2 mt-2" style={{ padding: "20px", backgroundColor: "cornsilk", marginLeft: "auto", marginRight: "auto", width: "fit-content" }}>
                        <h3 style={{ marginLeft: "auto", color: "brown" }}>To Pay: {totalCost} Rs</h3>
                    </div>
                </div> */}
            </div>
        </div>
    )
}

export default FinalProducts;
