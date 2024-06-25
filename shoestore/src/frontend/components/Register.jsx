import React, { useState } from 'react'
import { FaRegUser } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import PWDRequisite from './PWDRequisite'
import { ImCross } from "react-icons/im";
const Register = () => {
    const [name, setname] = useState("")
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const navigate = useNavigate();
    const [Error, setError] = useState("")
    const [Error2, setError2] = useState(null)
    const [bool1, setbool1] = useState(false)
    const [bool2, setbool2] = useState(false)
    const [pwdRequiste, setPWDRequisite] = useState(false);
    const [checks, setChecks] = useState({
        capsLetterCheck: false,
        numberCheck: false,
        pwdLengthCheck: false,
        specialCharCheck: false,
    });

    const handleOnChange = (e) => {
        setpassword(e.target.value);
    };

    const handleOnFocus = () => {
        setPWDRequisite(true);
    };

    const handleOnBlur = () => {
        setPWDRequisite(false);
    };

    const handleOnKeyUp = (e) => {
        const { value } = e.target;
        const capsLetterCheck = /[A-Z]/.test(value);
        const numberCheck = /[0-9]/.test(value);
        const pwdLengthCheck = value.length >= 8;
        const specialCharCheck = /[!@#$%^&*]/.test(value);
        setChecks({
            capsLetterCheck,
            numberCheck,
            pwdLengthCheck,
            specialCharCheck,
        });
    };

    function isValidEmail(email) {
        return /\S+@\S+\.\S+/.test(email);
    }
   
    
    const validate = (e) =>{ // dont let first character to be a space 
        if(/^\s/.test(e.target.value))
          e.target.value = '';
    };

    const handleEmail = event => {
        if (!isValidEmail(event.target.value)) {
            setbool1(false);
            if (email == "")
                setError('');
            else
                setError("Email is invalid");
        } else {
            setError(null);
            setbool1(true);
        }

        setemail(event.target.value);
    };

    async function collectData(e) {
        if (bool1 && checks.capsLetterCheck &&
            checks.numberCheck &&
            checks.pwdLengthCheck &&
            checks.specialCharCheck && name) {

            e.preventDefault() // ye bhai humesha daalna iski wajah se code nhi chalega kyunki ispe mai ghanto tak atka rha tha ding ding
            let resultt = await fetch('http://localhost:5000/register', { // connecting frontend with backend
                method: 'POST',// method post hai
                body: JSON.stringify({ userName:name, email, password }),//connecting frontend and backend , jo idhar se data jaaye wo backend me store hojaye aur firr backend me jaake wo data mongoDB me store hojayee
                // ye name ,email,password wala data backend ki body me jaake store ho rha hai
                headers: {
                    'Content-Type': 'application/json'// ratlo
                }
            });
            resultt = await resultt.json()//converting result to json format
            console.log(resultt);
            if(resultt.message){
                alert('user already exists');
                navigate('/register');
            }
            else{
                localStorage.setItem("user", JSON.stringify(resultt));//user naam ka variable banao localstorage me jisme tum nye user ko store karlo localstorage me
                alert('new user  created successfully')
                navigate('/')
            }
        }
        else {
            alert("please enter correct details first");
            e.preventDefault()
            navigate('/register');
        }

    }
    return (
        <div class="registration-form  "  style={{paddingLeft:"10px",paddingRight:"10px"}}  >
            <form style={{
                border: "black double", borderRadius: "30px"
            }} onSubmit={collectData} >
                <div class="form-icon">
                    <span> <FaRegUser /></span>
                </div>
                <div class="form-group">
                    <input type="text" class="form-control item" id="username" placeholder="Username" required value={name} onInput={validate} onChange={(e) => setname(e.target.value)} />
                </div>
                <div class="form-group">
                    <input type="text" class="form-control item" id="email" placeholder="Email" required value={email} onChange={handleEmail}/>
                </div>
                <div class="form-group">
                    <input type="password" class="form-control item" id="password" placeholder="Password"required value={password} onChange={handleOnChange} onFocus={handleOnFocus} onBlur={handleOnBlur} onKeyUp={handleOnKeyUp} />
                </div>
                {pwdRequiste ? (
                                <PWDRequisite
                                capsLetterFlag={checks.capsLetterCheck ? "valid" : "invalid"}
                                numberFlag={checks.numberCheck ? "valid" : "invalid"}
                                pwdLengthFlag={checks.pwdLengthCheck ? "valid" : "invalid"}
                                specialCharFlag={checks.specialCharCheck ? "valid" : "invalid"}
                                oneCheck = {checks.capsLetterCheck} 
                                twoCheck = {checks.numberCheck}
                                threeCheck = {checks.pwdLengthCheck}
                                fourCheck = {checks.specialCharCheck}
                                 />
                            ) : null}
                <div className='form-group'>
                    <button type="submit" class="btn btn-outline-primary" onClick={collectData}>Register</button>
                </div>
                <div className='form-group mt-4'>
                    <h6>I have a account <Link to='/login'>Login</Link></h6>
                </div>
            </form>
            
        </div >

    )
}

export default Register