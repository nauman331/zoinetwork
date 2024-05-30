const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken")

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    phone: { type: Number, unique: true, required: true },
    isAdmin: { type: Boolean, default: false },
    coins: { type: Number, default: 1 },
    lastUpdated: { type: Date },
    refferals: { type: Number, default: 0 },
    fingerprint: {type: String},

    socialLinks: {
        facebook: { type: String },
        youtube: { type: String },
        telegramChannel: { type: String },
        telegramGroup: { type: String },
        twitter: { type: String },
        instagram: { type: String },
        tiktok: { type: String },
        whatsapp: { type: String },
        // Add other social media links as needed
    },

    coinsClaimed: {
        facebook: { type: Boolean, default: false },
        youtube: { type: Boolean, default: false },
        telegramChannel: { type: Boolean, default: false },
        telegramGroup: { type: Boolean, default: false },
        twitter: { type: Boolean, default: false },
        instagram: { type: Boolean, default: false },
        tiktok: { type: Boolean, default: false },
        whatsapp: { type: Boolean, default: false },
        // Add other social media links as needed
    },

});

userSchema.pre('save', async function (next) {
    const user = this;
    const salt = await bcrypt.genSalt(10);

    if (!user.isModified('password')) {
        next();
    }

    try {
        const hashed_password = await bcrypt.hash(user.password, salt);
        user.password = hashed_password;

    } catch (error) {
        next(error);
    }
});

userSchema.methods.comparePassword = function (password) {
    return bcrypt.compare(password, this.password);
}

userSchema.methods.generateAuthToken = async function () {
    try {
        return jwt.sign(
            {
                userId: this._id.toString(),
                email: this.email,
                isAdmin: this.isAdmin
            },
            process.env.JWT_SECRET_KEY,
            {
                expiresIn: '30d'
            }
        )
    } catch (error) {
        console.error(error)
    }
}

userSchema.methods.updateCoins = function () {
    const now = new Date();
    if (!this.lastUpdated || now.getDate() !== this.lastUpdated.getDate()) {
        this.coins = 5;
        this.lastUpdated = now;
    } else if (this.coins < 1000) {
        this.coins += 5;
    }
    return this.coins;
};

const User = new mongoose.model('User', userSchema);

module.exports = User;
