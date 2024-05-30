const Contact = require("../models/contact-model");

const contactForm = async (req, res, next) => {
    try {
        const response = req.body;
        await Contact.create(response);
        return res.status(200).json({ msg: "message sent successfully" })
    } catch (error) {
        const message = "Message not delivered"
        next({ error, message })
    }
}

module.exports = contactForm;