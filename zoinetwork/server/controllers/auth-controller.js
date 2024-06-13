const User = require('../models/user-model')
const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');
const Queue = require('bull');
const claimCoinsQueue = new Queue('claim coins');



//email security
const normalizeEmail = (email) => {
    return email.replace(/\./g, '').toLowerCase();
};




//Home Controller
const home = (req, res) => {
    try {
        res.status(200).send("Home controllers working fine");

    } catch (error) {
        next(error)
    }
}
//Register Controller
const register = async (req, res, next) => {
    try {
        const { email, phone, password, username, reffercode } = req.body;

        // Check for missing fields
        if (!email || !phone || !password || !username) {
            return res.status(400).json({ msg: 'Missing Fields' });
        }
        //checking existing user and reffree
        const existingEmail = await User.findOne({ email });
        const existingPhone = await User.findOne({ phone });

        if (existingEmail || existingPhone) {
            return res.status(400).json({ msg: 'Email or phone number is already in use' });
        }

        const userId = req.userID;
        if (reffercode) {
            const refferalCode = await User.findById(userId);

            referrer = await User.findOne({ reffercode: refferalCode });

            // Update referrer's coins and referrals count
            referrer.coins += 500;
            referrer.refferals += 1;
            await referrer.save();
        }







        const normalizedEmail = normalizeEmail(email);

        const createdUser = await User.create({
            email: normalizedEmail,
            phone,
            password,
            username,
        });

        // Read the HTML email template
        const readEmailTemplate = () => {
            const templatePath = path.join(__dirname, '../index.html');
            return fs.readFileSync(templatePath, 'utf-8');
        };

        // Send welcome email
        const sendWelcomeEmail = async (email, username) => {
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                secure: true,
                port: 465,
                auth: {
                    user: 'zoinetwork00@gmail.com',
                    pass: 'qayg suop gkrv ahga',
                },
            });

            const htmlTemplate = readEmailTemplate();
            const template = htmlTemplate.replace('{{username}}', username);
            const mailOptions = {
                from: process.env.EMAIL_USER,
                to: email,
                subject: `Welcome ${username}😎 to ZOI Network!`,
                html: template,
            };

            try {
                await transporter.sendMail(mailOptions);
                console.log('Email sent successfully!');
            } catch (error) {
                console.error('Error sending email:', error);
            }
        };



        // Send welcome email
         await sendWelcomeEmail(email, username)
        
          
       
            
            res.status(200).json({
                msg: 'Registration successful',
                token: await createdUser.generateAuthToken(),
                userId: createdUser._id.toString(),
            });
        

    } catch (error) {
        // Log any errors
        console.error('Error during registration:', error);
        next(error);
    }
};

//Login Controller
const login = async (req, res, next) => {
    try {
        //getting values
        const { email, password } = req.body;

        //checking empty fields
        if (!email || !password) {
            return res.status(400).json({ msg: "Missing Fields" });
        };
        const normalizedEmail = normalizeEmail(email)
        // finding user by email
        const userExists = await User.findOne({ email: normalizedEmail });

        //checking if user does not exist
        if (!userExists) {
            return res.status(400).json({ msg: "Invalid Credentials" });
        }
        //comparing bcrypt passwords
        const comparedPasswords = await userExists.comparePassword(password);
        //if password compared successfully
        if (comparedPasswords) {
            res.status(200).json({
                msg: "Login suucessfull",
                token: await userExists.generateAuthToken(),
                userId: userExists._id.toString()
            })
        } else {
            res.status(400).json({ msg: "Invalid Credentials" })
        }


    } catch (error) {
        next(error)
    }
}

//to send user data

const user = async (req, res, next) => {
    try {
        const userData = req.user;
        return res.status(200).json({ userData })
    } catch (error) {
        next(error)
    }
}

const updateCoins = async (req, res, next) => {
    try {
        // Get the user from the database
        const user = await User.findById(req.userID);

        // Update the user's coins and save the user document
        user.updateCoins();
        await user.save();

        // Send a response to the client
        res.json({ message: 'Coins updated successfully', coins: user.coins });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while updating the coins' });
    }
};


const claimSocialCoins = async (req, res, next) => {
    try {
        const userId = req.userID;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const platform = req.params.platform;
        if (!user.coinsClaimed[platform]) {
            // Schedule a job to add coins to the user's account 12 hours later
            claimCoinsQueue.add({
                userId: req.userID,
                platform: req.params.platform
            }, { delay: 12 * 60 * 60 * 1000 });  // 12 hours delay

            return res.status(200).json({ message: 'Coins will be added after 12 hours' });
        } else {
            return res.status(400).json({ message: `Coins already claimed from ${platform}` });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

// Process the jobs
claimCoinsQueue.process(async () => {
    const userId = req.userID;
    const user = await User.findById(userId);
    if (!user) {
        throw new Error('User not found');
    }

    if (!user.coinsClaimed[platform]) {
        user.coins += 1000;
        user.coinsClaimed[platform] = true;
        await user.save();
    }
});



module.exports = { home, register, login, user, updateCoins, claimSocialCoins };