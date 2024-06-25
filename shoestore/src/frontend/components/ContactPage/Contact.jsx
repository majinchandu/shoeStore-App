// import React from 'react'
// import { IoIosCall } from "react-icons/io";
// import { FaLocationDot } from "react-icons/fa6";
// import { FaFax } from "react-icons/fa";
// const Contact = () => {
//     return (
//         <div className='ContactUs container' style={{ display: "flex", justifyContent: "space-evenly", marginTop: "3rem", marginBottom: "3rem" }}>
//             <div>
//                 <div className="callUs" style={{ border: "solid darkgreen", borderRadius: "70rem", padding: "11px" }}>
//                     <IoIosCall size="70px" color='green' />
//                 </div>
//                 <div className="callText my-2">
//                     <h4> Call us 24x7</h4>
//                     <h6>+91 7838569610</h6>
//                 </div>
//             </div>
//             <div>
//                 <div className="headQuarters" style={{ border: "solid darkgreen", borderRadius: "20rem", padding: "11px" }}>
//                     <FaLocationDot size="70px" color='green' />
                    
//                 </div>
//                 <div className="callText my-2">
//                     <h4> HeadQuarters</h4>
//                     <h6>Scranton , Pennsylvania</h6>
//                 </div>
//             </div>
//             <div>
//                 <div className="Fax" style={{ border: "solid darkgreen", borderRadius: "20rem", padding: "11px" }}>
//                     <FaFax size="70px" color='green' />
//                 </div>
//                 <div className="callText my-2"  >
//                     <h4> Fax</h4>
//                     <h6>+91 7838569610</h6>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default Contact

import React from 'react';
import { IoIosCall } from 'react-icons/io';
import { FaLocationDot } from 'react-icons/fa6';
import { FaFax } from 'react-icons/fa';

const Contact = () => {
  return (
    <div id='chowmien' className="ContactUs  container" style={{  marginTop: '3rem', marginBottom: '3rem' }}>
      <div className='mx-2'>
        <div className="callUs" style={{ border: 'solid darkgreen', borderRadius: '50%', padding: '11px' }}>
          <IoIosCall size="70px" color="green" />
        </div>
        <div className="callText my-2">
          <h4> Call us 24x7</h4>
          <h6>+91 7838569610</h6>
        </div>
      </div>
      <div className='mx-2'>
        <div className="headQuarters" style={{ border: 'solid darkgreen', borderRadius: '50%', padding: '11px' }}>
          <FaLocationDot size="70px" color="green" />
        </div>
        <div className="callText my-2">
          <h4> HeadQuarters</h4>
          <h6>Scranton, Pennsylvania</h6>
        </div>
      </div>
      <div className='mx-2'>
        <div className="Fax" style={{ border: 'solid darkgreen', borderRadius: '50%', padding: '11px' }}>
          <FaFax size="70px" color="green" />
        </div>
        <div className="callText my-2">
          <h4> Fax</h4>
          <h6>+91 7838569610</h6>
        </div>
      </div>
    </div>
  );
};

export default Contact;
