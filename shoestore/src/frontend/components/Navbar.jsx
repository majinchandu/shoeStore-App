import React, { useEffect, useState } from 'react'
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import { FaPinterest } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa"
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart } from "react-icons/fa";
import { FaClipboardCheck } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import $ from 'jquery';
// window.bootstrap = require('bootstrap/dist/js/bootstrap.bundle.js');
// window.bootstrap = require('bootstrap');
// window.bootstrap = require('bootstrap/dist/js/bootstrap.bundle.js');
import { Tooltip } from 'bootstrap'

// import {Link} from 'react-router-dom'
const Navbar = (props) => {


    const auth = localStorage.getItem("user");
    const userId = auth ? JSON.parse(auth)._id : null; // Check if auth exists before accessing its properties
    const Navigate = useNavigate();
    const [searchProducts, setsearchProducts] = useState([]);
    const [refreshPage, setrefreshPage] = useState(null)
    // const [productList, setproductList] = useState([])

    // const [products, setproducts] = useState(second)
    async function handleSearch(event) {
        try {
            let key = event.target.value; // key ki value le rhe hai j search bar ,me aayegi
            if (key.length != 0) { // agar search field me koi value hai to ye niche wala function chalado
                let result13 = await fetch(`http://localhost:5000/search/${key}`); // api hit kar rha hu 
                result13 = await result13.json();
                if (result13) {
                    setsearchProducts(result13); // set producs wo rakh do ya screen pe wo dikhado jo  search hua hai 
                    // setsearchProducts(false);
                    setrefreshPage(false)
                }
                else {
                    setsearchProducts([])
                    // setsearchProducts(false);
                    setrefreshPage(false);
                }
            } else {
                setsearchProducts([])
                setrefreshPage(true);
            }
        } catch (error) {
            console.log("error in searching ", error);
        }
    }
    const navigate = useNavigate();

    useEffect(() => {
     setrefreshPage(true);
    }, [])
    

    function logout() {
        localStorage.clear();
        navigate('/');
    }

    const [CartProducts, setCartProducts] = useState([])
    async function getCartItems() {
        try {
            let result = await fetch(`http://localhost:5000/userCart/${userId}`);
            result = await result.json();
            setCartProducts(result.productIds || []);
            // console.log(CartProducts.length);
        } catch (error) {
            console.error('Error fetching cart items:', error);
        }
    }
    useEffect(() => {
        // if (userId) { // Ensure userId is not null before making the fetch request
        getCartItems();
        // }
    }, [userId, CartProducts]);

    // function searchOption(id) {
    //     // product._id}
    //     Navigate(`/product/${id}`)
    //     window.location.reload()
    // }

    useEffect(() => {
        var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
        var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new Tooltip(tooltipTriggerEl)
        })
    }, []);



    return (
        <div>
            <nav className="navbar bg-body-tertiary" style={{ marginTop: "-8px" }}>
                <div className='container-fluid d-flex justify-content-between align-items-center' style={{ backgroundColor: "#1cb803", height: "40px", paddingTop: "5px" }}>
                    <ul className='list-unstyled d-none d-sm-block '>
                        <li className='mx-4' style={{ color: "white", fontWeight: "500" }} >+91-7838569610</li>
                    </ul>
                    <ul className='list-unstyled d-none d-sm-block '>
                        <li style={{ color: "white", fontWeight: "500" }}>shoesStore@gmail.com</li>
                    </ul>
                    <ul className='list-unstyled'>
                        <li className='mx-4' style={{ color: "white", fontWeight: "500" }} ><div><a href='https://www.facebook.com/' style={{ color: "white" }} ><FaFacebook className='mx-1' size={25} /> </a> <a href='https://www.instagram.com/' style={{ color: "white" }}><FaInstagram className='mx-1' size={25} /></a> <a style={{ color: "white" }} href='https://in.pinterest.com/search/videos/?q=scarface&rs=content_type_filter' > <FaPinterest className='mx-1' size={25} /></a><a style={{ color: "white" }} href='https://www.youtube.com/' > <FaYoutube className='mx-1' size={25} /> </a>  <a style={{ color: "white" }} href='https://www.linkedin.com/in/chanderveer-singh-chauhan-a48889245' ><FaLinkedin className='mx-1' size={25} /> </a> <a href='https://github.com/majinchandu' style={{ color: "white" }}> <FaGithub className='mx-1' size={25} /></a> </div></li>
                    </ul>
                </div>
                <div className="container-fluid d-flex" style={{ paddingTop: "6px" }}>
                    <Link to='/' className="navbar-brand d-flex " href="#" >
                        <img src="https://shoeshop-youtube-zpunet.netlify.app/images/logo.png" alt="Logo" width="90" height="50" className="d-inline-block align-text-top mx-3" />
                        <h3 className='my-2'>ShoeStore</h3>
                    </Link>
                    {/* <form className="" role="search" style={{ width: "32rem", height: "3rem" }}>
                        
                        <input style={{ border: "solid black 0.5px" }} className="form-control me-2" type="search" placeholder="Search" aria-label="Search" onChange={handleSearch} />
                        <div className="searchOptions">
                            {
                                searchProducts.length > 0 ? (
                                    searchProducts.map((product, index) => (
                                        <li key={index} >
                                            {product.name}
                                        </li>
                                    ))
                                )
                                    :
                                    <></>

                            }
                        </div>
                        
                    </form> */}


                    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog modal-fullscreen modal-dialog-scrollable ">
                            <div class="modal-content">
                                {/* <div class="modal-header">
                                    <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eaque, est! Odit culpa suscipit inventore? Molestiae quia ex, quis dolorum non nostrum culpa, est facere, pariatur minima assumenda nobis voluptatibus magnam?
                                </div>
                                 */}
                                <div className="modal-header">
                                    <div class="input-group " style={{ marginTop: "2rem", width: "30rem", marginLeft: "auto", marginRight: "auto" }} >
                                        <input type="search" class="form-control killua input-text" placeholder="Search products...." aria-label="Recipient's username" aria-describedby="basic-addon2" onChange={handleSearch} />
                                    </div>
                                </div>
                                {/* <div className="modal-body">
                                    <div className="searchOptions">
                                        {
                                            searchProducts.length > 0 ? (
                                                searchProducts.map((product, index) => (
                                                    <li key={index} >
                                                        {product.name}
                                                    </li>
                                                ))
                                            )
                                                :
                                                <></>

                                        }
                                    </div>
                                </div> */}


                                <div className="modal-body">
                                    <div
                                        className="searchOptions"
                                        style={{
                                            maxHeight: '500px', // Increased max height for better visibility
                                            overflowY: 'auto',
                                            border: '1px solid #ddd',
                                            borderRadius: '5px',
                                            backgroundColor: '#fff',
                                            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
                                            padding: '10px'
                                        }}
                                    >
                                        {
                                            searchProducts.length > 0 ? (
                                                <ul
                                                    className="product-list"
                                                    style={{
                                                        listStyleType: 'none',
                                                        padding: '0',
                                                        margin: '0'
                                                    }}
                                                >
                                                    {searchProducts.map((product, index) => (
                                                        <Link reloadDocument to={`/product/${product._id}`}  >
                                                            <li
                                                                key={index}
                                                                className="product-item row "
                                                                id='kite'
                                                                style={{
                                                                    padding: '15px', // Increased padding for each product
                                                                    margin: '10px 0', // Increased margin for better separation
                                                                    borderBottom: '1px solid #eee',
                                                                    display: 'flex',
                                                                    alignItems: 'center',
                                                                    justifyContent: 'space-around' // Align items at both ends
                                                                }}
                                                                data-bs-dismiss="modal"
                                                            // onClick={searchOption(product._id)}
                                                            // onClick={() => Navigate(`/product/${product._id}`)}
                                                            >

                                                                {product.pic1 && (
                                                                    <img
                                                                        src={product.pic1}
                                                                        alt={product.name}
                                                                        style={{

                                                                            width: '80px', // Increased image size
                                                                            height: '80px', // Increased image size
                                                                            objectFit: 'cover',
                                                                            borderRadius: '5px',
                                                                            marginLeft: "7rem"
                                                                        }}
                                                                        className='col-md-8 mb-2'
                                                                    />
                                                                )}
                                                                <span className='col-md-4' id='sarutobi' style={{ fontSize: '18px', fontWeight: 'bold', marginInlineStart: "auto", marginRight: "7rem" }}>{product.name}</span>

                                                                <hr />
                                                            </li>
                                                        </Link>
                                                    ))}
                                                </ul>
                                            ) : (
                                                // {
                                                //     refreshPage ? <p> type to search</p>
                                                //     :
                                                //     <p>No products found</p>
                                                //     // <p>No products found</p>
                                                // }       
                                                <p>{refreshPage ? 'Type to search' : 'No products found'}</p>                                         
                                                // <p>No products found</p>
                                            )
                                        }
                                    </div>
                                </div>

                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    {/* <button type="button" class="btn btn-primary">Save changes</button> */}
                                </div>
                            </div>
                        </div>
                    </div>
                    <ul id='Osama' className="nav justify-content-end">
                        {
                            auth ?
                                <>

                                    {/* <li className="nav-item"  data-bs-toggle="modal" data-bs-target="#exampleModal"   >
                                        <span className="nav-link d-flex"  ><h4 ><FaSearch /></h4></span>
                                    </li> */}
                                    <li>
                                        <div class="dropdown" >
                                            <button class="btn  dropdown-toggle  btn-sm mt-2 " type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                <strong>Categories</strong>
                                            </button>
                                            {/* <ul class="dropdown-menu">
                                                <Link to = '/category/sports'><li><a class="dropdown-item" href="#">Sports</a></li></Link>
                                                <Link tp = '/category/formals'><li><a class="dropdown-item" href="#">Formals</a></li></Link>
                                                <Link to = '/category/traditionals'><li><a class="dropdown-item" href="#">Traditional</a></li></Link>
                                                <Link to = '/category/casuals'><li><a class="dropdown-item" href="#">Casuals</a></li></Link>
                                                <Link to = '/category/sandals'><li><a class="dropdown-item" href="#">Sandals</a></li></Link>
                                            </ul> */}
                                            <ul className="dropdown-menu">
                                                <li><Link  reloadDocument  to='/category/sports' className="dropdown-item">Sports</Link></li>
                                                <li><Link  reloadDocument  to='/category/formal' className="dropdown-item">Formals</Link></li>
                                                <li><Link  reloadDocument  to='/category/traditional' className="dropdown-item">Traditional</Link></li>
                                                <li><Link  reloadDocument  to='/category/casual' className="dropdown-item">Casuals</Link></li>
                                                <li><Link  reloadDocument  to='/category/sandals' className="dropdown-item">Sandals</Link></li>
                                            </ul>

                                        </div>
                                    </li>
                                    <li className="nav-item" data-bs-toggle="modal" data-bs-target="#exampleModal" style={{ cursor: "pointer" }}  >
                                        <span className="nav-link d-flex"  ><h4 ><FaSearch color='black' /></h4></span>
                                    </li>
                                    <li className="nav-item position-relative" data-bs-toggle="tooltip" title="Cart">
                                        <Link to={`/cart/${userId}`} className="nav-link" href="#">
                                            <h4><FaShoppingCart color='black' />  </h4>
                                            <span className="position-absolute top-0 start-90 mx-3 mt-2  translate-middle badge rounded-pill bg-danger">
                                                {CartProducts.length}
                                            </span>
                                        </Link>
                                    </li>

                                    <li className="nav-item" data-bs-toggle="tooltip" title="Your Orders" >
                                        <Link to='/order' className="nav-link d-flex" ><h4 style={{ color: "black" }}><FaClipboardCheck /></h4> </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link onClick={logout} className="nav-link d-flex" ><h4 style={{ color: "black" }}>Logout</h4> <p className='mx-2 my-1' style={{ color: "black" }}>({JSON.parse(auth).userName})</p></Link>
                                    </li>
                                </>
                                :
                                <>
                                    <li className="nav-item" data-bs-toggle="modal" data-bs-target="#exampleModal"   >
                                        <span className="nav-link d-flex"  ><h4 ><FaSearch /></h4></span>
                                    </li>
                                    <li>
                                        <div class="dropdown" >
                                            <button class="btn  dropdown-toggle  btn-sm mt-2 " type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                <strong>Categories</strong>
                                            </button>
                                            {/* <ul class="dropdown-menu">
                                                <Link to = '/category/sports'><li><a class="dropdown-item" href="#">Sports</a></li></Link>
                                                <Link tp = '/category/formals'><li><a class="dropdown-item" href="#">Formals</a></li></Link>
                                                <Link to = '/category/traditionals'><li><a class="dropdown-item" href="#">Traditional</a></li></Link>
                                                <Link to = '/category/casuals'><li><a class="dropdown-item" href="#">Casuals</a></li></Link>
                                                <Link to = '/category/sandals'><li><a class="dropdown-item" href="#">Sandals</a></li></Link>
                                            </ul> */}
                                            <ul className="dropdown-menu">
                                                <li><Link reloadDocument  to='/category/sports' className="dropdown-item">Sports</Link></li>
                                                <li><Link reloadDocument to='/category/formal' className="dropdown-item">Formals</Link></li>
                                                <li><Link reloadDocument to='/category/traditional' className="dropdown-item">Traditional</Link></li>
                                                <li><Link reloadDocument to='/category/casual' className="dropdown-item">Casuals</Link></li>
                                                <li><Link reloadDocument to='/category/sandals' className="dropdown-item">Sandals</Link></li>
                                            </ul>

                                        </div>
                                    </li>
                                    <li className="nav-item">
                                        <Link to='/login' className="nav-link" href="#"><h4>Login</h4></Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to='/register' className="nav-link" ><h4>Register</h4></Link>
                                    </li>
                                </>
                        }
                    </ul>
                </div>
            </nav>
        </div>
    )
}

export default Navbar

