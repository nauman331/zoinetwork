import { useAuth } from "../store/auth"
import hello from "../assets/images/hello.svg"
import refferbanner from "../assets/images/reffer-banner.png"
import "../assets/stylesheets/getstart.css"
import { NavLink } from "react-router-dom";
import "../assets/stylesheets/home.css"
import profile from "../assets/images/profile.svg"
import { useState, useEffect } from 'react';


const Home = () => {

    const { isLoggedIn, user } = useAuth();
    const [carouselIndex, setCarouselIndex] = useState(0);
    

    const texts = ["Welcome to ZOI Network", "Reffer Your Freinds to get extra benefits", "Follow Our Social media platforms to get early access and notifications"];
    const icons = [
        {
            icon: "Refferals",
            icontext: <i className="fa fa-users" aria-hidden="true"></i>,
            link: "/reffer"
        },
        {
            icon: "P2P",
            icontext: <i className="fa fa-handshake" aria-hidden="true"></i>,
            link: "/"
        },
        {
            icon: "KYC",
            icontext: <i className="fa fa-search" aria-hidden="true"></i>,
            link: "/"
        },
        {
            icon: "Airdrops",
            icontext: <i className="fa fa-gift" aria-hidden="true"></i>,
            link: "/"
        },
        {
            icon: "Roadmap",
            icontext: <i className="fa fa-book" aria-hidden="true"></i>,
            link: "/zoipdf"
        },
        {
            icon: "Burn/USDT",
            icontext: <i className="fa fa-fire" aria-hidden="true"></i>,
            link: "/"
        },
    ]

    useEffect(() => {
        const interval = setInterval(() => {
            setCarouselIndex((carouselIndex + 1) % texts.length);
        }, 3000); // Change index every 3 seconds

        return () => clearInterval(interval); // Clear interval on component unmount
    }, [carouselIndex, texts.length]);


    return (
        <>
            {isLoggedIn ? (
                <>
                    <section className="home-section">
                        <nav className="home-nav">
                            <div className="nav-text">
                                <h5>Good Morning</h5> <h1>{user.username} 👋</h1>
                            </div>
                            <figure>
                                <img src={profile} alt="..." />
                            </figure>

                        </nav>
                        <div className="carousel">
                            <p className="carousel-item">{texts[carouselIndex]}</p>
                        </div>
                        <NavLink to="/reffer">
                        <figure className="reffer-banner">
                            <img src={refferbanner} alt="..." />
                        </figure>
                        </NavLink>
                        <div className="home-icons">
                            {
                                icons.map((item, index) => {
                                    return (
                                        <div key={index} >
                                    <NavLink  to={item.link} className="home-icon">
                                        {item.icontext}
                                        {item.icon}
                                    </NavLink>
                                        </div>
                                    )
                                })
                            }
                        </div>

                       
                        

                    </section>
                </>
            ) :
                (<>  <section className="getstartsection">
                    <h1>Welcome to ZOI Network</h1>
                    <figure>
                        <img src={hello} alt="..." className="helloimg" />
                    </figure>
                    <NavLink to="/register" className="getstart">Get Started</NavLink>
                    <h6>Earn zoi coins by tapping everyday and get huge profits in future</h6>
                </section> </>)}

        </>
    )
}

export default Home
