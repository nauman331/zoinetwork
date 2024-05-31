import "../assets/stylesheets/authentication.css"
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom"
import { useAuth } from "../store/auth";
import { toast } from "react-toastify"


const Register = () => {

    const [show, setShow] = useState(false);

    const navigate = useNavigate();
    const {storetokenInLS, fingerprint} = useAuth();

    const [user, setUser] = useState({
        username : "",
        email : "",
        password : "",
        phone : "",
        reffercode: ""
    })

    const HandleShow = () => {
        setShow(!show)
    }

const HandleSubmit = async (e) => {
e.preventDefault();

if(fingerprint){
    toast.error("Multiple accounts are not allowed 😢")
}
else{
try {
    const response = await fetch('https://zoinetwork-api.vercel.app/api/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })

    const res_data = await response.json();
    if(response.ok){
        setUser({
            username : "",
            email : "",
            password : "",
            phone : "",
            reffercode: ""
        })
        toast.success("Registered successfuly")
        storetokenInLS(res_data.token, `${res_data.token}Hello`)
        navigate('/')
    }else{
        toast.error("Email or phone number is already choosen")
    }
    console.log(response);
} catch (error) {
    console.log(error)
}

}
}
const HandleInput = (e) => {
let name = e.target.name;
let value = e.target.value;

setUser({
    ...user,
    [name]: value
})

}



    return (
        <>
            <section className="form-section">
                <h1 style={{textAlign: 'center', marginTop:'1rem', color:'#216AD9'}}>ZOI Network Platform</h1>
                <h5 style={{textAlign: 'center', color:'#216AD9'}}>A future crypto coin</h5>

                <form onSubmit={HandleSubmit}  className="authform">

                    <h1>Create Your Account</h1>
                    <p>Earn zoi coin today and get big profits in future</p>
                    <div className="form-input">
                    <i className="fa-solid fa-user"></i>
                    <input type="text" placeholder="username123"
                     name="username" autoComplete="off" required
                     onChange={HandleInput}
                     value={user.username}
                     />
                    </div>

                    <div className="form-input">
                    <i className="fa-solid fa-envelope"></i>
                    <input type="email" placeholder="user123@user.com"
                     name="email" autoComplete="off" required
                     onChange={HandleInput}
                     value={user.email}
                     />
                    </div>

                    <div className="form-input">
                    <i className="fa-solid fa-phone"></i>
                    <input type="number" placeholder="+123456789"
                     name="phone" autoComplete="off" required
                     onChange={HandleInput}
                     value={user.phone}
                     />
                    </div>

                    <div className="form-input">
                    <i className="fa fa-users" aria-hidden="true"></i>
                    <input type="text" placeholder="Refferal Code"
                     name="reffercode" autoComplete="off"
                     onChange={HandleInput}
                     value={user.reffercode}
                     />
                    </div>


                    <div className="form-input">
                    <i className="fa-solid fa-lock"></i>
                    <input type={ !show ? "password" : "text"} placeholder="mypassword123%"
                     name="password" autoComplete="off" required
                     onChange={HandleInput}
                     value={user.password}
                     />
                    { show ? (<i className="fa-solid fa-eye" onClick={HandleShow}></i> ) : (<i className="fa-solid fa-eye-slash" onClick={HandleShow}></i>) }
                   
                    </div>
                    <button type="submit">Register</button>
                    <h5 style={{textAlign: 'center', marginTop:'1rem'}}>Already Have an account?</h5>
                    <button className='link-text' type="submit"><NavLink to="/login">Sign In</NavLink></button>
                </form>
            </section>
        </>
    )
}

export default Register
