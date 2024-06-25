import React, { useEffect, useState, useRef } from 'react'
import { Link, useParams } from 'react-router-dom';
import { FaUser } from "react-icons/fa";
import { FaStar } from 'react-icons/fa';
import { IoSendOutline } from "react-icons/io5";
import Review from './Review';

const Product = (props) => {
    const [pic1, setpic1] = useState("");
    const [pic2, setpic2] = useState("");
    const [rating, setrating] = useState(null);
    // const [userName, setuserName] = useState("")
    const [userNames, setUserNames] = useState([]);
    const [avgRating, setavgRating] = useState(0)
    const [name, setname] = useState("");
    const [price, setprice] = useState(null);
    const [category, setcategory] = useState("");
    const [quantity, setquantity] = useState(null);
    const [description, setdescription] = useState("")
    const [Title, setTitle] = useState("")
    const { id } = useParams();
    // props.setproductIdForCart(id);
    const [reviews, setreviews] = useState([]);
    const [comment, setcomment] = useState("")
    const [star, setstar] = useState(0)
    // const userId = useRef("")
    const [reviewDate, setreviewDate] = useState("")
    const [userID, setuserID] = useState("")
    const auth = localStorage.getItem("user");
    const [dropdownValue, setdropdownValue] = useState("Select...")
    // const [blankReviewCheck, setblankReviewCheck] = useState(false);
    // const [starCheck, setstarCheck] = useState(false)

    const validate = (e) => { // dont let first character to be a space in review field
        if (/^\s/.test(e.target.value))
            e.target.value = '';
    };

    async function submitReview(e) {
        try {
            e.preventDefault();

            // var today = new Date();
            // var dd = String(today.getDate()).padStart(2, '0');
            // var mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
            // var yyyy = today.getFullYear();

            // setreviewDate(mm + '/' + dd + '/' + yyyy);

            // if(star != 0 && comment!="" ){
            //     setstarCheck(true);
            //     setblankReviewCheck(true);
            // }
            if (star && comment) {
                console.log('cbgdguwd');
                console.log(userID, id);
                let resulttt = await fetch('http://localhost:5000/addReview', {  // resulttt ke andar user naam ki uski saari details aajaengi aur uske corresponding unique token aayega 
                    method: 'POST',
                    body: JSON.stringify({ user: userID, product: id, Comment: comment, Date: "2024-01-24T00:00:00.000+00:00", Star: star }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                resulttt = await resulttt.json()
                console.log(resulttt);
                alert("review added successfully")
                window.location.reload()
            }
            else {
                // console.log(starCheck , blankReviewCheck);
                alert("either you are missing rating or just giving blank review ")
            }
        } catch (error) {
            console.log("arror found", error);
            alert("error fount")
        }
    }

    async function getUser(userid) {
        try {
            const result = await fetch(`http://localhost:5000/user/${userid}`);
            const userData = await result.json();
            return userData.userName;
            // userNames.push(userData.userName);
        } catch (error) {
            console.error("Error fetching user name:", error);
            return ""; // Return an empty string or handle the error as needed
        }
    }

    const [activeIndex, setActiveIndex] = useState(0);

    const handlePrev = () => {
        setActiveIndex((prevIndex) => (prevIndex === 0 ? reviews.length - 1 : prevIndex - 1));
    };

    const handleNext = () => {
        setActiveIndex((prevIndex) => (prevIndex === reviews.length - 1 ? 0 : prevIndex + 1));
    };


    async function getProduct() {
        try {
            let result6 = await fetch(`http://localhost:5000/product/${id}`);
            result6 = await result6.json();
            console.log(result6);
            setname(result6.name);
            setpic1(result6.pic1);
            setpic2(result6.pic2);
            setrating(result6.rating);
            setprice(result6.price);
            setcategory(result6.category);
            setquantity(result6.Quantity);
            setdescription(result6.Description)
            setTitle(result6.Title)
            setuserID(JSON.parse(auth)._id)
        } catch (error) {
            console.error('Error fetching product list:', error);
        }
    }

    useEffect(() => {
        //   props.setproductIdForCart(id);

    }, [])




    // REVIEWS TEST START 
    useEffect(() => {
        async function getReviews() {
            try {
                let result6 = await fetch(`http://localhost:5000/reviewList/${id}`);
                result6 = await result6.json();

                if (Array.isArray(result6)) {
                    setreviews(result6);
                } else {
                    console.log("Unexpected data format for reviews");
                }
            } catch (error) {
                console.error("Error fetching reviews:", error);
            }
        }

        getReviews();
    }, [id, reviews]); // Assuming `id` is a dependency for fetching reviews

    useEffect(() => {
        if (reviews.length > 0) {
            let sum = 0;
            for (let index = 0; index < reviews.length; index++) {
                sum += reviews[index].Star;
            }
            setavgRating(Math.floor(sum / reviews.length));
            
            let result =   fetch(`http://localhost:5000/updateRatings/${id}`, {
                method: "PATCH",
                headers: { "Content-type": "application/json; charset=UTF-8" },
                // body:{
                //     avgRating:avgRating
                // }
                body: JSON.stringify({

                    
                    avgRating:avgRating
                    
    
                })
            })
            console.log(result);
        }
    }, [reviews]);

    // Further logic to handle user names

    // REVIEWS TEST ENDS
    useEffect(() => {
        getProduct();
    }, [])

    async function addToCart() {
        let result = await fetch(`http://localhost:5000/cartProduct/${userID}/${id}`, {
            method: "PATCH",
            headers: { "Content-type": "application/json; charset=UTF-8" },
            body: JSON.stringify({

                "$push": {
                    "productIds": [id]
                }

            })
        })
    }
    
    
    
    
    


    return (
        <>
            <div className='productPage row ' style={{ marginRight: 0 }}>
                <div className="container1 col-md-6" >
                    <div id="carouselExampleIndicators" class="carousel slide carousel-fade" style={{ marginBottom: "2rem" }}>
                        <div class="carousel-indicators" style={{ marginBottom: "2rem" }}>
                            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>

                        </div>
                        <div class="carousel-inner" >
                            <div class="carousel-item active">
                                <img src={pic1} style={{ height: "91vh", padding: "30px", borderRadius: "50px" }} class="d-block w-100 img-fluid" alt="..." />
                            </div>
                            <div class="carousel-item">
                                <img src={pic2} style={{ height: "91vh", padding: "30px", borderRadius: "50px" }} class="d-block w-100 img-fluid" alt="..." />
                            </div>

                        </div>
                        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev" >
                            <span className="carousel-control-prev-icon" aria-hidden="true" id='nextCarousel'></span>
                            <span className="visually-hidden">Previous</span>
                        </button>

                        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next" >
                            <span className="carousel-control-next-icon" aria-hidden="true" id='prevCarousel'></span>
                            <span className="visually-hidden">Next</span>
                        </button>
                    </div>
                </div>
                <div className="container2 col-md-6"  >
                    <h1>{Title}</h1>
                    <h5 style={{ textAlign: "start", fontWeight: "400" }}>{description}</h5>

                    <div class="card mx-4 my-4" style={{ width: "18rem" }}>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item" style={{ display: "flex", justifyContent: "space-between" }}><p>Price:</p> <p><strong>Rs:{price}</strong></p></li>
                            <li class="list-group-item" style={{ display: "flex", justifyContent: "space-between" }}>
                                <p>Status:</p>
                                <p><strong>{quantity > 0 ? 'InStock' : 'Out Of Stock'}</strong></p>
                            </li>
                            <li class="list-group-item" style={{ display: "flex", justifyContent: "space-between" }}>
                                <p>Reviews:</p>
                                <p style={{ display: "flex" }}>
                                    {Array.from({ length: avgRating }, (_, i) => (
                                        <li key={i} className="fas fa-star" style={{ color: 'yellow', listStyle: "none" }}>
                                            <FaStar />
                                        </li>
                                    ))}
                                    {Array.from({ length: 5 - avgRating }, (_, i) => (
                                        <li key={avgRating + i} className="far fa-star" style={{ color: 'grey', listStyle: "none" }}>
                                            <FaStar />
                                        </li>
                                    ))}
                                    <strong className='mx-1'>     {reviews.length} Reviews</strong>
                                </p>
                            </li>

                            {/* <li className="list-group-item" style={{ display: "flex", justifyContent: "space-between" }}><p>Quantity:</p> <p><strong>{quantity}</strong></p> </li> */}
                            {/* <li  className={`${auth?"btn tt":"disabled btn tt "}`} data-bs-placement="bottom" title="Add to Cart"  data-bs-custom-class="cart-tooltip" onClick={addToCart} ><Link className={`${auth?'':'disabled'}`}   to = {`/cart/${userID}`}><button  className={`btn btn-lg btn-dark w-100 ${auth ? '' : 'disabled'}`}  >Add to Cart</button></Link></li> */}
                            <li className={`btn tt ${auth ? '' : 'disabled'}`}
                                data-bs-placement="bottom"
                                title="Add to Cart"
                                data-bs-custom-class="cart-tooltip"
                                onClick={auth ? addToCart : null}>
                                <Link className={`btn btn-lg btn-dark w-100 ${auth ? '' : 'disabled'}`}
                                    to={auth ? `/cart/${userID}` : '#'}>
                                    Add to Cart
                                </Link>
                            </li>
                            {
                                auth ?
                                    <></>
                                    :
                                    <div style={{ height: "30px", margin: 0, padding: "5px", width: "fit-content", marginLeft: "auto", marginRight: "auto" }} className="alert alert-danger my-1" role="alert">
                                        <p style={{ fontWeight: "bolder", fontSize: "small", margin: 0, padding: 0 }}><Link to='/login'>Login</Link>/<Link to='/register'>SignUp</Link> to add items to Cart</p>
                                    </div>
                            }

                        </ul>

                    </div>
                </div>


                {/* ProductID - {id}
            {name} 
            {pic1}
            {pic2}
            {rating}
            {price}
            {category}
            {quantity}
            {description}
            {Title}*/}

            </div>
            <div className="row" style={{ flexFlow: "wrap" }}>
                <div className="container3 col-md-6">
                    {auth ?
                        // <div className="addReview">
                        //     <div className="container" style={{width:"70%"}}>

                        //         <h4 >Write a customer review</h4>
                        //         <div className="rating" >

                        //                 <h5 ><strong>Rating:</strong></h5>
                        //                 <div class="dropdown container ">
                        //                     <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        //                         Dropdown button
                        //                     </button>
                        //                     <ul class="dropdown-menu">
                        //                         <li><a class="dropdown-item" href="#">Action</a></li>
                        //                         <li><a class="dropdown-item" href="#">Another action</a></li>
                        //                         <li><a class="dropdown-item" href="#">Something else here</a></li>
                        //                     </ul>
                        //                 </div>
                        //             </div>
                        //         </div>

                        // </div>
                        <div className="  addReview">
                            <div className="container" >
                                <i><h2>Write a customer review</h2></i>
                                <div className="rating my-5" >
                                    <h5 ><strong>Rating:</strong></h5>
                                    <div className="dropdown container  dropdown-center">
                                        <button className="btn btn fantus dropdown-toggle " type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            <text className=' fantus2' >{dropdownValue}</text>
                                        </button>
                                        <ul className="dropdown-menu" style={{ background: "whitesmoke" }}>
                                            <li style={{cursor:"pinter"}} onClick={()=>setdropdownValue("1 - Poor")}><a className="dropdown-item" onClick={() => setstar(1)} >1 - Poor</a></li>
                                            <li style={{cursor:"pinter"}} onClick={()=>setdropdownValue("2-Fair")}><a className="dropdown-item" onClick={() => setstar(2)} >2 - Fair</a></li>
                                            <li style={{cursor:"pinter"}} onClick={()=>setdropdownValue("3-Good")}><a className="dropdown-item" onClick={() => setstar(3)} >3 - Good</a></li>
                                            <li style={{cursor:"pinter"}} onClick={()=>setdropdownValue("4-Very Good")}><a className="dropdown-item" onClick={() => setstar(4)} >4 - Very Good</a></li>
                                            <li style={{cursor:"pinter"}} onClick={()=>setdropdownValue("5-Excellent")}><a className="dropdown-item" onClick={() => setstar(5)} >5 - Excellent</a></li>
                                        </ul>
                                    </div>
                                </div>
                                <div className=" my-5 writeReview">
                                    <h5><strong>Comment:</strong></h5>
                                    <div class="input-group mb-3 mx-2" >
                                        <div class="form-floating">
                                            <input type="text" class="form-control" id="floatingInputGroup1" placeholder="Username" onChange={(e) => setcomment(e.target.value)} onInput={validate} />
                                            <label for="floatingInputGroup1">Review</label>
                                        </div>
                                        <span  onClick={submitReview} class="input-group-text " style={{ backgroundColor: "blue", cursor: "pointer" }} ><IoSendOutline color='white' size={25} /></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        :
                        <>
                            <div class="alertt alert_success " > <strong>User need to Login to add a review </strong> </div>
                        </>
                    }
                </div>
                <div className="container4 col-md-6">
                    <div className='reviewsSection' style={{ marginTop: "0rem" }}>
                        {reviews.length > 0 ? (
                            <div>

                                <button
                                    className='reviewButton btn btn-primary'
                                    type="button"
                                    data-bs-toggle="modal"
                                    data-bs-target="#reviewModal"
                                    style={{
                                        width: '228px',
                                        fontSize: '20px',
                                        background: 'orangered',
                                        color: 'white',
                                        transition: 'background 0.3s ease', // Adding a smooth transition on hover
                                        cursor: 'pointer' // Changing cursor to pointer on hover
                                    }}
                                    // Adding an onMouseEnter event to change background color on hover
                                    onMouseEnter={(e) => e.target.style.background = 'darkred'}
                                    // Adding an onMouseLeave event to revert background color on hover out
                                    onMouseLeave={(e) => e.target.style.background = 'orangered'}
                                >
                                    REVIEWS
                                </button>
                                <div className="modal fade" id="reviewModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div className="modal-dialog modal-dialog-centered modal-lg ">
                                        <div className="modal-content">
                                            <section className="testimonial text-center">
                                                <div className="container">
                                                    <div className="heading white-heading">REVIEWS</div>
                                                    <div id="testimonial4" class="carousel slide carousel-fade testimonial4_indicators testimonial4_control_button thumb_scroll_x swipe_x" data-ride="carousel" data-pause="hover" data-interval="5000" data-duration="2000">
                                                        {reviews.length > 0 && (
                                                            <div class="carousel-inner " role="listbox">
                                                                <div class="carousel-item active carousel-fade">
                                                                    <div class="testimonial4_slide">
                                                                        <img src="https://media.licdn.com/dms/image/D5603AQGRZWlj2hQiig/profile-displayphoto-shrink_800_800/0/1681849868910?e=1712793600&v=beta&t=KzPaKTfA0HsgIfOvEDT27KulqAXMJuYdmcnep-CAMzg" class="img-circle img-responsive" />
                                                                        <h4>{userNames[activeIndex]}</h4>
                                                                        <h4>{reviews[activeIndex].Date.substring(0, 10)}</h4>
                                                                        <p>{reviews[activeIndex].Comment} </p>
                                                                        {/* <p>{reviews[activeIndex].Star}</p> */}
                                                                        <p style={{ display: "inline-flex" }}>
                                                                            {Array.from({ length: reviews[activeIndex].Star }, (_, i) => (
                                                                                <li key={i} className="fas fa-star" style={{ color: 'yellow', listStyle: "none" }}>
                                                                                    <FaStar />
                                                                                </li>
                                                                            ))}
                                                                            {Array.from({ length: 5 - reviews[activeIndex].Star }, (_, i) => (
                                                                                <li key={reviews[activeIndex].Star + i} className="far fa-star" style={{ color: 'grey', listStyle: "none" }}>
                                                                                    <FaStar />
                                                                                </li>
                                                                            ))}
                                                                            <strong className='mx-1'>     {reviews[activeIndex].Star} Star</strong>
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )}
                                                        {reviews.length > 1 && (

                                                            <>
                                                                <a class="carousel-control-prev" onClick={handlePrev} href="#testimonial4" data-slide="prev">
                                                                    <span class="carousel-control-prev-icon"></span>
                                                                </a>
                                                                <a class="carousel-control-next" onClick={handleNext} href="#testimonial4" data-slide="next">
                                                                    <span class="carousel-control-next-icon"></span>
                                                                </a>
                                                            </>
                                                        )}
                                                    </div>
                                                </div>
                                            </section>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <>
                                <div class="alertt alert_warning " > <strong>No reviews </strong> </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}
// export const productCartId = {id}
export default Product