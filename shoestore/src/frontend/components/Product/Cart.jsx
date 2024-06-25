import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom'
import { useParams, useNavigate, Link } from 'react-router-dom';
import { MdDeleteForever } from "react-icons/md";
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";

const Cart = (props) => {
    const Navigate = useNavigate();
    const { userId } = useParams();
    const [cartProducts, setCartProducts] = useState({});
    const [products, setProducts] = useState([]);
    // const [quantities, setQuantities] = useState([]);
    const [lessQuantityCheck, setlessQuantityCheck] = useState([]);
    const [greaterQuantityCheck, setgreaterQuantityCheck] = useState([]);
    const [productToDelete, setProductToDelete] = useState(null);
    const [totalCost, settotalCost] = useState(0);
    const [loading, setloading] = useState(false)
    async function getCartItems() {

        try {
            setloading(true)
            let result = await fetch(`http://localhost:5000/userCart/${userId}`);
            result = await result.json();
            console.log(result);
            console.log(result.productIds);
            setCartProducts(result.productIds);
            console.log(cartProducts);
            setloading(false)
        } catch (error) {
            console.error('Error fetching cart items:', error);
        }
    }

    useEffect(() => {
        // setCartProducts([])
        getCartItems();
    }, []);
    // useEffect(() => {
    //     console.log(cartProducts); // Log the updated state value of cartProducts
    // }, [cartProducts]);



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
                // setloading(true);
                const productIds = Object.keys(cartProducts);
                const vals = Object.values(cartProducts);
                console.log(typeof (productIds));
                console.log(productIds);
                const promises = productIds.map(async productId => {
                    console.log(productId);
                    let result = await fetch(`http://localhost:5000/product/${productId}`);
                    result = await result.json();
                    return result;
                });
                const productsData = await Promise.all(promises);

                let totalCost = 0; // Initialize total cost variable
                const totalCost2 = 0;
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
                setlessQuantityCheck(Array(productsData.length).fill(1));
                setgreaterQuantityCheck(Array(productsData.length).fill(1));
                // setloading(false);

            } catch (error) {
                console.error('Error fetching products:', error);
            }
        }

        fetchProducts();

    }, [cartProducts]);


    // useEffect(() => {
    //     async function fetchProducts() {
    //         try {
    //             console.log(cartProducts);
    //             const promises = cartProducts.map(async productId => {
    //                 console.log(productId.first);
    //                 let result = await fetch(`http://localhost:5000/product/${productId.first}`);
    //                 result = await result.json();
    //                 return result;
    //             });
    //             const productsData = await Promise.all(promises);
    //             let totalCost = 0; // Initialize total cost variable
    //             const updatedProducts = productsData.map(product => {
    //                 totalCost += product.price; // Accumulate total cost
    //                 return product;
    //             });

    //             settotalCost(totalCost);
    //             setProducts(productsData);
    //             props.setQuantities(Array(productsData.length).fill(1)); // Initialize quantities with default value 1 for each product
    //             setlessQuantityCheck(Array(productsData.length).fill(1));
    //             setgreaterQuantityCheck(Array(productsData.length).fill(1));
    //         } catch (error) {
    //             console.error('Error fetching products:', error);
    //         }
    //     }

    //     fetchProducts();
    // }, [cartProducts]);

    // EXPLANATION OF FETCHPRODUCTS FUNCTION 
    //     // fetchProducts Function: This is an asynchronous function responsible for fetching product details for each product ID in the cartProducts array.

    //     // try-catch Block: Wrapping the code in a try-catch block helps handle any errors that might occur during the fetching process. If there's an error, it will be caught and logged to the console.

    //     // const promises Array: Here, we use the map function to iterate over each productId in the cartProducts array. For each productId, we return a promise that represents fetching the product details from the backend API (fetch(http://localhost:5000/product/${productId}`)`).

    //     // Promise.all(promises): Promise.all is used to wait for all promises in the promises array to resolve. This means it waits for all product details to be fetched successfully before proceeding. It returns an array of resolved values, which in this case, are the product details.

    //     // setProducts(productsData): Once all product details are fetched successfully, we update the products state using setProducts with the array of product data (productsData).

    //     // By using Promise.all to concurrently fetch all product details, we optimize the fetching process, as it allows fetching multiple products simultaneously instead of sequentially, resulting in faster loading times.


    function decrementQuantity(index) {
        const updatedQuantities = [...props.quantities];
        greaterQuantityCheck[index] = true;
        // settotalCost(totalCost - updatedQuantities[index] * products[index].price)
        // totalCost-=(updatedQuantities[index]*products[index].price)
        // const updatedlessquantitiescheck = [...lessQuantityCheck];
        if (updatedQuantities[index] > 1) {
            updatedQuantities[index]--;
            const newTotalCost = totalCost - products[index].price;
            settotalCost(newTotalCost);
            // settotalCost(totalCost - updatedQuantities[index] * products[index].price)
            // updatedlessquantitiescheck[index] = true;
            props.setQuantities(updatedQuantities);
            // setlessQuantityCheck(updatedlessquantitiescheck);
        }
        else {
            // updatedlessquantitiescheck[index] = false;
            // setlessQuantityCheck(updatedlessquantitiescheck);
        }
    }
    useEffect(() => {
        // Update total cost whenever totalCost state changes
        // This ensures that the total cost displayed in the UI is always up-to-date
        settotalCost(totalCost);
    }, [totalCost]);

    function incrementQuantity(index) {
        const updatedQuantities = [...props.quantities];
        const updategreaterquantitycheck = [...greaterQuantityCheck]
        // totalCost+=(updatedQuantities[index]*products[index].price)
        if (updatedQuantities[index] >= products[index].Quantity) {
            // alert("product has reached max capacity");
            // settotalCost(totalCost+ products[index].Quantity*products[index].price)
            updategreaterquantitycheck[index] = false;
            setgreaterQuantityCheck(updategreaterquantitycheck)
            return;
        }
        else {
            const newTotalCost = totalCost + products[index].price;
            settotalCost(newTotalCost);
            // settotalCost(totalCost + updatedQuantities[index] * products[index].price)
            updategreaterquantitycheck[index] = true;
            setgreaterQuantityCheck(updategreaterquantitycheck)
            updatedQuantities[index]++;
            props.setQuantities(updatedQuantities);
        }
    }

    async function deleteemployee(productId) { //* ye id paramter ki tarah aayegi jahan call hua hai
        let result8 = await fetch(`http://localhost:5000/cartProduct/${userId}/${productId}`, { // delete wali api ko call kar rhe hai backend se 
            method: "DELETE"// delete kar rhe hai to method delete hoga
        });
        result8 = await result8.json() // converting to json  
        if (result8) { // agar ache se delete hogya hai to chalao
            console.log(result8);
            // totalCost-=()
            getCartItems()
            //   fetchProducts(); // jase hi delete hojae to  wo ekdum se uss data ko hatado screen pe se isliye function getproducts call kar rhe hai jisse data jaldi se firse fetch ho aur wo data chala jaaye 
        }
        else {
            console.log("Not able to delete product from cart");
        }
    }

    async function updatedQuantities() {
        const productIds = Object.keys(cartProducts);
        // const values = Object.values
        // const promises = productIds.map(async (productId, index) => {
        //     console.log(productId);
            
        //     let result = await fetch(`http://localhost:5000/updateQuantities/${userId}/${productId}`, {
        //         method: "PATCH",
        //         headers: { "Content-type": "application/json; charset=UTF-8" },
        //         body: JSON.stringify({
        //             "quantity": props.quantities[index]
        //         })
        //     })
        // });

        for (let index = 0; index < productIds.length; index++) {
            // console.log(productId);
            
            let result = await fetch(`http://localhost:5000/updateQuantities/${userId}/${productIds[index]}`, {
                method: "PATCH",
                headers: { "Content-type": "application/json; charset=UTF-8" },
                body: JSON.stringify({
                    "quantity": props.quantities[index]
                })
            })
        }

        // const productsData = await Promise.all(promises);        
    }
    // async function updatedQuantities() {
    //     const productIds = Object.keys(cartProducts);
    //     const quantities = props.quantities; // Ensure that props is in scope and contains quantities
    //     const promises = productIds.map(async (productId, index) => {
    //         try {
    //             console.log(productId);
    //             let response = await fetch(`http://localhost:5000/updateQuantities/${userId}/${productId}`, {
    //                 method: "PATCH",
    //                 headers: { "Content-type": "application/json; charset=UTF-8" },
    //                 body: JSON.stringify({
    //                     "quantity": quantities[index]
    //                 })
    //             });
    
    //             if (!response.ok) {
    //                 // Handle the error response
    //                 throw new Error(`Failed to update quantity for product ${productId}: ${response.statusText}`);
    //             }
                
    //             let result = await response.json();
    //             return result;
    //         } catch (error) {
    //             console.error(`Error updating quantity for product ${productId}:`, error);
    //         }
    //     });
    
    //     try {
    //         const productsData = await Promise.all(promises);
    //         console.log('All quantities updated successfully', productsData);
    //     } catch (error) {
    //         console.error('Error updating quantities:', error);
    //     }
    // }
    

    // function updateQuantities() {

    // }

    return (

        <div className='container' style={{ minHeight: "100vh" }}>
            <div className="alert alert-info text-center mt-3">Total Cart Products <p className="text-success mx-2" >({products.length})</p></div>
            <div className="productCartCard">
                {
                    loading ?
                        <div class="spinner-border text-success" role="status" style={{height:"5rem" , width:"5rem"}} >   
                            <span class="visually-hidden">Loading...</span>
                        </div>
                        :
                        products.length ?
                            products.map((product, index) => (
                                <div style={{ boxShadow: "0px 0px 10px" }}>
                                    <div key={index} className="card rivaba rathiSabh">
                                        <div className="btn" data-bs-toggle="modal" data-bs-target="#deleteProductFromCart" style={{ marginLeft: "auto" }} >
                                            <MdDeleteForever color='red' size={40} onClick={() => { setProductToDelete(products[index]._id); console.log(productToDelete); console.log("hello " + product._id); }} />
                                        </div>
                                        <div class="modal fade" id="deleteProductFromCart" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                            <div class="modal-dialog">
                                                <div class="modal-content">
                                                    <div class="modal-header">
                                                        <h1 class="modal-title fs-5" id="exampleModalLabel"> Remove product form cart </h1>
                                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                    </div>
                                                    <div class="modal-footer">
                                                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">No</button>
                                                        <button type="button" class="btn btn-primary" data-bs-dismiss="modal" onClick={() => { deleteemployee(productToDelete); console.log(productToDelete);; setProductToDelete(null); }} >Yes</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row g-0 " style={{ marginBottom: "2rem" }}>
                                            <div className="col-md-4" style={{ height: "inherit" }}>
                                                <img style={{ height: "inherit", padding: "20px", width: "75%" }} src={product.pic1} className="img-fluid rounded-start" alt="Product" />
                                            </div>
                                            <div className="col-md-4" style={{ marginTop: "auto", marginBottom: "auto" }}>
                                                <strong>{product.Title}</strong>
                                            </div>
                                            <div className="col-md-3" style={{ marginTop: "auto", marginBottom: "auto" }}>
                                                <div className="nargis qty">
                                                    <span className="minus nargis2 bg-dark" onClick={() => decrementQuantity(index)}>-</span>
                                                    <input type="number" className="count" name="qty" max={product.Quantity} min={1} value={props.quantities[index]} />
                                                    <span className="plus nargis2 bg-dark" onClick={() => incrementQuantity(index)}>+</span>
                                                    {/* {lessQuantityCheck[index] ? '' : <p>you can't have a product with 0 quantity in cart</p>} */}
                                                    {greaterQuantityCheck[index] ? '' : <p>Can't Add More</p>}
                                                </div>
                                            </div>
                                            <div className="col-md-1" style={{ marginTop: "auto", marginBottom: "auto" }}>
                                                <strong tyle={{ marginTop: "auto", marginBottom: "auto" }}> Rs:{product.price}</strong>
                                                <h6 style={{ position: "absolute", bottom: "0" }}> Total: {product.price * props.quantities[index]} Rs</h6>
                                            </div>
                                            {/* {
                                        settotalCost(product.price * quantities[index]);
                                    } */}
                                        </div>
                                    </div>
                                </div>
                            ))
                            :
                            // <p>no Products in cart </p>
                            <>
                                <div className="emptyCart"></div>
                                <h2>Your Cart is Empty! <Link to='/' >Shop</Link></h2>
                            </>
                }
            </div>
            <hr />
            <div className="cartFooter d-sm-flex ">
                <Link to='/'><button style={{ width: "fit-content" }} className=" btn continueShopping btn-lg btn-dark mt-4  col-3"> <FaArrowLeft />   Continue Shopping</button></Link>
                <div className="totalprice d-flex mb-2 mt-2" style={{ padding: "20px", backgroundColor: "cornsilk", marginLeft: "auto", marginRight: "auto", width: "fit-content" }}>
                    <h3 style={{ marginLeft: "auto", color: "brown" }}>Cart Total:{totalCost} Rs</h3>
                </div>
                <Link className={`${products.length ? '' :'disabled'}`}to={products.length ? '/Address' : '#'}><button onClick={updatedQuantities} style={{ width: "fit-content",backgroundColor:products.length?'':'grey',cursor:products.length?'pointer':'not-allowed' }} className=" btn checkOut btn-lg btn-success mt-4  col-3">Chechout <FaArrowRight /> </button></Link>
            </div>
        </div>
    );
}
export default Cart;
