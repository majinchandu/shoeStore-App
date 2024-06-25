import React, { useState, useEffect } from 'react';

const Pagination = (props) => {
  const [pages, setPages] = useState([]);

  useEffect(() => {
    const calculatedPages = [];
    for (let i = 0; i < Math.ceil(props.totalPosts / props.postPerPage); i++) {
      calculatedPages.push(i + 1);
    }
    setPages(calculatedPages);
  }, [props.totalPosts, props.postPerPage]);

  return (
    <div style={{ marginLeft: "auto", marginRight: "auto" }} >
      <nav aria-label="...">
        <ul className="pagination">
          <li className={`page-item ${props.currentPage === 1 ? 'disabled' : ''}`}>
            <span
              style={{
                height: "4rem",
                width: "4rem",
                borderRadius: "30px",
                backgroundColor: props.currentPage === 1 ? "grey" : "black",
                color: props.currentPage === 1 ? "white" : "white",
                paddingTop: "19px",
                cursor: "pointer"
              }}
              className="page-link"
              onClick={() => props.setcurrentPage(props.currentPage - 1)}
            >
              &lt;&lt;
            </span>
          </li>
          <li className='d-none d-md-flex' style={{ display: "flex" }}>
            {pages.map((page, index) => (
              <button
                key={index}
                style={{
                  height: "4rem",
                  width: "4rem",
                  borderRadius: "30px",
                  backgroundColor: props.currentPage === page ? "#1cb803" : "black",
                  color: "white",
                }}
                className={`mx-1 ${props.currentPage === page ? 'active' : ''}`}
                onClick={() => props.setcurrentPage(page)}
              >
                {page}
              </button>
            ))}
          </li>
          <li className={`page-item ${props.currentPage === Math.ceil(props.totalPosts / props.postPerPage) ? 'disabled' : ''}`}>
            <span
              style={{
                height: "4rem",
                width: "4rem",
                borderRadius: "30px",
                backgroundColor: props.currentPage === Math.ceil(props.totalPosts / props.postPerPage) ? "grey" : "black",
                color: props.currentPage === Math.ceil(props.totalPosts / props.postPerPage) ? "white" : "white",
                paddingTop: "19px",
                cursor: "pointer"
              }}
              className="page-link"
              onClick={() => props.setcurrentPage(props.currentPage + 1)}
            >
              &gt;&gt;
            </span>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
