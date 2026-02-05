const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name']
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true,
        match: [
            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
            'Please add a valid email'
        ]
    },
    password: {
        type: String,
        required: [true, 'Please add a password'],
        select: false // Security: Do not return password by default in queries
    },
    isPro: {
        type: Boolean,
        default: false // Everyone starts as Free tier
    },
    practiceQuestionCount: {
        type: Number,
        default: 0 // Tracks the 3-question limit for free users
    },
    refreshToken: {
        type: String,
        default: null // Stored for session management/revocation
    }
}, {
    timestamps: true // Automatically manages createdAt and updatedAt
});

// --- ENCRYPTION MIDDLEWARE ---

// 1. Encrypt password using bcrypt before saving
userSchema.pre('save', async function (next) {
    // If password is not modified (e.g., user just updated their name), skip hashing
    if (!this.isModified('password')) {
        next();
    }

    // Generate a salt (10 rounds is standard security balance between speed/safety)
    const salt = await bcrypt.genSalt(10);

    // Hash the password with the salt
    this.password = await bcrypt.hash(this.password, salt);
});

// 2. Helper method to compare entered password with hashed password in DB
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);