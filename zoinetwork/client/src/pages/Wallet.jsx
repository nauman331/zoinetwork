import "../assets/stylesheets/wallet.css"
import profile from "../assets/images/profile.svg"
import zoicoin from "../assets/images/zoicoin.svg"
import usdt from "../assets/images/usdt.png"
import { useAuth } from "../store/auth";
import { Navigate } from "react-router-dom";

const Wallet = () => {

    const { user, isLoggedIn } = useAuth();

    if(!isLoggedIn){
        return <Navigate to="/" ></Navigate>
          }

    return (
        <>
            <section className="wallet-section">
                    <h1 className="wallet-name">{user.username}</h1>
                <div className="top-wallet-container">
                <div className="top-wallet-container-left">
                    <h5>My Balance</h5>
                    <h1>{user.coins} ZOI</h1>
                </div>

                <div className="top-wallet-container-right">
                    <figure>
                        <img src={profile} alt="..." style={{border:'2px solid #fafafa', borderRadius:'100px', backgroundColor: "#fafafa"}}/>
                    </figure>
                </div>

                <div className="wallet-above">
                    <div className="wallet-above-first">
                    <div className="wallet-above-left">
                        <h4>Total Balance</h4>
                        <h5>{user.coins} ZOI</h5>
                    </div>

                    <div className="wallet-above-right">
                        <h4>Active Balance</h4>
                        <h5>00 ZOI</h5>
                    </div>
                    </div>

                    <div className="wallet-buttons">
                        <button>Deposit <i className="fa fa-sign-in" aria-hidden="true"></i></button>
                        <button>Withdraw  <i className="fa fa-sign-out" aria-hidden="true"></i></button>
                        <button>P2P <i className="fa fa-users" aria-hidden="true"></i></button>

                    </div>
                    
                </div>
                

                </div>
                <h1 style={{ marginTop: "10rem" }}>Total Assets</h1>

                <div className="asset">
                    <figure>
                        <img src={zoicoin} alt="..." />
                    </figure>
                    <h4 className="coins"> {user.coins} zoi coins</h4>
                </div>
                <div className="asset">
                    <figure>
                        <img src={usdt} alt="..." />
                    </figure>
                    <h4 className="coins"> 00 usdt</h4>
                </div>
            </section>
        </>
    )
}

export default Wallet
