const User = require ("../models/user-model");
const Contact = require("../models/contact-model")

const getAllUsers = async (req,res) => {

try {
    const users = await User.find().select({
        password: 0
    });
    if(!users || users.length === 0){

        res.status(404).json({message: "No users Found"});
    }
    res.status(200).json(users);
} catch (error) {
    console.log(error)
}

}


const getAllContacts = async (req,res) => {
    try {
        const contacts = await Contact.find();
        if(!contacts || contacts.length === 0){
    
            res.status(404).json({message: "No contacts Found"});
        }
        res.status(200).json(contacts);
    } catch (error) {
        console.log(error)
    }
}


const deleteUserById = async (req, res) => {
    try {
        const id = req.params.id;
        await User.deleteOne({ _id: id });
        return res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        console.error("Error deleting user:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

const deleteContactById = async (req, res) => {
    try {
        const id = req.params.id;
        await Contact.deleteOne({ _id: id });
        return res.status(200).json({ message: "Message deleted successfully" });
    } catch (error) {
        console.error("Error deleting user:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};


module.exports = { getAllUsers , getAllContacts, deleteUserById, deleteContactById }