import { toast } from "react-toastify"
import "../assets/stylesheets/more.css"
import { useAuth } from "../store/auth"
import { NavLink, Navigate } from "react-router-dom"


const More = () => {

    const { user, isLoggedIn, authorizationToken } = useAuth();
    const profile = user && user.username.charAt(0).toUpperCase()

    if (!isLoggedIn) {
        return <Navigate to="/" ></Navigate>
    }


    const handleClaimCoins = async (platform) => {
        try {
            const response = await fetch(`http://localhost:5000/api/auth/claim-coins/${platform}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: authorizationToken,
                },
            });

            if (response.ok) {
                toast.success("Thnx🥰 We will add 1000 coins after verification with in 24 hours")
            }
        } catch (error) {
            toast.error("Please follow our social media", error);
        }
    };


    return (
        <>
            <section className="more-section">
                <div className="more-header">
                    <span>😎</span>{profile}
                </div>
                <h1>{user.email}</h1>
                <div className="social-media">
                    <h4>Our Social Media</h4>
                    <div className="social-link">
                        <i className="fab fa-facebook"></i>
                        <h5>1000 ZOI</h5>
                        <button onClick={() => handleClaimCoins('facebook')}>
                            <NavLink to="https://www.facebook.com/profile.php?id=61560520460002"><i className="fa fa-arrow-right"></i></NavLink>
                        </button>
                    </div>
                    <div className="social-link">
                        <i className="fab fa-youtube" aria-hidden="true"></i>
                        <h5>1000 ZOI</h5>
                        <button onClick={() => handleClaimCoins('youtube')}>
                        <NavLink to="https://www.youtube.com/channel/UCYPsM4s5D2hhGeyTMDZrPYQ"><i className="fa fa-arrow-right"></i></NavLink>
                        </button>
                    </div>
                    <div className="social-link">
                        <i className="fab fa-telegram"></i>
                        <h5>1000 ZOI</h5>
                        <button onClick={() => handleClaimCoins('telegramChannel')}>
                        <NavLink to="https://t.me/zoinetwork0"><i className="fa fa-arrow-right"></i></NavLink>
                        </button>
                    </div>
                    <div className="social-link">
                        <i className="fab fa-telegram"></i>
                        <h5>1000 ZOI</h5>
                        <button onClick={() => handleClaimCoins('telegramGroup')}>
                        <NavLink to="https://t.me/+X4LrgBADQrg5M2Y0"><i className="fa fa-arrow-right"></i></NavLink>
                        </button>
                    </div>
                    <div className="social-link">
                        <i className="fab fa-twitter"></i>
                        <h5>1000 ZOI</h5>
                        <button onClick={() => handleClaimCoins('twitter')}>
                        <NavLink to="https://x.com/ZoiNetwork00?s=09"><i className="fa fa-arrow-right"></i></NavLink>
                        </button>
                    </div>
                    <div className="social-link">
                        <i className="fab fa-instagram"></i>
                        <h5>1000 ZOI</h5>
                        <button onClick={() => handleClaimCoins('instagram')}>
                        <NavLink to="https://www.instagram.com/zoinetwork00?igsh=MXQ2dnp4cmlqYWt0ZA=="><i className="fa fa-arrow-right"></i></NavLink>
                        </button>
                    </div>
                    <div className="social-link">
                        <i className="fab fa-tiktok"></i>
                        <h5>1000 ZOI</h5>
                        <button onClick={() => handleClaimCoins('tiktok')}>
                        <NavLink to="https://www.tiktok.com/@zoinetwork00?_t=8mm5hfXPqWG&_r=1"><i className="fa fa-arrow-right"></i></NavLink>
                        </button>
                    </div>
                    <div className="social-link">
                        <i className="fab fa-whatsapp"></i>
                        <h5>1000 ZOI</h5>
                        <button onClick={() => handleClaimCoins('whatsapp')}>
                        <NavLink to="https://whatsapp.com/channel/0029Vaeuoa6AYlUOAjijF33X"><i className="fa fa-arrow-right"></i></NavLink>
                        </button>
                    </div>
                    <h5>ZOI coins will be automatically added in your account after 24 hours when we will verify the process</h5>
                    {user.isAdmin && (
                        <NavLink to="/admin" className="logout-button">Admin Panel</NavLink>
                    )}
                    <NavLink to="/logout" className="logout-button">Log Out</NavLink>
                </div>
            </section>
        </>
    )
}

export default More
