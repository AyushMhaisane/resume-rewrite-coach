const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

/**
 * User Schema
 * Represents an authenticated user in the system
 */
const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please add a name'],
            trim: true,
        },

        email: {
            type: String,
            required: [true, 'Please add an email'],
            unique: true,
            lowercase: true,
            match: [
                /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                'Please add a valid email',
            ],
        },

        password: {
            type: String,
            required: [true, 'Please add a password'],
            select: false, // Never return password in queries
        },

        isPro: {
            type: Boolean,
            default: false, // Free tier by default
        },

        practiceQuestionCount: {
            type: Number,
            default: 0, // Tracks free-tier usage (max 3)
        },

        refreshToken: {
            type: String,
            default: null, // Used for session control / force logout
        },
    },
    {
        timestamps: true, // Adds createdAt & updatedAt
    }
);


// MIDDLEWARE (HOOKS)



// Hash password before saving user
userSchema.pre('save', async function (next) {
    // Only hash if password was modified or created
    if (!this.isModified('password')) {
        return;
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);


});

// Compare entered password with hashed password
userSchema.methods.matchPassword = async function (enteredPassword) {
    return bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
