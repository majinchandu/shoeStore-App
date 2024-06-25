import { Link, useParams } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import React, { useEffect, useState } from 'react'


const Category = () => {
    const { categoryName } = useParams();
    // const [currentPage, setcurrentPage] = useState(1);
    // const [postPerPage, setpostPerPage] = useState(3);
    const [totalResults, settotalResults] = useState(0);
    // const [currentPosts, setcurrentPosts] = useState([]);
    const [productList, setproductList] = useState([]);
    const [loading, setloading] = useState(false);
    async function getProductList() {
        try {
            setloading(true);
            let result6 = await fetch(`http://localhost:5000/categoryList/${categoryName}`);
            result6 = await result6.json();
            console.log(result6);
            setproductList(result6); // setted inside the empty array
            settotalResults(result6.totalResults);
            console.log(productList);
            setloading(false);
        } catch (error) {
            console.error('Error fetching product list:', error);
        }
    }

    useEffect(() => {
        getProductList();
    }, []);

    // useEffect(() => {
    //     const lastPostIndex = currentPage * postPerPage;
    //     const firstPostIndex = lastPostIndex - postPerPage;
    //     setcurrentPosts(productList.slice(firstPostIndex, lastPostIndex));
    // }, [currentPage, postPerPage, productList]);
    return (

        <div style={{ overflowX: "hidden" }} >
            <div className="row" style={{ justifyContent: "center", padding: "35px" }}>

                {
                    loading ?
                        <div class="spinner-border text-success" role="status" style={{ height: "5rem", width: "5rem" }} >
                            <span class="visually-hidden">Loading...</span>
                        </div>
                        :

                        productList.map((item, index) => (
                            <div key={index} className="col-md-3 col-sm-6 mx-2 my-2" style={{ border: 'ridge' }}>
                                <Link to={`/product/${item._id}`} >
                                    <div className="product-grid">
                                        <div className="product-image">
                                            <a href="#" className="image">
                                                <img className="img-1" style={{ paddingTop: '10px', height: "450px", maxHeight: "450px" }} src={item.pic1} alt={`Product ${index + 1}`} />
                                                <img className="img-2" style={{ paddingTop: '10px' }} src={item.pic2} alt={`Product ${index + 1}`} />
                                            </a>
                                        </div>
                                        <div className="product-content ">
                                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <h1 href="#" style={{ fontSize: '30px', fontFamily: 'serif', fontWeight: 'bolder' }}>
                                                    {item.name}
                                                </h1>
                                                <div>
                                                    <ul className="rating" style={{ fontSize: 'medium' }}>
                                                        {Array.from({ length: item.rating }, (_, i) => (
                                                            <li key={i} className="fas fa-star">
                                                                <FaStar />
                                                            </li>
                                                        ))}
                                                        {Array.from({ length: 5 - item.rating }, (_, i) => (
                                                            <li key={item.rating + i} className="fas fa-star disable">
                                                                <FaStar />
                                                            </li>
                                                        ))}
                                                    </ul>
                                                    {/* <li className="disable" style={{ listStyle: 'none', fontSize: 'larger' }}>
                        ({item.review} reviews)
                      </li> */}
                                                </div>
                                            </div>
                                            <div className="price my-3" style={{ fontSize: 'larger', fontWeight: 'bolder' }}>
                                                Rs {item.price}
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>

                        ))
                }
            </div>

        </div>
    )
}

export default Category