const { z } = require("zod");

const contactSchema = z.object({
    username: z.string({ required_error: "Name is required" }).trim().min(3, 'username must be atleast 3 characters long').max(50, 'username cannot be more than 50 character long'),
    email: z.string({ required_error: "Email is required" })
        .email('Invalid Email')
        .refine((val) => /@/.test(val), 'Not a valid email address'),
    message: z.string({ required_error: "Message can't be empty" }).nonempty({ message: "Message can't be empty" }),
});

module.exports = contactSchema;

