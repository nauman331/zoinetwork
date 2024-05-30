import "../assets/stylesheets/contactus.css"
import contactpic from "../assets/images/contact.svg"
import { useState } from "react"
import { useAuth } from "../store/auth"
import { Navigate } from "react-router-dom"
import { toast } from "react-toastify"



const Contact = () => {

  const { user, isLoggedIn } = useAuth();

 
 
const [userData, setUserData] = useState(true)
  const [contact, setContact] = useState({
    username:"",
    email: "",
    message: "",
});

if(!isLoggedIn){
  return <Navigate to="/" ></Navigate>
    }


if(userData && user){
  setContact({
   username: user.username,
   email: user.email,
   message: "" 
  })
  setUserData(false)
}

const URL = "http://localhost:5000/api/form/contact"

  const HandleSubmit = async (e) => {
    e.preventDefault();
try {
  const response = await fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(contact)
  })
  if(response.ok){
    setContact({
      message: ""
    })
    const data = await response.json();
    toast.success("message sent successfully")
    console.log(data);
    
  }
} catch (error) {
  toast.error(error)
}

    }

    const HandleInput = (e) => {
let name = e.target.name;
let value = e.target.value;
setContact({
    ...contact,
    [name]: value
})

    }



    return (
        <>
            <div className="contact_us">
  <div className="responsive-container-block bigContainer">
    <div className="responsive-container-block Container">
      <div className="responsive-cell-block wk-desk-5 wk-ipadp-4 wk-tab-12 wk-mobile-12">
        <img className="mainImg" src={contactpic} alt="" />
      </div>
      <div className="responsive-cell-block wk-desk-7 wk-ipadp-8 wk-tab-12 wk-mobile-12">
        <p className="text-blk heading">
          Contact Us
        </p>
        <form className="formTable" id="izml" onSubmit={HandleSubmit}>
          <div className="firstRow">
            <div className="fullNameArea">
              <p className="cardHead">
                User Name
              </p>
              <input className="fullName" id="fullName" name="username" type="text"
               onChange={HandleInput}
               value={contact.username}
               autoComplete="off"
               required
               />
            </div>
            <div className="emailArea">
              <p className="cardHead">
                Email Address
              </p>
              <input className="email" id="email" name="email" type="text" 
                onChange={HandleInput}
                value={contact.email}
                autoComplete="off"
                required
              />
            </div>
          </div>
          <div className="messageArea">
            <p className="cardHead">
              Message
            </p>
            <textarea className="message" cols="30" id="message" name="message" rows="10"
              onChange={HandleInput}
              value={contact.message}
              autoComplete="off"
              required
            ></textarea>
          </div>
          <button className="submit" id="w-c-s-bgc_p-1-dm-id-4" onClick={HandleSubmit}>
            Send Message
          </button>
        </form>
      </div>
    </div>
  </div>
</div>
        </>
    )
}

export default Contact
