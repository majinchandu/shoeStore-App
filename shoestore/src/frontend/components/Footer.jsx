import React from 'react'

const Footer = () => {
    return (
        <div >
            <footer id="sticky-footer" class="flex-shrink-0 py-4 bg-dark text-white-50" style={{backgroundColor:"oldlace"}}  >
                <div class="container text-center">
                    {/* <small>Copyright &copy; Your Website</small> */}
                    <div className="images ">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/MasterCard_Logo.svg/1200px-MasterCard_Logo.svg.png" style={{ height: "20px", width: "10%", objectFit: "contain" }} className='mx-2' alt="" srcset="" />
                        <img src="https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png" alt="" srcset=""  style={{ height: "20px", width: "10%", objectFit: "contain" }} className='mx-2' />
                        <img src="https://www.paypalobjects.com/webstatic/mktg/Logo/pp-logo-150px.png" alt=""  style={{ height: "20px", width: "10%", objectFit: "contain" }} className='mx-2' />
                        <img src="https://www.discoversignage.com/uploads/DGN_AcceptanceMark_FC_Hrz_CMYK10.jpg" alt="" srcset=""  style={{ height: "20px", width: "10%", objectFit: "contain" }} className='mx-1' />
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default Footer