import "../assets/stylesheets/mining.css"
import zoicoin from "../assets/images/zoi-coin.png"
import { useSpring, animated } from 'react-spring';
import { useLocalStorage } from 'react-use';
import { useAuth } from "../store/auth";
import { toast } from "react-toastify"
import { Navigate } from "react-router-dom";

const Mining = () => {
    const { user, authorizationToken, isLoggedIn } = useAuth();
    const [clicks, setClicks] = useLocalStorage('clicks', 0);
    const [lastClickTime, setLastClickTime] = useLocalStorage('lastClickTime', null);
    const [size, setSize] = useSpring(() => ({ size: 1 }));
    const [showFive, setFive] = useSpring(() => ({ opacity: 0, y: 0, size: 1 }));

    if(!isLoggedIn){
        return <Navigate to="/" ></Navigate>
          }

    const handleClick = () => {
        
        const now = Date.now();
        if (!lastClickTime || now - lastClickTime >= 24 * 60 * 60 * 1000) {
            setClicks(1);
            setLastClickTime(now);
        } else if (clicks >= 200) {
            // If the user has already clicked 200 times in the last 24 hours, do nothing
            return toast.error("Limit reached click after 24 hours");
        } else {
            setClicks(clicks + 1);
        }

        setSize({ size: 0.9 });
        setFive({ opacity: 1, y: -50, size: 1.5 });

        setTimeout(() => {
            setSize({ size: 1 });
            setFive({ opacity: 0, y: 0, size: 1 });
        }, 500);

        updateCoins();
        
    };
    const updateCoins = async () => {

       
        try {
            const response = await fetch('http://localhost:5000/api/auth/updateCoins', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: authorizationToken
                },
            });
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <section className="mining-section">
                <h1>{user.coins} ZOI coins</h1>
                <figure>
                    <animated.img
                        src={zoicoin}
                        alt="..."
                        style={{ transform: size.size.interpolate(size => `scale(${size})`) }}
                        onClick={handleClick}
                    />
                    <animated.h1 style={{ position: 'absolute', top:"20%", opacity: showFive.opacity, transform: showFive.y.interpolate(y => `translate3d(0, ${y}px, 0) scale(${showFive.size})`) }}>5+</animated.h1>
                </figure>
                     <h4>Do not worry we are regularly adding your</h4>
                     <h4>coins in our database you will see it after </h4>
                     <h4>verification or simply you can refesh to see </h4>
                     <h4>all of your coins.This is all because to keep our system pure.</h4>
            </section>
        </>
    );
};

export default Mining;
