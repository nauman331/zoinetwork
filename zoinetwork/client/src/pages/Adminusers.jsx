import { useState, useEffect } from "react"
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";


const Adminusers = () => {

    const { authorizationToken } = useAuth();

    const [user, setUser] = useState("");
    useEffect(() => {
        getAllusers().then((data) => {
            setUser(data);
        });
    }, []);

    const DeleteUser = async (id) => {
       try {
        const response = await fetch(`https://zoinetwork-api.vercel.app/api/admin/users/delete/${id}`, {
            method: "POST",
            headers: {
                Authorization: authorizationToken,
            },
        });
        if(response.ok){
            const data = await response.json();
            toast.error("user deleted successfully:", data);
            getAllusers();
        }
       } catch (error) {
        console.log(error);
       }
        
    }

    const getAllusers = async () => {
        try {
            const response = await fetch("https://zoinetwork-api.vercel.app/api/admin/users", {
                method: "GET",
                headers: {
                    Authorization: authorizationToken,
                },
            });
            if (response.ok) {
                const data = await response.json();
                console.log("Data from API:", data); // Log the data to check its structure
                return data;
            }
        } catch (error) {
            console.log(error);
        }
    };



    return (
        <>
            <section className="admin-section">
                <table className="table">
                    <thead>
                        <tr>
                            <th>S.No</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone Number</th>
                            <th>Refferals</th>
                            <th>Coins</th>
                            <th>Status</th>
                        </tr>
                    </thead>

                    <tbody>
                        {user && Array.isArray(user) && user.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td data-label="S.No">{index}</td>
                                    <td data-label="Name">{item.username}</td>
                                    <td data-label="Email">{item.email}</td>
                                    <td data-label="Phone Number">{item.phone}</td>
                                    <td data-label="Refferals">{item.refferals}</td>
                                    <td data-label="Coins">{item.coins}</td>
                                    <td data-label="Status"><button className="delete-button"
                                    onClick={() => DeleteUser(item._id)}
                                    >Delete</button></td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </section>
        </>
    )
}

export default Adminusers
