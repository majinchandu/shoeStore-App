import React, { useEffect, useState } from 'react';
import { FaStar } from 'react-icons/fa';
import Pagination from './components/HomeComponents/Pagination';
import MoreTips from './components/HomeComponents/MoreTips';
import Contact from './components/ContactPage/Contact';
import { Link } from 'react-router-dom'
const Home = (props) => {
  const [currentPage, setcurrentPage] = useState(1);
  const [postPerPage, setpostPerPage] = useState(3);
  const [totalResults, settotalResults] = useState(0);
  const [currentPosts, setcurrentPosts] = useState([]);
  const [productList, setproductList] = useState([]);
  const [loading, setloading] = useState(false);
  
  async function getProductList() {
    try {
      setloading(true);
      let result6 = await fetch('http://localhost:5000/productList');
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
  }, [currentPage, postPerPage]);

  useEffect(() => {
    const lastPostIndex = currentPage * postPerPage;
    const firstPostIndex = lastPostIndex - postPerPage;
    setcurrentPosts(productList.slice(firstPostIndex, lastPostIndex));
  }, [currentPage, postPerPage, productList]);

  

  return (
    <div style={{ overflowX: "hidden" }} >
      <div className="row" style={{ justifyContent: "center", padding: "35px" }}>

        {
          loading ?
            <div class="spinner-border text-success" role="status" style={{ height: "5rem", width: "5rem" }} >
              <span class="visually-hidden">Loading...</span>
            </div>
            :
            currentPosts.length > 0 ? (
              currentPosts.map((item, index) => (
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
            ) : (
              <div>No products found</div>
            )}
      </div>
      <div className="container d-flex justify-content-between my-3">
        <Pagination totalPosts={productList.length} postPerPage={postPerPage} setcurrentPage={setcurrentPage} currentPage={currentPage} />
      </div>
      <div className="moreTips">
        <MoreTips />
      </div>
      <div className="contactUs"> <Contact /> </div>
      <div className="open_grepper_editor" title="Edit & Save To Grepper"></div>
    </div>
  );
};

export default Home;
