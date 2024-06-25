import React, { useEffect, useState } from 'react'
import { FaRegUser } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
const Login = (props) => {
    
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    // const [name, setname] = useState("")
    const [success2, setsuccess2] = useState(props.success)
    const [err, seterr] = useState("")
    const [Message, setMessage] = useState("")
    const Navigate = useNavigate()

    // useEffect(() => {
    //     const authh = localStorage.getItem("user")
    //     if (authh) {
    //         Navigate('/');
    //     }
    // })

    function isValidEmail(email) {
        return /\S+@\S+\.\S+/.test(email);
    }

    async function handleSubmit(e) {
        e.preventDefault();

        console.log('cbgdguwd');
        console.log(email, password);
        let resulttt = await fetch('http://localhost:5000/loginUser', {  // resulttt ke andar user naam ki uski saari details aajaengi aur uske corresponding unique token aayega 
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        resulttt = await resulttt.json()
        if (resulttt.auth) { // agar result mila to chalao  ||    aur comparison kara rhe hai authToken ke basis pe 
            setsuccess2(true);
            localStorage.setItem("user", JSON.stringify(resulttt.exisUser)) //storage me uss user ko store kardo dobara se 
            localStorage.setItem("token", JSON.stringify(resulttt.auth))
            Navigate('/')
        } else {
            alert('please enter correct details')// agar user hi na mila ho toh
        }
    }

    return (
        <div style={{ minHeight: "70vh" }}>
            <div class="registration-form" style={{ paddingLeft: "10px", paddingRight: "10px" }}  onSubmit={handleSubmit}>
                <form style={{
                    border: "black double", borderRadius: "30px", height: "70vh"
                }} >
                    <div class="form-icon">
                        <span  > <FaRegUser /></span>
                    </div>

                    <div class="form-group">
                        <input type="text" class="form-control item" id="email" placeholder="Email" value={email} onChange={(e) => setemail(e.target.value)} />
                    </div>
                    <div class="form-group">
                        <input type="password" class="form-control item" id="password" placeholder="Password" value={password} onChange={(e) => setpassword(e.target.value)}  />
                    </div>
                    <div className='form-group'>
                        <button type="submit" onClick={handleSubmit} class="btn btn-outline-primary">Login</button>
                    </div>
                    <div className='mt-4'>
                        <h6>I don't  have a account <Link to='/register'>Register</Link> </h6>
                    </div>
                </form>

            </div >
        </div>
    )
}

export default Login