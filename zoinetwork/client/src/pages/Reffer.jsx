import "../assets/stylesheets/Reffer.css"
import { useAuth } from "../store/auth"
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import refferbanner from "../assets/images/reffer-banner.png"
import gift from "../assets/images/gift.svg"


const Reffer = () => {

const { isLoggedIn, user } = useAuth()

const reffercoins = user.refferals * 500;

if(!isLoggedIn){
    return <Navigate to="/" ></Navigate>
}

    return (
        <>
        <section className="reffer-section">
            <h1>Your Community</h1>
            <p>Invite your friends to join the community and earn rewards.</p>
            <div className="reffer-code">
                <h3>Total Refferals: {user.refferals}</h3>
                <figure>
                    <img src={gift} alt="..." />
                </figure>
                <p>Coins earned from refferals</p>
                <h3>{reffercoins}</h3>
                
            </div>

            <div className="reffer-code">
                <h4>{user._id}</h4>
                <button className="copy-button" onClick={() => {
                    navigator.clipboard.writeText(user._id)
                    toast.success("Reffer code copied Successfully")
                }}>Copy </button>
            </div>

            <figure className="reffer-banner">
                            <img src={refferbanner} alt="..." />
                        </figure>
        </section>
        </>
    )
}

export default Reffer
