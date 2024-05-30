import { useState, useEffect } from "react"
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";


const Admincontacts = () => {

    const { authorizationToken } = useAuth();

    const [contacts, setContacts] = useState("");
    useEffect(() => {
        getAllusers().then((data) => {
            setContacts(data);
        });
    }, []);

    const DeleteUser = async (id) => {
       try {
        const response = await fetch(`https://zoinetwork-api.vercel.app/api/admin/contacts/delete/${id}`, {
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
            const response = await fetch("https://zoinetwork-api.vercel.app/api/admin/contacts", {
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
                            <th>Status</th>
                        </tr>
                    </thead>

                    <tbody>
                        {contacts && Array.isArray(contacts) && contacts.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td data-label="S.No">{index}</td>
                                    <td data-label="Name">{item.username}</td>
                                    <td data-label="Age">{item.email}</td>
                                    <td data-label="Marks%">{item.message}</td>
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

export default Admincontacts
